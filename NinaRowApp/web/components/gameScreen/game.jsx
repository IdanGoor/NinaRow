import React from "react";
import "../../css/global.css";
import "../../css/game/game.css";
import Board from "./board.jsx";
import GameInfo from "./gameInfo.jsx";
const _ = require("lodash");

function importAll(r) {
    let images = {};
    r.keys().map((key) => {images[(key.replace('./', '')).replace('.png', '')]=r(key)});
    return images;
}
const colors = importAll(require.context("../../resources/colors/", false, /\.png$/));


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_INTERVAL = 1000;
    this.isGameEnded = false;
    this.isGameStarted = false;
    this.state = {
        game: "",
        boardState: ""
    };

    this.fetchGameInterval = setInterval(this.getGame.bind(this), this.UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.fetchBoardStateInterval);
    clearInterval(this.fetchGameInterval);
  }

  getGame() {
      $.ajax({
          method:'GET',
          url: "/currentGame",
          timeout: 4000,
          success: function(game){
              //TODO: add error message
              this.setState(() => ({ game: game }));
          }.bind(this)
      });
  }

  getBoardState() {
      return fetch("/gameRoom/boardState", { method: "GET", credentials: "include" })
          .then(response => {
              if (!response.ok) {
                  throw response;
              }
              return response.json();
          })
          .then(boardState => {
              this.setState(() => ({ boardState: boardState }));
          })
          .catch(err => {
              throw err;
          });
  }

  leaveGame() {
      $("#errorMessage").text("");
      $.ajax({
          method:'POST',
          data: "gameTitle=" + this.props.game.dynamicPlayers.gameTitle,
          url: "/leaveGame",
          timeout: 4000,
          error: function(jqXHR, ajaxSetting, error) {
              console.error("Failed to leave game");
              $("#errorMessage").text("Error: " + jqXHR.responseText);
          },
          success: function(){
              this.props.joinGame();
          }.bind(this)
      });
  }


  renderBoard(){
      //TODO: at the begining it shows only the board with squares and numbers
      //TODO: when game starts it show all the pushIn and popOut button (if needed)
  }

  render() {
      if(this.state.game.status==="ACTIVE" && !this.isGameStarted){
          this.isGameStarted = true;
      }

    return (
        <div className={"game-layout"}>
            <GameInfo user={this.props.user} leaveGame={this.props.leaveGame}/>
            <Board/>
        </div>
    );
  }
}

import React from "react";
import "../../css/global.css";
import "../../css/game/game.css";
import GameInfo from "./gameInfo.jsx";


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_INTERVAL = 500;
    this.isGameEnded = false;
    this.state = {
        game: "",
        boardState: ""
    };

    //this.fetchGameInterval = setInterval(this.getGame.bind(this), this.UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.fetchBoardStateInterval);
    clearInterval(this.fetchGameInterval);
  }

  getGame() {
    return fetch("/games/getGame", { method: "GET", credentials: "include" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then(game => {
            this.setState(() => ({ game: game }));
        })
        .then(() => {
            if (this.state.game.status === gameUtils.GAME_CONSTS.IN_PROGRESS && this.fetchBoardStateInterval===undefined){
                this.props.updateViewManager();
                this.fetchBoardStateInterval = setInterval(this.getBoardState.bind(this), this.UPDATE_INTERVAL);
            }
        })
        .catch(err => {
            throw err;
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
    return (
        <div className={"game-layout"}>
            <GameInfo user={this.props.user} leaveGame={this.props.leaveGame}/>
        </div>
    );
  }
}

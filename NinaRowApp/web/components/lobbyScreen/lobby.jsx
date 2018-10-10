import React from "react";
import "../../css/lobby/lobby.css";
import PlayerInfo from "./playerInfo.jsx";
import GameTable from "./gameTable.jsx";
import PlayerTable from "./playerTable.jsx";
import Game from "../gameScreen/game.jsx";

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_INTERVAL = 2000;

    this.state = {
      isJoinedGame: false,
      players: {}, // all players
      games: {}, // all games
      errMessage: ""
    };

      this.fetchUsersInterval = setInterval(
          this.getPlayers.bind(this),
          this.UPDATE_INTERVAL
      );

      this.fetchGamesInterval = setInterval(
          this.getGames.bind(this),
          this.UPDATE_INTERVAL
      );
  }

  componentWillUnmount() {
    clearInterval(this.fetchUsersInterval);
    clearInterval(this.fetchGamesInterval);
  }

  getPlayers() {
      if(!this.state.isJoinedGame)
          $.ajax({
              method:'GET',
              url: "/playerlist",
              timeout: 4000,
              success: function(r){
                  //TODO: add error message
                  this.setState(() => ({ players: r }));
              }.bind(this)
          });
  }

  getGames() {
      if(!this.state.isJoinedGame)
          $.ajax({
              method:'GET',
              url: "/gamelist",
              timeout: 4000,
              success: function(r){
                  //TODO: add error message
                  this.setState(() => ({ games: r }));
              }.bind(this)
          });
  }

  joinGame(){
      this.setState(() => ({ isJoinedGame: true }));
  }

  leaveGame(){
      this.setState(() => ({ isJoinedGame: false }));
  }

  render() {
    return (!this.state.isJoinedGame ?
        <div className={"lobby-layout"}>
            <PlayerTable players={this.state.players}/>
            <GameTable user={this.props.user} games={this.state.games}
                       joinGame={this.joinGame.bind(this)}/>
            <PlayerInfo user={this.props.user} logout={this.props.logout}/>
        </div>
            : <Game user={this.props.user} leaveGame={this.leaveGame.bind(this)}/>
    );
  }
}

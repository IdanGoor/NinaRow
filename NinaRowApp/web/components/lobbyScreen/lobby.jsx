import React from "react";
import "../../css/lobby/lobby.css";
import UserInfo from "./userInfo.jsx";
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
    };

      this.fetchUsersInterval = setInterval(
          this.getPlayers.bind(this),
          this.UPDATE_INTERVAL
      );

      this.fetchGamesInterval = setInterval(
          this.getGames.bind(this),
          this.UPDATE_INTERVAL
      );

      this.getGame();
  }

    getGame(){
        $.ajax({
            method:'GET',
            url: buildUrlWithContextPath("gameInfo"),
            timeout: 4000,
            success: function(){
                this.setState(() => ({ isJoinedGame: true }));
            }.bind(this)
        });
    }

  componentWillUnmount() {
    clearInterval(this.fetchUsersInterval);
    clearInterval(this.fetchGamesInterval);
  }

  getPlayers() {
      if(!this.state.isJoinedGame)
          $.ajax({
              method:'GET',
              url: buildUrlWithContextPath("playerList"),
              timeout: 4000,
              success: function(r){
                  this.setState(() => ({ players: r }));
              }.bind(this)
          });
  }

  getGames() {
      if(!this.state.isJoinedGame)
          $.ajax({
              method:'GET',
              url: buildUrlWithContextPath("gameList"),
              timeout: 4000,
              success: function(r){
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
            <UserInfo user={this.props.user} logout={this.props.logout}/>
            <GameTable user={this.props.user} games={this.state.games}
                       joinGame={this.joinGame.bind(this)}/>
            <PlayerTable players={this.state.players}/>
        </div>
            : <Game user={this.props.user} leaveGame={this.leaveGame.bind(this)}/>
    );
  }
}

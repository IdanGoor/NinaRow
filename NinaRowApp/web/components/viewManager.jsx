import React from "react";
// import gameUtils from "../utils/gameUtils.js";
import Login from "./loginScreen/login.jsx";
import Lobby from "./lobbyScreen/lobby.jsx";
// import Game from "./gameScreen/game.jsx";

export default class ViewManager extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_TIMEOUT = 500;
    this.getUserTimeout;
    this.state = {
      user: ""
    };

    this.getUser();
  }

  clearUserInfo(){
    return {user: ""};
  }

  renderLogin(){
      return <Login updateViewManager={this.getUser.bind(this)}/>;
  }

  renderLobby() {
    return (
        <Lobby
          updateViewManager={this.getUser.bind(this)}
          user={this.state.user}
        />
    );
  }

  renderGameRoom(){
    // return (
    //     <Game
    //       updateViewManager={this.getUser.bind(this)}
    //       user={this.state.user}
    //     />
    // );
  }

  getUser() {
      return fetch("/users", {method: "GET", credentials: "include"})
          .then(response => {
              if (!response.ok) {
                  throw response;
              }
              return response.json();
          })
          .then(user => {
              this.setState(() => ({user: user}));
          })
          .then(() => {
              // if (this.state.user.gameName !== "" && this.state.user.status === gameUtils.PLAYER_CONSTS.IDLE) {
              //     this.getUserTimeout = setTimeout(this.getUser.bind(this), this.UPDATE_TIMEOUT);
              // }
          })
          .catch(err => {
              if (err.status === 401) {
                  // incase we're getting 'unautorithed' as response
                  this.setState(() => (this.clearUserInfo()));
              }
              else {
                  throw err;
              }
          });
  }

  render() {
    if (this.state.user !== ""){
        if (this.state.user.gameName !== "") {
            return this.renderGameRoom();
        }
        else if (this.state.user.name !== ""){
            return this.renderLobby();
        }
    }
    else {
      return this.renderLogin();
    }
  }
}

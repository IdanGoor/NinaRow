import React from "react";
import Lobby from "../lobbyScreen/lobby.jsx";
import "../../css/login/login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state={
        user: "",
        isLoggedIn: false
    };

      $.ajax({
          method:'GET',
          url: buildUrlWithContextPath("login"),
          timeout: 4000,
          success: function(r){
              this.setState(() => ({
                  user: r,
                  isLoggedIn: true
              }));
          }.bind(this)
      });
  }

  logout(){
      this.setState(() => ({ isLoggedIn: false }));
  }

  handleLogin(e) {
    e.preventDefault();
    closeErrorMessage();
    const playerName = e.target.elements.playerName.value;
    const playerType = e.target.elements.playerType.value;
    if (playerName === "")
        showErrorMessage("login", "User name is empty, please try another one");
    else if (playerName.length > 15)
        showErrorMessage("login", "User name is too long. please try another one that is less than 15 letters");
    else{
        $.ajax({
            method:'POST',
            url: buildUrlWithContextPath("login"),
            data: $(e.target).serialize(),
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
               showErrorMessage("login", jqXHR.responseText);
                this.setState(() => ({
                    user: "",
                    isLoggedIn: false
                }));
            }.bind(this),
            success: function(){
                this.setState(() => ({
                    user: {name: playerName, type: playerType},
                    isLoggedIn: true
                }));
            }.bind(this)
        });
        return false;
    }
  }

  render() {
    return (
        !this.state.isLoggedIn ?
        <div className={"login-layout"}>
            <form id={"login-form"} onSubmit={this.handleLogin.bind(this)}>
                <label htmlFor="playerName">
                    Username:{" "}
                </label>
                <input name={"playerName"}/><br/>
                <input type={"radio"} value={"Human"} name={"playerType"} defaultChecked/>
                <label>Human</label><br/>
                <input type={"radio"} value={"Computer"} name={"playerType"}/>
                <label>Computer</label><br/>
                <input type={"submit"} className={"button-green"} value={"Login"} style={{fontSize:"16px"}}/>
            </form>

        </div> : <Lobby user={this.state.user} logout={this.logout.bind(this)}/>
    );
  }
}

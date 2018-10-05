import React from "react";
import Lobby from "../lobbyScreen/lobby.jsx";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state={
        playerName: "",
        isLoggedIn: false
    };

      $.ajax({
          method:'GET',
          url: "/users/login",
          timeout: 4000,
          success: function(r){
              this.setState(() => ({
                  playerName: r,
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
    $("#errorMessage").text("");
    const playerName = e.target.elements.playerName.value;
    if (playerName === "")
        $("#errorMessage").text("User name is empty, please try another one");
    else if (playerName.length > 15)
        $("#errorMessage").text("User name is too long, please try another one");
    else{
        $.ajax({
            method:'POST',
            url: "/users/login",
            data: $(e.target).serialize(),
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                console.error("Failed to submit");
                $("#errorMessage").text("Error: " + jqXHR.responseText);
                this.setState(() => ({
                    playerName: "",
                    isLoggedIn: false
                }));
            }.bind(this),
            success: function(){
                this.setState(() => ({
                    playerName: playerName,
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

            <div id="errorMessage" className="error-message"/>
        </div> : <Lobby user={this.state.playerName} logout={this.logout.bind(this)}/>
    );
  }
}

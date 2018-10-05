import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/userInfo.css";
// import AddGameForm from "./addGameForm.jsx";

export default class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.playerName = props.playerName;
    this.state ={
        showAddGameForm: false
    };
  }

    logoutHandler() {
        $.ajax({
            method:'POST',
            url: "/users/logout",
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                console.error("Failed to logout");
                $("#errorMessage").text("Error: " + jqXHR.responseText);
            },
            success: function(){
                this.props.logout();
            }.bind(this)
        });
    }

  toggleAddGameForm(){
      this.setState(()=>({showAddGameForm: !this.state.showAddGameForm}));
  }

  render() {
    return (
        <div className={"lobby-column"} id={"user-info"}>
            <div className={"lobby-column-headline"}>
                Info
            </div>
            <div className={"lobby-column-content"}>
                <div className={"user-info-content"}>
                    <p><b>Name: </b>{this.playerName}</p>
                    <button className={"button-green"} onClick={this.toggleAddGameForm.bind(this)}>New Game</button>
                    <button className={"button-red"} onClick={this.logoutHandler.bind(this)}>Logout</button>
                </div>
            </div>
            {/*<AddGameForm*/}
                {/*show={this.state.showAddGameForm}*/}
                {/*onCloseForm={this.toggleAddGameForm.bind(this)}*/}
                {/*updateViewManager={this.props.updateViewManager}*/}
            {/*/>*/}
            <div id="errorMessage" className="error-message"/>
        </div>
    );
  }
}

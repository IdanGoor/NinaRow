import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/userInfo.css";
import PlayerBox from "./playerBox.jsx";

export default class GameInfo extends React.Component {
  constructor(props) {
    super(props);

  }

    leaveGameHandler() {
        $("#errorMessage").text("");
        $.ajax({
            method:'GET',
            url: "/leaveGame",
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                console.error("Failed to leave game");
                $("#errorMessage").text("Error: " + jqXHR.responseText);
            },
            success: function(){
                this.props.leaveGame();
            }.bind(this)
        });
    }

    renderLeaveButton(){
        // TODO: if the player is pc before game started then he cant leave
        return(
            <button
                className={`button-red`}
                style={{fontSize: "14px"}}
                onClick={this.leaveGameHandler.bind(this)}>
                Leave Game
            </button>
        );
    }

    renderPlayers(){

    }

    renderVisitors(){

    }

  render() {
    return (
        <div className={"page-column"} id={"game-info"}>
            <div className={"page-column-headline"}>
            Info
        </div>
            <div className={"page-column-content"}>
                <div>Hello {this.props.user}! </div>
                <div>Welcome to </div>
                {this.renderLeaveButton()}
            </div>

            <div className={"page-column-headline"}>
                Players
            </div>
            <div className={"page-column-content"}>
                {this.renderPlayers()}
            </div>

            <div className={"page-column-headline"}>
                Visitors
            </div>
            <div className={"page-column-content"}>
                {this.renderVisitors()}
            </div>

            <div id="errorMessage" className="error-message"/>
        </div>
    );
  }
}

import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/userInfo.css";
import PlayerBox from "./playerBox.jsx";

export default class GameInfo extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_INTERVAL = 1000;
    this.isColorSet = false;
    this.state = {
        gameInfo: ""
    };

    this.getGameInfo();
    this.fetchGameInterval = setInterval(this.getGameInfo.bind(this), this.UPDATE_INTERVAL);
  }

  componentWillUnmount(){
      clearInterval(this.fetchGameInterval);
  }

    getGameInfo() {
        $.ajax({
            method:'GET',
            url: "/gameInfo",
            timeout: 4000,
            success: function(gameInfo){
                //TODO: add error message
                if(gameInfo.status === "ACTIVE" && !this.isColorSet){
                    this.props.setColors(gameInfo.players);
                    this.isColorSet = true;
                }
                this.setState(() => ({ gameInfo: gameInfo }));
            }.bind(this)
        });
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
      let players = this.state.gameInfo.players;
        let playerObjects = [];

        for (let playerIndex in players){
            if (players.hasOwnProperty(playerIndex)) {
                let player = players[playerIndex];
                playerObjects.push(
                    <PlayerBox
                        key={"player_object_"+player.name}
                        player={player}
                        color={this.props.colors !== "" ? this.props.colors.get(player.name) : ""}
                    />
                );
            }
        }

        return playerObjects;
    }

    renderVisitors(){

    }

  render() {

    return (
        this.state.gameInfo !== "" ?
        <div className={"page-column"} id={"game-info"}>
            <div className={"page-column-headline"}>Info</div>
            <div className={"page-column-content"}>
                Welcome <b>{this.props.user}</b> to {this.state.gameInfo.title}.<br/>
                Target: {this.state.gameInfo.target}<br/>
                Variant: {this.state.gameInfo.variant}<br/>
                Total players: {this.state.gameInfo.totalPlayers}<br/>
                Status: {this.state.gameInfo.status}<br/>
                {this.renderLeaveButton()}
            </div>

            <div className={"page-column-headline"}>Players</div>
            <div className={"page-column-content"}>
                {this.renderPlayers()}
            </div>

            <div className={"page-column-headline"}>Visitors</div>
            <div className={"page-column-content"}>
                {this.renderVisitors()}
            </div>

            <div id="errorMessage" className="error-message"/>
        </div>
            : <div/>
    );
  }
}

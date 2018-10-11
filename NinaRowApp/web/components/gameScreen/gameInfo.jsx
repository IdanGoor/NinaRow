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
            url: buildUrlWithContextPath("gameInfo"),
            timeout: 4000,
            success: function(gameInfo){
                if(gameInfo.status === "ACTIVE" && !this.isColorSet){
                    this.props.setColors(gameInfo.players);
                    this.isColorSet = true;
                }
                this.setState(() => ({ gameInfo: gameInfo }));
            }.bind(this)
        });
    }

    leaveGameHandler() {
      closeErrorMessage();
        $.ajax({
            method:'GET',
            url: buildUrlWithContextPath("leaveGame"),
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                showErrorMessage("leave game", jqXHR.responseText);
            },
            success: function(){
                this.props.leaveGame();
            }.bind(this)
        });
    }

    renderLeaveButton(){
      let isDisabled = false;
      let buttonType = "button-red";
        if(this.state.gameInfo.status === "ACTIVE" && this.props.user.type === "Computer"){
            isDisabled = true;
            buttonType = "button-gray";
        }
        return(
            <button
                className={buttonType}
                style={{fontSize: "14px"}}
                onClick={this.leaveGameHandler.bind(this)}
                disabled={isDisabled}>
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
                        isPlaying={true}
                    />
                );
            }
        }

        return playerObjects;
    }

    renderVisitors(){
        let visitors = this.state.gameInfo.visitors;
        let visitorObjects = [];

        for (let visitorIndex in visitors){
            if (visitors.hasOwnProperty(visitorIndex)) {
                let visitor = visitors[visitorIndex];
                visitorObjects.push(
                    <PlayerBox
                        key={"visitor_object_"+visitor.name}
                        player={visitor}
                        isPlaying={false}
                    />
                );
            }
        }

        return visitorObjects;

    }

  render() {

    return (
        this.state.gameInfo !== "" ?
        <div className={"page-column"} id={"game-info"}>
            <div className={"page-column-headline"}>Info</div>
            <div className={"page-column-content"}>
                Welcome <b>{this.props.user.name}</b> to {this.state.gameInfo.title}.<br/>
                Target: {this.state.gameInfo.target}<br/>
                Variant: {this.state.gameInfo.variant}<br/>
                Total players: {this.state.gameInfo.totalPlayers}<br/>
                Status: <b style={this.state.gameInfo.status==="ACTIVE" ? {color: "lightgreen"}:{color: "red"}}>{this.state.gameInfo.status}</b><br/>
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
        </div>
            : <div/>
    );
  }
}

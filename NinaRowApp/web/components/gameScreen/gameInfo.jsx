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
                if(gameInfo.isEnded)
                    clearInterval(this.fetchGameInterval);
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
      let gameInfo = this.state.gameInfo;
      let players = gameInfo.players;
        let playerObjects = [];

        for (let playerIndex in players){
            if (players.hasOwnProperty(playerIndex)) {
                let player = players[playerIndex];

                playerObjects.push(
                    <PlayerBox
                        key={"player_object_"+player.name}
                        player={player}
                        color={this.props.colors !== "" ? this.props.colors.get(player.name) : ""}
                        isPlayer={true}
                        isPlaying={gameInfo.status === "ACTIVE" && gameInfo.activePlayer.name === player.name}
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
                        isPlayer={false}
                    />
                );
            }
        }

        return visitorObjects;

    }

    renderPlayersOrResults(){
      let playersAndVisitors = [];
      if(!this.state.gameInfo.isEnded){
          playersAndVisitors.push(
              <div id={"gamePlayers"} key={"players"}>
                  <div className={"page-column-headline"}>Players</div>
                  <div className={"page-column-content"}>
                      {this.renderPlayers()}
                  </div>
              </div>
          );

          playersAndVisitors.push(
              <div id={"gameVisitors"} key={"visitors"}>
                  <div className={"page-column-headline"}>Visitors</div>
                  <div className={"page-column-content"}>
                      {this.renderVisitors()}
                  </div>
              </div>
          );

      }

      return !this.state.gameInfo.isEnded ? playersAndVisitors : this.renderResults();
    }

    renderResults(){
      let resultMessage = "";
      let winners = this.state.gameInfo.winners;
      if(winners.length === 0){
          resultMessage = "There are no winners.";
      }
      else {
          let hasWon = false;
          for(let i = 0; i<winners.length; i++) {
              if (winners[i].name === this.props.user.name) {
                  hasWon = true;
                  resultMessage = "Congratulations, You won! ";
              }
          }

          if(winners.length === 1 && !hasWon){
              resultMessage = "The winner is "+winners[0].name;
          }
          else{
              resultMessage = resultMessage.concat("The winners are:\n");
              console.log(resultMessage);
              for(let i = 0; i<winners.length; i++)
                  resultMessage = resultMessage.concat(winners[i].name+"\n");
          }
      }

      return (
          <div>
              <div className={"page-column-headline"}>Results</div>
              <div className={"page-column-content"} style={{fontSize:"20px", textAlign:"center"}}>
                  <b>{resultMessage}</b>
              </div>
          </div>);

    }

  render() {

    return (
        this.state.gameInfo !== "" ?
        <div className={"page-column"} id={"game-info"}>
            <div id={"gameStats"}>
                <div className={"page-column-headline"}>Info</div>
                <div className={"game-info-content page-column-content"}>
                    Welcome <b>{this.props.user.name}</b> to {this.state.gameInfo.title}.<br/>
                    <u>Target:</u> {this.state.gameInfo.target}&nbsp;<u>Variant:</u> {this.state.gameInfo.variant}&nbsp;
                    <u>Total players:</u> {this.state.gameInfo.totalPlayers}&nbsp;
                    <u>Status:</u> <b style={this.state.gameInfo.status==="ACTIVE" ? {color: "LawnGreen"}:{color: "red"}}>{this.state.gameInfo.status}</b><br/>
                    {this.renderLeaveButton()}
                </div>
            </div>
            {this.renderPlayersOrResults()}
        </div>
            : <div/>
    );
  }
}

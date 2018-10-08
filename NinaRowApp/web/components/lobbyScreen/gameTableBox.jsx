import React from "react";
import "../../css/lobby/gameTable.css";
// import gameUtils from "../../utils/gameUtils.js";

export default class GameTableBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errMessage:""
    }
  }

    joinAsPlayerHandler() {
        $("#errorMessage").text("");
        $.ajax({
            method:'POST',
            data: "gameTitle=" + this.props.game.dynamicPlayers.gameTitle,
            url: "/joinPlayer",
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                console.error("Failed to join");
                $("#errorMessage").text("Error: " + jqXHR.responseText);
            },
            success: function(){
                this.props.joinGame();
            }.bind(this)
        });
    }

    joinAsVisitorHandler() {
        $("#errorMessage").text("");
        $.ajax({
            method:'POST',
            data: "gameTitle=" + this.props.game.dynamicPlayers.gameTitle,
            url: "/joinVisitor",
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                console.error("Failed to join");
                $("#errorMessage").text("Error: " + jqXHR.responseText);
            },
            success: function(){
                this.props.joinGame();
            }.bind(this)
        });
    }

    deleteGameHandler(gameName) {
        fetch("/games/deleteGame", {
            method: "POST",
            body: JSON.stringify(gameName),
            credentials: "include"
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                this.props.updateViewManager();
            })
            .catch(err => {
                throw err;
            });
    }

    renderDeleteButton() {
        // const game = this.props.game;
        // if (this.props.game.creator.name === this.props.playerName) {
        //   return (
        //       <button
        //           className={"button-red"}
        //           style={{fontSize: "14px"}}
        //           onClick={this.deleteGameHandler.bind(this, game.name)}>
        //             Delete
        //       </button>
        //   );
        // }
    }

    renderJoinButton(){
      //TODO: if the game is already active then player cant join as player, only as visitor

      const game = this.props.game;
      let text;
      let color;
      if (game.status === gameUtils.GAME_CONSTS.IN_PROGRESS ||
          game.players.length === game.playerLimit){
        text="Join as Observer";
        color="orange";
      }
      else{
        text="Join as Player";
        color="green";
      }

      return (
          <button
            className={`button-${color}`}
            style={{fontSize: "14px"}}
            onClick={this.joinGameHandler.bind(this, game.name)}>
              {text}
          </button>
      );
    }

    renderErrorMessage() {
        if (this.state.errMessage) {
            return <div className="error-message">{this.state.errMessage}</div>;
        }
        return null;
    }

  render() {
    const title = this.props.game.dynamicPlayers.gameTitle;
    const creator = this.props.game.creator.name;
    const rows = this.props.game.game.board.rows;
    const columns = this.props.game.game.board.columns;
    const target = this.props.game.game.target;
    const variant = this.props.game.game.variant;
    const status = this.props.game.status;
    const playerLimit = this.props.game.dynamicPlayers.totalPlayers;
    const playersPending = this.props.game.dynamicPlayers.players.length;
    const visitors = this.props.game.dynamicPlayers.visitors.length;
    const isJoinAsPlayerDisabled = (playerLimit===playersPending);

    return (
        <div className={"game-table-box"}>
            <div className={"game-table-box-headline"}>{title}</div>
            <div>
                <div className={"game-table-box-details"}>
                    <ul className={"game-table-box-cells"}>
                        <li className={"game-table-box-cell"}><u>Creator:</u>&nbsp;{creator}</li>
                        <li className={"game-table-box-cell"}><u>Players:</u>&nbsp;{playersPending}/{playerLimit}</li>
                        <li className={"game-table-box-cell"}><u>Visitors:</u>&nbsp;{visitors}</li>
                        <li className={"game-table-box-cell"}><u>Board:</u>&nbsp;{rows}X{columns} (rows X columns)</li>
                        <li className={"game-table-box-cell"}><u>Target:</u>&nbsp;{target}</li>
                        <li className={"game-table-box-cell"}><u>Variant:</u>&nbsp;{variant}</li>
                        <li className={"game-table-box-cell"}><u>Status:</u>&nbsp;{status}</li>
                    </ul>
                </div>
            </div>
            <div className={"game-table-box-buttons"}>
                <button
                    className={`button-green`}
                    style={{fontSize: "14px"}}
                    disabled={isJoinAsPlayerDisabled}
                    onClick={this.joinAsPlayerHandler.bind(this)}>
                    Join as Player
                </button>
                <button
                    className={`button-orange`}
                    style={{fontSize: "14px"}}
                    onClick={this.joinAsVisitorHandler.bind(this)}>
                    Join as Visitor
                </button>
                {this.renderDeleteButton()}
                {this.renderErrorMessage()}
            </div>
            <div id="errorMessage" className="error-message"/>
        </div>
    );
  }
}

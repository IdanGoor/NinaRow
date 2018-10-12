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
      closeErrorMessage();
        $.ajax({
            method:'POST',
            data: "gameTitle=" + this.props.game.title,
            url: buildUrlWithContextPath("joinPlayer"),
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                showErrorMessage("join as player", jqXHR.responseText);
            },
            success: function(){
                this.props.joinGame();
            }.bind(this)
        });
    }

    joinAsVisitorHandler() {
      closeErrorMessage();
        $.ajax({
            method:'POST',
            data: "gameTitle=" + this.props.game.title,
            url: buildUrlWithContextPath("joinVisitor"),
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                showErrorMessage("join as visitor", jqXHR.responseText);
            },
            success: function(){
                this.props.joinGame();
            }.bind(this)
        });
    }

    // deleteGameHandler(gameName) {
    //     fetch("/games/deleteGame", {
    //         method: "POST",
    //         body: JSON.stringify(gameName),
    //         credentials: "include"
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw response;
    //             }
    //             this.props.updateViewManager();
    //         })
    //         .catch(err => {
    //             throw err;
    //         });
    // }

    // renderDeleteButton() {
    //     const game = this.props.game;
    //     if (this.props.game.creator.name === this.props.playerName) {
    //       return (
    //           <button
    //               className={"button-red"}
    //               style={{fontSize: "14px"}}
    //               onClick={this.deleteGameHandler.bind(this, game.name)}>
    //                 Delete
    //           </button>
    //       );
    //     }
    // }

    renderJoinAsPlayerButton(){
      let isDisabled = false;
      let buttonType = "button-green";
      if(this.props.game.players.length === this.props.game.totalPlayers){
          isDisabled = true;
          buttonType = "button-gray";
      }

      return (
          <button
            className={buttonType}
            style={{fontSize: "14px"}}
            disabled={isDisabled}
            onClick={this.joinAsPlayerHandler.bind(this)}>
            Join as Player
          </button>);
    }

    renderErrorMessage() {
        if (this.state.errMessage) {
            return <div className="error-message">{this.state.errMessage}</div>;
        }
        return null;
    }

  render() {
    const game = this.props.game;
    const title = game.title;
    const creator = game.creator.name;
    const rows = game.rows;
    const columns = game.columns;
    const target = game.target;
    const variant = game.variant;
    const status = game.status;
    const playerLimit = game.totalPlayers;
    const playersPending = game.players.length;
    const visitors = game.visitors.length;

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
                        <li className={"game-table-box-cell"}><u>Status:</u>&nbsp;
                            <b style={status==="ACTIVE" ? {color: "LawnGreen "}:{color: "red"}}>{status}</b></li>
                    </ul>
                </div>
            </div>
            <div className={"game-table-box-buttons"}>
                {this.renderJoinAsPlayerButton()}
                <button
                    className={`button-orange`}
                    style={{fontSize: "14px"}}
                    onClick={this.joinAsVisitorHandler.bind(this)}>
                    Join as Visitor
                </button>
                {this.renderErrorMessage()}
            </div>
        </div>
    );
  }
}

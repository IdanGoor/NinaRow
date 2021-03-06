import React from "react";
import "../../css/lobby/gameTable.css";
// import gameUtils from "../../utils/gameUtils.js";

export default class GameTableBox extends React.Component {
  constructor(props) {
    super(props);
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
                this.props.joinGame(false);
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
                this.props.joinGame(true);
            }.bind(this)
        });
    }

    renderDeleteButton(){
      if(this.props.game.creator.name === this.props.user.name)
          return (
              <button
                  className={"button-red"}
                  style={{fontSize: "14px"}}
                  onClick={this.deleteGameHandler.bind(this)}>
                  Delete
              </button>
          );
    }

    deleteGameHandler(){
        closeErrorMessage();
        $.ajax({
            method:'POST',
            data: "gameTitle=" + this.props.game.title,
            url: buildUrlWithContextPath("deleteGame"),
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                showErrorMessage("delete game", jqXHR.responseText);
            }
        });
    }

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
                {this.renderDeleteButton()}
            </div>
        </div>
    );
  }
}

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

    joinGameHandler(gameTitle) {
        $.ajax({
            method:'POST',
            data: gameTitle,
            url: "/joinGame",
            timeout: 4000,
            success: function(){
                //TODO: add error message
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
      // const game = this.props.game;
      // let text;
      // let color;
      // if (game.status === gameUtils.GAME_CONSTS.IN_PROGRESS ||
      //     game.players.length === game.playerLimit){
      //   text="Join as Observer";
      //   color="orange";
      // }
      // else{
      //   text="Join as Player";
      //   color="green";
      // }
      //
      // return (
      //     <button
      //       className={`button-${color}`}
      //       style={{fontSize: "14px"}}
      //       onClick={this.joinGameHandler.bind(this, game.name)}>
      //         {text}
      //     </button>
      // );
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

    return (
        <div className={"game-table-box"}>
            <div className={"game-table-box-headline"}>{title}</div>
            <div>
                <div className={"game-table-box-details"}>
                    <ul className={"game-table-box-cells"}>
                        <li className={"game-table-box-cell"}><u>Creator:</u>&nbsp;{creator}</li>
                        <li className={"game-table-box-cell"}><u>Players:</u>&nbsp;{playersPending}/{playerLimit}</li>
                        <li className={"game-table-box-cell"}><u>Board:</u>&nbsp;{rows}X{columns} (rows X columns)</li>
                        <li className={"game-table-box-cell"}><u>Target:</u>&nbsp;{target}</li>
                        <li className={"game-table-box-cell"}><u>Variant:</u>&nbsp;{variant}</li>
                        <li className={"game-table-box-cell"}><u>Status:</u>&nbsp;{status}</li>
                    </ul>
                </div>
            </div>
            <div className={"game-table-box-buttons"}>
                {this.renderJoinButton()}
                {this.renderDeleteButton()}
                {this.renderErrorMessage()}
            </div>
        </div>
    );
  }
}

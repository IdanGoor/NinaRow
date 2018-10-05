import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/gameTable.css";
import GameTableBox from "./gameTableBox.jsx";

export default class GameTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderGameObjects() {
    const games = this.props.games;
    let gameObjects = [];

    for (let gameName in games){
        if (games.hasOwnProperty(gameName)) {
            let game = games[gameName];
            gameObjects.push(
                <GameTableBox
                    key={"game_table_object_"+game.name}
                    user={this.props.playerName}
                    game={game}
                    updateViewManager={this.props.updateViewManager}
                />
            );
        }
    }

    if (gameObjects.length === 0){
        return(
            <div className={"lobby-no-games-message"}>
                There are no available games<br/>
            </div>
        );
    }
    else {
        return gameObjects;

    }
  }

  render() {
    return (
        <div className={"lobby-column"} id={"games-table"}>
            <div className={"lobby-column-headline"}>
                Games
            </div>

            <div className={"lobby-column-content lobby-scrollbar"}>
                <GameTableBox
                    key={"game1"} user={this.props.playerName} game={null}
                    updateViewManager={this.props.updateViewManager}
                />
            </div>


            <div className={"lobby-column-content lobby-scrollbar"}>
                {this.renderGameObjects()}
            </div>
        </div>
    );
  }
}

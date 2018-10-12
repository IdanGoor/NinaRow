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

    for (let gameIndex in games){
        if (games.hasOwnProperty(gameIndex)) {
            let game = games[gameIndex];
            gameObjects.push(
                <GameTableBox
                    key={"game_table_object_"+game.title}
                    user={this.props.user}
                    game={game}
                    joinGame={this.props.joinGame}
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
        <div className={"page-column"} id={"games-table"}>
            <div className={"page-column-headline"}>
                Games
            </div>
            <div className={"page-column-content page-scrollbar"}>
                {this.renderGameObjects()}
            </div>
        </div>
    );
  }
}

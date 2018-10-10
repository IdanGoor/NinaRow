import React from "react";
import "../../css/global.css";
import "../../css/game/game.css";
import Board from "./board.jsx";
import GameInfo from "./gameInfo.jsx";
const _ = require("lodash");

function importAll(r) {
    let images = {};
    r.keys().map((key) => {images[(key.replace('./', '')).replace('.png', '')]=r(key)});
    return images;
}
const colors = importAll(require.context("../../resources/colors/", false, /\.png$/));


export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBoard(){
      //TODO: at the begining it shows only the board with squares and numbers
      //TODO: when game starts it show all the pushIn and popOut button (if needed)
  }

  render() {
    return (
        <div className={"game-layout"}>
            <GameInfo user={this.props.user} leaveGame={this.props.leaveGame}/>
            <Board/>
        </div>
    );
  }
}

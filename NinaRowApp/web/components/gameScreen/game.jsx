import React from "react";
import "../../css/global.css";
import "../../css/game/game.css";
import Board from "./board.jsx";
import GameInfo from "./gameInfo.jsx";

import ColorBlue from "../../resources/colors/color_blue.png";
import ColorRed from "../../resources/colors/color_red.png";
import ColorGreen from "../../resources/colors/color_green.png";
import ColorYellow from "../../resources/colors/color_yellow.png";
import ColorPink from "../../resources/colors/color_pink.png";
import ColorOrange from "../../resources/colors/color_orange.png";
const colors = [ColorBlue, ColorRed, ColorGreen, ColorYellow, ColorPink, ColorOrange];

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state={
        colors: ""
    };
  }

  setColors(players){
    let colorsMapping = new Map();
    for(let i=0;i<players.length;i++){
        colorsMapping.set(players[i].name, colors[i]);
    }

    this.setState(() => ({ colors: colorsMapping }));
  }


  render() {

    return (
        <div className={"game-layout"}>
            <GameInfo user={this.props.user} leaveGame={this.props.leaveGame}
                      setColors={this.setColors.bind(this)} colors={this.state.colors}/>
            <Board user={this.props.user} colors={this.state.colors}/>
        </div>
    );
  }
}

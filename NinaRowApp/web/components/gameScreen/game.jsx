import React from "react";
import "../../css/global.css";
import "../../css/game/game.css";
import Board from "./board.jsx";
import GameInfo from "./gameInfo.jsx";
import Chat from "./chat.jsx";

import ColorBlue from "../../resources/colors/color_blue.png";
import ColorRed from "../../resources/colors/color_red.png";
import ColorGreen from "../../resources/colors/color_green.png";
import ColorYellow from "../../resources/colors/color_yellow.png";
import ColorPink from "../../resources/colors/color_pink.png";
import ColorOrange from "../../resources/colors/color_orange.png";
import ColorBlueBoard from "../../resources/colors/color_blue_board.png";
import ColorRedBoard from "../../resources/colors/color_red_board.png";
import ColorGreenBoard from "../../resources/colors/color_green_board.png";
import ColorYellowBoard from "../../resources/colors/color_yellow_board.png";
import ColorPinkBoard from "../../resources/colors/color_pink_board.png";
import ColorOrangeBoard from "../../resources/colors/color_orange_board.png";
const colors = [ColorBlue, ColorRed, ColorGreen, ColorYellow, ColorPink, ColorOrange];
const colorsBoard = [ColorBlueBoard, ColorRedBoard, ColorGreenBoard, ColorYellowBoard, ColorPinkBoard, ColorOrangeBoard];

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state={
        colors: "",
        colorsBoard: ""
    };
  }

  setColors(players){
    let colorsMapping = new Map();
    let colorsBoardMapping = new Map();
    for(let i=0;i<players.length;i++){
        colorsMapping.set(players[i].name, colors[i]);
        colorsBoardMapping.set(players[i].name, colorsBoard[i]);
    }

    this.setState(() => ({ colors: colorsMapping, colorsBoard: colorsBoardMapping }));
  }


  render() {

    return (
        <div className={"game-layout"}>
            <GameInfo user={this.props.user} leaveGame={this.props.leaveGame}
                      setColors={this.setColors.bind(this)} colors={this.state.colors}/>
            <Board user={this.props.user} colors={this.state.colorsBoard}/>
            <Chat/>
        </div>
    );
  }
}

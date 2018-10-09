import React from "react";
import "../../css/global.css";
import "../../css/game/board.css";
import BoardSquare from "../../resources/square.png";
import ArrowGreen from "../../resources/arrows/arrow_green.png";
import ArrowGreenHover from "../../resources/arrows/arrow_green_hover.png";
import ArrowRed from "../../resources/arrows/arrow_red.png";
import ArrowRedHover from "../../resources/arrows/arrow_red_hover.png";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  showPushInColumn(){
      $("#column_"+`${this.props.column}`).css("background-color", "lightgreen");
      $("#pushIn_"+`${this.props.column}`).attr("src", ArrowGreenHover);
  }

  unshowPushInColumn(){
      $("#column_"+`${this.props.column}`).css("background-color", "");
      $("#pushIn_"+`${this.props.column}`).attr("src", ArrowGreen);
  }


  render() {
      const squares = [];
      for(let i=0;i<50;i++){
          squares.push(<img key={"square_"+i} className={"board-object"} src={BoardSquare}/>);
      }

    return (
        <div className={"board-column"}>
            <img id={"pushIn_"+this.props.column} className={"board-object"} src={ArrowGreen}
                 onMouseOver={this.showPushInColumn.bind(this)}
                 onMouseLeave={this.unshowPushInColumn.bind(this)}/>
            <div id={"column_"+this.props.column}>
                {squares}
            </div>
        </div>
    );
  }
}

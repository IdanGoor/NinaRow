import React from "react";
import "../../css/global.css";
import "../../css/game/board.css";
import BoardSquare from "../../resources/square.png";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const squares = [];
      for(let i=0;i<50;i++){
          squares.push(<img key={"square_"+i} className={"board-object"} src={BoardSquare}/>);
      }

    return (
        <div className={"board-column"} id={"column_"+this.props.column}>
            <div className={"number-square"}>{this.props.column+1}</div>
            {squares}
            <div className={"number-square"}>{this.props.column+1}</div>
        </div>
    );
  }
}

import React from "react";
import "../../css/global.css";
import "../../css/game/board.css";
import BoardSquare from "../../resources/square.png";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const discs = this.props.column.discs;
      const squareObjects = [];
      for(let i=0;i<discs.length;i++){
          if(discs[i] === null)
            squareObjects.push(<img key={"square_"+i} className={"board-object"} src={BoardSquare}/>);
          else
              squareObjects.push(<img key={"disc_"+discs[i].discId}
                                    className={"board-object"}
                                    src={this.props.colors.get(discs[i].player.name)}/>);
      }

    return (
        <div id={"column_"+this.props.column.index} className={"board-column"}>
            <div className={"board-object"}>{this.props.column.index+1}</div>
            {squareObjects}
            <div className={"board-object"}>{this.props.column.index+1}</div>
        </div>
    );
  }
}

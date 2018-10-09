import React from "react";
import "../../css/global.css";
import "../../css/game/board.css";
import BoardColumn from "./column.jsx";


export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_INTERVAL = 1000;

    this.state = {
        game: "",
        boardState: ""
    };

    //this.fetchGameInterval = setInterval(this.getGame.bind(this), this.UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.fetchBoardStateInterval);
    clearInterval(this.fetchGameInterval);
  }


  renderBoard(){
      //TODO: at the begining it shows only the board with squares and numbers
      //TODO: when game starts it show all the pushIn and popOut button (if needed)
  }

  render() {
      if(this.state.game.status==="ACTIVE" && !this.isGameStarted){
          this.isGameStarted = true;
      }

      var columns = [];
      for(let i=0;i<30;i++){
          columns.push(<BoardColumn key={"column_"+i} column={i}/>);
      }

    return (
        <div className={"board page-scrollbar"}>
            {columns}
        </div>
    );
  }
}

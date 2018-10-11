import React from "react";
import "../../css/global.css";
import "../../css/game/board.css";
import BoardColumn from "./column.jsx";
import ArrowGreen from "../../resources/arrows/arrow_green.png";
import ArrowGreenHover from "../../resources/arrows/arrow_green_hover.png";
import ArrowRed from "../../resources/arrows/arrow_red.png";
import ArrowRedHover from "../../resources/arrows/arrow_red_hover.png";
import ArrowGray from "../../resources/arrows/arrow_gray.png";


export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_INTERVAL = 1000;

    this.state={
        board: ""
    };

    this.getBoard();
    this.fetchBoardInterval = setInterval(this.getBoard.bind(this), this.UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.fetchBoardInterval);
  }

    getBoard() {
        $.ajax({
            method:'GET',
            url: buildUrlWithContextPath("board"),
            timeout: 4000,
            success: function(board){
                //TODO: add error message
                this.setState(() => ({ board: board }));
            }.bind(this)
        });
    }

  renderBoard(){
      //TODO: at the begining it shows only the board with squares and numbers
      //TODO: when game starts it show all the pushIn and popOut button (if needed)
  }

  showPushInColumn(column){
      $("#column_"+`${column}`).css("background-color", "lightgreen");
  }

    unshowPushInColumn(column){
        $("#column_"+`${column}`).css("background-color", "");
    }

  clickPushIn(column){
      closeErrorMessage();
      $("#pushIn_"+`${column}`).attr("src", ArrowGreenHover);
      this.unshowPushInColumn(column);

      $.ajax({
          method:'POST',
          url: buildUrlWithContextPath("pushIn"),
          data: "column="+column,
          timeout: 4000,
          error: function(jqXHR, ajaxSetting, error){
              showErrorMessage("pushIn", jqXHR.responseText);
          }
      });
  }

    releasePushIn(column){
        $("#pushIn_"+`${column}`).attr("src", ArrowGreen);
    }

    showPopOutColumn(column){
        $("#column_"+`${column}`).css("background-color", "red");
    }

    unshowPopOutColumn(column){
        $("#column_"+`${column}`).css("background-color", "");
    }

    clickPopOut(column){
      closeErrorMessage();
        $("#popOut_"+`${column}`).attr("src", ArrowRedHover);
        this.unshowPopOutColumn(column);

        $.ajax({
            method:'POST',
            url: buildUrlWithContextPath("popOut"),
            data: "column="+column,
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error){
                showErrorMessage("popOut", jqXHR.responseText);
            }
        });
    }

    releasePopOut(column){
        $("#popOut_"+`${column}`).attr("src", ArrowRed);
    }

    renderPushInButtons(){
        let buttons = [];

        buttons.push(<img className={"board-object"}/>);
        for(let i=0;i<this.state.board.columns;i++){
            if(this.state.board.status === "INACTIVE" || this.state.board.activePlayer.name !== this.props.user.name)
                buttons.push(
                    <img id={"pushIn_"+i} key={"pushIn_"+i} className={"board-object"} src={ArrowGray}/>);
            else
                buttons.push(
                    <img id={"pushIn_"+i} key={"pushIn_"+i} className={"board-object"} src={ArrowGreen}
                         onMouseOver={this.showPushInColumn.bind(this, i)}
                         onMouseLeave={this.unshowPushInColumn.bind(this, i)}
                         onMouseDown={this.clickPushIn.bind(this,i)}
                         onMouseUp={this.releasePushIn.bind(this,i)}
                    />
                );
        }

        return buttons;
    }

    renderPopOutButtons(){
        let buttons = [];

        if(this.state.board.variant==="Popout"){
            buttons.push(<img className={"board-object"}/>);
            for(let i=0;i<this.state.board.columns;i++){
                if(this.state.board.status === "INACTIVE" || this.state.board.activePlayer.name !== this.props.user.name)
                    buttons.push(
                        <img id={"popOut_"+i} key={"popOut_"+i} className={"board-object"} src={ArrowGray}/>);
                else
                    buttons.push(
                        <img id={"popOut_"+i} key={"popOut_"+i} className={"board-object"} src={ArrowRed}
                             onMouseOver={this.showPopOutColumn.bind(this, i)}
                             onMouseLeave={this.unshowPopOutColumn.bind(this, i)}
                             onMouseDown={this.clickPopOut.bind(this,i)}
                             onMouseUp={this.releasePopOut.bind(this,i)}
                        />
                    );
            }
        }

        return buttons;
    }

    renderColumns(){
        let columns = [];
        for(let i=0;i<this.state.board.columns;i++){
            columns.push(<BoardColumn key={"column_"+i} column={this.state.board.discsColumns[i]} colors={this.props.colors}/>);
        }

        return columns;
    }

    renderRowNumberColumn(){
      let numbers = [];

      for(let i=1; i<=this.state.board.rows;i++){
          numbers.push(<div className={"number-square"}>{i}</div>);
      }
      numbers.push(<div className={"number-square"}/>);

      return (
          <div className={"board-column"}>
              {numbers}
          </div>
      );
    }

  render() {
    return (
        <div className={"board-with-buttons"}>
            <div className={"buttons-row"}>
                {this.renderPushInButtons()}
            </div>

            <div className={"board page-scrollbar"}>
                {this.renderRowNumberColumn()}
                {this.renderColumns()}
            </div>

            <div className={"buttons-row"}>
                {this.renderPopOutButtons()}
            </div>
        </div>
    );
  }
}

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
    this.isSizeFixed = false;

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
                this.setState(() => ({ board: board }));
                if(board.isEnded)
                    clearInterval(this.fetchBoardInterval);
                if(!this.isSizeFixed) {
                    if(this.state.board.columns < 10) {
                        document.documentElement.style.setProperty('--board-object-size', '4vw');
                        document.documentElement.style.setProperty('--board-object-line-height', '4vw');
                    }
                    else if (this.state.board.columns >= 10 && this.state.board.columns < 20){
                        document.documentElement.style.setProperty('--board-object-size', '3vw');
                        document.documentElement.style.setProperty('--board-object-line-height', '3vw');
                    }
                    else{
                        document.documentElement.style.setProperty('--board-object-size', '2vw');
                        document.documentElement.style.setProperty('--board-object-line-height', '2vw');
                    }

                    this.isSizeFixed = true;
                }
            }.bind(this)
        });
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

      $.ajax({
          method:'POST',
          url: buildUrlWithContextPath("pushIn"),
          data: "column="+column,
          error: function(jqXHR, ajaxSetting, error){
              showErrorMessage("pushIn", jqXHR.responseText);
          },
          success: function(){
              this.unshowPushInColumn(column);
          }.bind(this)
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

        $.ajax({
            method:'POST',
            url: buildUrlWithContextPath("popOut"),
            data: "column="+column,
            error: function(jqXHR, ajaxSetting, error){
                showErrorMessage("popOut", jqXHR.responseText);
            },
            success: function(){
                this.unshowPopOutColumn(column);
            }.bind(this)
        });
    }

    releasePopOut(column){
        $("#popOut_"+`${column}`).attr("src", ArrowRed);
    }

    renderPushInButtons(){
        let buttons = [];

        buttons.push(<img key={"empty"} className={"board-object"} style={{opacity:"0"}}/>);
        for(let i=0;i<this.state.board.columns;i++){
            if(this.state.board.status === "INACTIVE"
                || this.state.board.activePlayer.name !== this.props.user.name
                || this.state.board.discsColumns[i].isFull)
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
            buttons.push(<img key={"empty"} className={"board-object"} style={{opacity:"0"}}/>);
            for(let i=0;i<this.state.board.columns;i++){
                if(this.state.board.status === "INACTIVE"
                    || this.state.board.activePlayer.name !== this.props.user.name
                    || this.state.board.discsColumns[i].isEmpty)
                    buttons.push(
                        <img id={"popOut_"+i} key={"popOut_"+i} className={"board-object"} src={ArrowGray}/>);
                else if(this.state.board.discsColumns[i].discs[0].player.name !== this.props.user.name)
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
          numbers.push(<div className={"board-object"} key={"rowNumber_"+i}>{i}</div>);
      }
      numbers.push(<div key={"empty"} className={"board-object"}/>);

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

import React from "react";
import "../../css/global.css";
import "../../css/game/board.css";
import BoardColumn from "./column.jsx";
import ArrowGreen from "../../resources/arrows/arrow_green.png";
import ArrowGreenHover from "../../resources/arrows/arrow_green_hover.png";
import ArrowRed from "../../resources/arrows/arrow_red.png";
import ArrowRedHover from "../../resources/arrows/arrow_red_hover.png";
import ArrowGray from "../../resources/arrows/arrow_gray.png";


export default class Char extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_INTERVAL = 1000;

    this.state={
        version: 0,
        entries: ""
    };

    this.fetchChatInterval = setInterval(this.getChat.bind(this), this.UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.fetchChatInterval);
  }

    getChat() {
        $.ajax({
            method:'GET',
            data: "chatVersion="+this.state.version,
            url: buildUrlWithContextPath("chat"),
            timeout: 4000,
            success: function(chat){
                if(chat.version !== this.state.version)
                    this.setState(() => (chat));
                // if(board.isEnded)
                //     clearInterval(this.fetchBoardInterval);
            }.bind(this)
        });
    }

    sendChat(e) {
      e.preventDefault();
      closeErrorMessage();
        $.ajax({
            method:'POST',
            data: $(e.target).serialize(),
            url: buildUrlWithContextPath("sendChat"),
            timeout: 4000,
            // error: function(jqXHR, ajaxSetting, error){
            //     showErrorMessage("send chat", jqXHR.responseText);
            // }
        });

        $("#chatText").val("");
    }


    renderEntries(){
        let entries = this.state.entries;
        let entryObjects = [];

        for (let entryIndex in entries){
            if (entries.hasOwnProperty(entryIndex)) {
                let entry = entries[entryIndex];
                entryObjects.push(
                    <span>{entry.player.name} >>> {entry.text}</span>
                );
                entryObjects.push(<br/>);
            }
        }

        return entryObjects;
    }



  render() {
    return (
        <div id={"game-chat"}>
            <div className={"page-column-content"} className={"chat"}>
                <div id={"chatArea"}>
                    {this.renderEntries()}
                </div>
                <form id={"chatForm"} onSubmit={this.sendChat.bind(this)}>
                    <input type={"text"} id={"chatText"} name={"chatText"} style={{width:"70%"}}/>
                    <input type={"Submit"} value={"Send"}/>
                </form>
            </div>
        </div>
    );
  }
}

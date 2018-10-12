import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/userInfo.css";
import Human from "../../resources/human.png";
import Computer from "../../resources/computer.png";

export default class PlayerBox extends React.Component {
  constructor(props) {
    super(props);
  }

  renderForPlayer(){
      let objects = [];
      if(this.props.isPlayer){
          objects.push(<div>turn:{this.props.player.turnAmount}</div>);
          objects.push(<img style={{width: "20px"}} src={this.props.color}/>);
      }

      return objects;
  }

  render() {
    return (
        <div className={this.props.isPlaying ? "player-box-playing" : "player-box"}>
            <img style={{width: "20px"}} src={this.props.player.type === "Human" ? Human : Computer}/>
            <div style={{overflow:"hidden", whiteSpace:"nowrap", textOverflow: "ellipsis"}}><b>{this.props.player.name}</b></div>
            {this.renderForPlayer()}
        </div>
    );
  }
}

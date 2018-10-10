import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/userInfo.css";

export default class PlayerBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={"player-box"}>
          <div>{this.props.player.name}</div>
          <div>{this.props.player.type}</div>
          <img style={{width: "20px"}} src={this.props.color}/>
          <div>turn amount: {this.props.player.turnAmount}</div>
        </div>
    );
  }
}

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
          <div>{this.props.name}</div>
          <div>{this.props.type}</div>
          <div>clr</div>
          <div>turn amount: 5</div>
        </div>
    );
  }
}

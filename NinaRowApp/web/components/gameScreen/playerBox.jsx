import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/userInfo.css";

export default class PlayerBox extends React.Component {
  constructor(props) {
    super(props);
  }

  renderForPlayer(){
      let objects = [];
      if(this.props.isPlaying){
          objects.push(<img style={{width: "20px"}} src={this.props.color}/>);
          objects.push(<div>turn amount: {this.props.player.turnAmount}</div>);
      }

      return objects;
  }

  render() {
    return (
        <div className={"player-box"}>
          <div>{this.props.player.name}</div>
          <div>{this.props.player.type}</div>
            {this.renderForPlayer()}
        </div>
    );
  }
}

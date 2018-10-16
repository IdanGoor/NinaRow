import React from "react";
import "../../css/global.css";
import "../../css/lobby/lobby.css";
import "../../css/lobby/playerTable.css";

export default class PlayerTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPlayerTable() {
    return (
      <table className={"players-table"}>
        <tbody>
          <tr>
              <th>Name</th>
              <th>Type</th>
          </tr>
          {Object.keys(this.props.players).map((player, index) => (
            <tr key={player}>
              <td key={player + "_" + index + "_name"}>{this.props.players[player].name}</td>
              <td key={player + "_" + index + "_type"}>{this.props.players[player].type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return(
        <div className={"page-column"} id={"players-table"}>
            <div className={"page-column-headline"}>
                Users
            </div>
            <div className={"player-table-content page-column-content page-scrollbar"}>
                {this.renderPlayerTable()}
            </div>
        </div>);
  }
}

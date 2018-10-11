import React from "react";
import "../css/global.css";
import Login from "./loginScreen/login.jsx"
import logo from "../resources/logo.png";

export default class BaseContainer extends React.Component {
  constructor() {
    super();
  };

  render() {
    return (
        <div className={"base-background"}>
            <div className={"page-layout"}>
                <img className={"logo"} src={logo} />
                <div className={"page-content"}>
                    <Login/>
                </div>
            </div>

            <div id={"errorMessage"} className={"error-message"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <span className={"close"} onClick={closeErrorMessage}>&times;</span>
                        <p id={"errorMessageContent"}>Error Text</p>
                    </div>
                </div>

            </div>


        </div>
    )
  }
}

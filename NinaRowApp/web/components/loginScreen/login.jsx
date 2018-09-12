import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errMessage: ""
    };
  }

  handleLogin(e){
      e.preventDefault();
      const userName = e.target.elements.userName.value;
      if (userName === ""){
        this.setState(() => ({
            errMessage: "User name is empty, please try another one"
        }));
      } else if (userName.length > 15){
        this.setState(() => ({
            errMessage: "User name is too long, please try another one"
        }));
      }

      //observableAppState.loginPlayer(userName, "Human");

  }

  // handleLogin(e) {
  //   e.preventDefault();
  //   const userName = e.target.elements.userName.value;
  //   if (userName === ""){
  //       this.setState(() => ({
  //           errMessage: "User name is empty, please try another one"
  //       }));
  //   } else if (userName.length > 15){
  //       this.setState(() => ({
  //           errMessage: "User name is too long, please try another one"
  //       }));
  //   }
  //   else{
  //       fetch("/users/addUser", {
  //           method: "POST",
  //           body: userName,
  //           credentials: "include"
  //       }).then(response => {
  //           if (response.ok) {
  //               this.setState(() => ({ errMessage: "" }));
  //               this.props.updateViewManager();
  //           } else {
  //               if (response.status === 403) {
  //                   this.setState(() => ({
  //                       errMessage: "User name already exist, please try another one"
  //                   }));
  //               }
  //               console.error("login failed");
  //           }
  //       });
  //       return false;
  //   }
  // }

    renderErrorMessage() {
        if (this.state.errMessage) {
            return <div className="error-message">{this.state.errMessage}</div>;
        }
        return null;
    }

  render() {
    return (
        <div className={"login-layout"}>
            <form id={"login-form"} onSubmit={this.handleLogin.bind(this)}>
                <label htmlFor="userName">
                    Username:{" "}
                </label>
                <input name="userName" />
                <input type={"submit"} className={"button-green"} value={"Login"} style={{fontSize:"16px"}}/>
            </form>
            {this.renderErrorMessage()}
        </div>
    );
  }
}

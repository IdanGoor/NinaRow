import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errMessage: ""
    };
  }

  handleLogin(e) {
    e.preventDefault();
    console.log(e.target.elements);
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
    else{
        $.ajax({
            url: "/users/login",
            data: "playername=" + userName,
            dataType: 'json'
        });
        // fetch("/users/login", {
        //     method: "POST",
        //     body: "playername="+this.username,
        //     //body: JSON.stringify({playername: this.username}),
        //     //headers: {'Content-Type': 'application/json'},
        //     credentials: "include"
        // }).then(response => {
        //     if (response.ok) {
        //         this.setState(() => ({ errMessage: "" }));
        //         this.props.updateViewManager();
        //     } else {
        //         if (response.status === 403) {
        //             this.setState(() => ({
        //                 errMessage: "User name already exist, please try another one"
        //             }));
        //         }
        //         console.error("login failed");
        //     }
        // });
        return false;
    }
  }

    renderErrorMessage() {
        if (this.state.errMessage) {
            return <div className="error-message">{this.state.errMessage}</div>;
        }
        return null;
    }

    handleUpload(e){
        e.preventDefault();
        console.log(e.target.elements);

        let fileLoaded = e.target.elements.fileLoaded.files[0];
        let formData = new FormData();
        formData.append("loaded-file-key", fileLoaded);

        $.ajax({
            method:'POST',
            data: formData,
            url: "/upload",
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            timeout: 4000,
            error: function(e) {
                console.error("Failed to submit");
                $("#result").text("Failed to get result from server " + e);
            },
            success: function(r) {
                $("#result").text(r);
            }
        });

        e.target.elements.fileLoaded.value = null;
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

            <form id={"uploadForm"} onSubmit={this.handleUpload.bind(this)} encType={"multipart/form-data"}>
                <input type={"file"} name={"fileLoaded"}/>
                <input type={"submit"} value={"Upload File"} className={"button-green"} style={{fontSize:"16px"}}/>
            </form>

            <div id="result">
            </div>
            {this.renderErrorMessage()}
        </div>
    );
  }
}

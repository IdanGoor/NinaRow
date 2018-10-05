import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/userInfo.css";

export default class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.playerName = props.playerName;
    this.state ={
        showAddGameForm: false
    };
  }

    logoutHandler() {
        $.ajax({
            method:'POST',
            url: "/users/logout",
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                console.error("Failed to logout");
                $("#errorMessage").text("Error: " + jqXHR.responseText);
            },
            success: function(){
                this.props.logout();
            }.bind(this)
        });
    }

  toggleAddGameForm(){
      this.setState(()=>({showAddGameForm: !this.state.showAddGameForm}));
  }

    handleUpload(e){
        e.preventDefault();
        let fileLoaded = e.target.elements.fileLoaded.files[0];
        let formData = new FormData();
        formData.append("loaded-file-key", fileLoaded);

        $.ajax({
            method:'POST',
            data: formData,
            url: "/upload",
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            // timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                console.error("Failed to submit");
                $("#errorMessage").text("Error: " + jqXHR.responseText);
            }
        });

        e.target.elements.fileLoaded.value = null;
    }

  render() {
    return (
        <div className={"lobby-column"} id={"user-info"}>
            <div className={"lobby-column-headline"}>
                Info
            </div>
            <div className={"lobby-column-content"}>
                <div className={"user-info-content"}>
                    <p><b>Name: </b>{this.playerName}</p>
                    <form id={"uploadForm"} onSubmit={this.handleUpload.bind(this)} encType={"multipart/form-data"}>
                        <input type={"file"} name={"fileLoaded"}/>
                        <input type={"submit"} value={"Upload File"} className={"button-green"}/>
                    </form>
                    <button className={"button-red"} onClick={this.logoutHandler.bind(this)}>Logout</button>
                </div>
            </div>
            <div id="errorMessage" className="error-message"/>
        </div>
    );
  }
}

import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/userInfo.css";

export default class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
  }

    logoutHandler() {
      closeErrorMessage();
        $.ajax({
            method:'POST',
            url: buildUrlWithContextPath("logout"),
            timeout: 4000,
            error: function(jqXHR, ajaxSetting, error) {
                showErrorMessage("logout", jqXHR.responseText);
            },
            success: function(){
                this.props.logout();
            }.bind(this)
        });
    }

    handleUpload(e){
        e.preventDefault();
        closeErrorMessage();
        let fileLoaded = e.target.elements.fileLoaded.files[0];
        let formData = new FormData();
        formData.append("loaded-file-key", fileLoaded);

        $.ajax({
            method:'POST',
            data: formData,
            url: buildUrlWithContextPath("upload"),
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            error: function(jqXHR, ajaxSetting, error) {
                showErrorMessage("upload file", jqXHR.responseText);
            }
        });

        e.target.elements.fileLoaded.value = null;
    }

  render() {
    return (
        <div className={"page-column"} id={"user-info"}>
            <div className={"page-column-headline"}>
                Info
            </div>
            <div className={"page-column-content"}>
                <div className={"user-info-content"}>
                    <p><b>Name: </b>{this.props.user.name}<br/><b>Type: </b>{this.props.user.type}</p>
                    <form id={"uploadForm"} onSubmit={this.handleUpload.bind(this)} encType={"multipart/form-data"}>
                        <input type={"file"} name={"fileLoaded"}/>
                        <input type={"submit"} value={"Upload File"} className={"button-green"}/>
                    </form>
                    <button className={"button-red"} onClick={this.logoutHandler.bind(this)}>Logout</button>
                </div>
            </div>
        </div>
    );
  }
}

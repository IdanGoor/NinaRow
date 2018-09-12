// import {observable, decorate} from "mobx";
// import mobx from "mobx";
// mobx.configure({enforceActions: true});
//
// var LOGIN_URL = buildUrlWithContextPath("login");
// var PLAYER_LIST_URL = buildUrlWithContextPath("playerlist");
// var GAME_LIST_URL = buildUrlWithContextPath("gamelist");
//
// class appState{
//     isLogged = false;
//     activeGame = null;
//     players = [];
//     games = [];
//
//     @action
//     fetchPlayers(){
//         this.players = [];
//         fetch(PLAYER_LIST_URL, { method: "GET", credentials: "include" })
//             .then(response => {
//                 if (!response.ok) {
//                     throw response;
//                 }
//                 return response.json();
//             })
//             .then(data => { this.players = data })
//             .catch(err => { throw err });
//     }
//
//     @action
//     loginPlayer(name, type){
//         fetch(LOGIN_URL, {
//             method: "POST",
//             body: {name: name, type: type},
//             credentials: "include"
//         }).then(response => {
//             if (response.ok) {
//                 this.isLogged = true;
//             } else {
//                 if (response.status === 400) {
//                     this.setState(() => ({
//                         errMessage: "User name already exist, please try another one"
//                     }));
//                 }
//                 console.error("login failed");
//             }
//         });
//         return false;
//     }
//
// }
//
// decorate(appState,{
//     isLogged: observable,
//     activeGame: observable,
//     players: observable,
//     games: observable
// });
//
// const observableAppState = new appState();
// export default observableAppState;
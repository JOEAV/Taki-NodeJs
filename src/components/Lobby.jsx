import React from 'react';
import ReactDOM from 'react-dom';
const _ = require('lodash');
export default class Lobby extends React.Component {
    constructor(args) {
        super(...args);

       this.state = {
           gameList:[]
       };


        //this.handleAddGame = this.handleAddGame.bind(this);
        //this.handleRemoveGame = this.handleRemoveGame.bind(this);
        //this.handleJoinGame = this.handleJoinGame.bind(this);
        //this.loadGamesList = this.loadGamesList.bind(this);


    }

    loadGamesList(){

    }

    componentDidMount(){
        setInterval(()=>{
            fetch('/lobby/allGames',{method:'GET',credentials:'include'}).then((response)=>{
                if (!response.ok){
                    throw response;
                }
                return response.json();
                })
                .then(gameList => {
                    this.setState(()=>{gameList});
                })
                .catch(err => {throw err});
        },200)
    }

    shouldComponentUpdate(props){
        return !_.isEqual(props.gameList,this.state.gameList)

    }
    render() {
        return (
            <div className="gamesListArea">
                <div className="addGameArea">
                    <form>
                        <label>
                            Game name:
                            <input type='text' placeholder='game name' name="newGameName"  />
                        </label>
                        <label>
                            Number of players:
                            <select>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </label>
                    </form>

                </div>


                <h1>Games:</h1>
                <ul>
                    {this.state.gameList.map((game, index) => {
                        return (<li key={game.name + index} class="gameUiBlock">
                            {`
                            Name:${game.name}
                            Creator:${game.creator}
                            Required players:${game.numPlayers}
                            Logged in players:${game.loggedInPlayers}
                            Status:${game.status}
                            `}
                        </li>)}
                    )}
                </ul>

            </div>
        );
    }

    getChatContent() {
        return fetch('/chat', {method: 'GET', credentials: 'include'})
            .then((response) => {
                if (!response.ok){
                    throw response;
                }
                this.timeoutId = setTimeout(this.getChatContent, 200);
                return response.json();
            })
            .then(content => {
                this.setState(()=>({content}));
            })
            .catch(err => {throw err});
    }



    handleAddGame(e) {
        e.preventDefault();
        const userName = e.target.elements.userName.value;
        fetch('/users/addUser', {method:'POST', body: userName, credentials: 'include'})
            .then(response=> {
                if (response.ok){
                    this.setState(()=> ({errMessage: ""}));
                    this.props.loginSuccessHandler();
                } else {
                    if (response.status === 403) {
                        this.setState(()=> ({errMessage: "User name already exist, please try another one"}));
                    }
                    this.props.loginErrorHandler();
                }
            });
        return false;
    }
}
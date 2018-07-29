import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './login-modal.jsx';
import ChatContaier from './chatContainer.jsx';
import Lobby from './Lobby.jsx';
import Game from './game.jsx';


export default class GamesContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            gameName:""
        };

        this.handleSuccessedJoin = this.handleSuccessedJoin.bind(this);
        this.handleJoinError = this.handleJoinError.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.withdrawHandler= this.withdrawHandler.bind(this);

        this.getUserGame();
    }

    render() {
        if (this.state.gameName === '') {
            return (<Lobby name={this.props.name} joinSuccessHandler={this.handleSuccessedJoin} joinErrorHandler={this.handleJoinError}/>)
        }
        return <Game/>
    }


    handleSuccessedJoin(gameName) {
        this.setState(()=>({gameName:gameName}));
    }

    handleJoinError() {
        console.error('login failed');
        this.setState(()=>({gameName:''}));
    }


    getUserGame() {
        this.fetchUserInfo()
            .then(userInfo => {
                this.setState(()=>({gameName:userInfo.gameName}));
            })
            .catch(err=>{
                if (err.status === 401) { // incase we're getting 'unautorithed' as response
                    this.setState(()=>({gameName:''}));
                }
            });
    }

    fetchUserInfo() {
        return fetch('/users',{method: 'GET', credentials: 'include'})
            .then(response => {
                if (!response.ok){
                    throw response;
                }
                return response.json();
            });
    }

    withdrawHandler() {
        fetch('/Lobby/withdraw', {method: 'GET', credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    console.log(`failed to logout user ${this.state.currentUser.name} `, response);
                }
                this.setState(()=>({currentUser: {name:''}, showLogin: true}));
            })
    }
}
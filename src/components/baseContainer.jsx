import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './login-modal.jsx';
import GamesContainer from './gamesContainer.jsx';

export default class BaseContainer extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            showLogin: true,
            currentUser: {
                name: ''
            }
        };

        this.handleSuccessedLogin = this.handleSuccessedLogin.bind(this);
        this.handleLoginError = this.handleLoginError.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.logoutHandler= this.logoutHandler.bind(this);

        this.getUserName();
    }
    
    render() {        
        if (this.state.showLogin) {
            return (<LoginModal loginSuccessHandler={this.handleSuccessedLogin} loginErrorHandler={this.handleLoginError}/>)
        }
        return this.renderChatRoom();
    }


    handleSuccessedLogin() {
        this.setState(()=>({showLogin:false}), this.getUserName);        
    }

    handleLoginError() {
        console.error('login failed');
        this.setState(()=>({showLogin:true}));
    }


    renderChatRoom() {
        return(
            <div className="chat-base-container">
                <div className="user-info-area">
                    <h1> Hello  {this.state.currentUser.name}</h1>
                    <div>
                    <button id="logout-button" onClick={this.logoutHandler}>Logout</button>
                    </div>
                </div>
                <GamesContainer currentUser={this.state.currentUser} />
            </div>
        )
    }

    getUserName() {
        this.fetchUserInfo()
        .then(userInfo => {
            this.setState(()=>({currentUser:userInfo, showLogin: false}));
        })
        .catch(err=>{            
            if (err.status === 401) { // incase we're getting 'unautorithed' as response
                this.setState(()=>({showLogin: true}));
            } else {
                throw err; // in case we're getting an error
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

    logoutHandler() {
        fetch('/users/logout', {method: 'GET', credentials: 'include'})
        .then(response => {
            if (!response.ok) {
                console.log(`failed to logout user ${this.state.currentUser.name} `, response);                
            }
            this.setState(()=>({currentUser: {name:''}, showLogin: true}));
        })
    }
}
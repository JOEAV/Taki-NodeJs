import React from 'react';
import ReactDOM from 'react-dom';
import takiImage from './resources/superTaki.jpg';
import App from './App';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            statusInfo:{
                status:'pending',
                numOfMissing:0,
                gameDeck: null,
                playersNames:[],
                myIndex:0
            },
        };

        this.getStatus = this.getStatus.bind(this);
    }

    componentDidMount() {
        this.getStatus();
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    getStatus() {
        if ( this.state.statusInfo.status === 'pending')
        return fetch('/Lobby/gameStatus', {method: 'GET', credentials: 'include'})
            .then((response) => {
                if (!response.ok){
                    throw response;
                }
                this.timeoutId = setTimeout(this.getStatus, 200);
                return response.json();
            })
            .then(statusInfo => {
                this.setState(()=>({statusInfo}));
            })
            .catch(err => {throw err});
    }

    render() {
        if (this.state.statusInfo.gameDeck === null)
        return (
            <div className="login-page-wrapper">
               <div>Pending</div>
                <div>wait for {this.state.statusInfo.numOfMissing} players </div>
            </div>
        );
        else
            return (
               <App gameName={this.props.gameName} currentUser={this.props.currentUser} game={this.state.statusInfo}/>
            );
    }

}

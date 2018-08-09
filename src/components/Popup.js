import React from 'react';
import {Component} from 'react'
import './css/main.css'
import './css/chooseColor.css'
import './css/endGame.css'
import timeToString from './js/serviceUtils/timeUtils'
import {handleColorChoosed,backToLobby}  from "./js/Controllers/controller";
export default class Popup extends Component{

    constructor(props){
        super(props)
        this.state={
        }
    }

    onColorChoosed(event){
        handleColorChoosed(event)
    }

    createPlayerStatistics(player,index){
        let playerPlace= player.place>0 ?  player.place: "still plays"
        return (
            <div key={player._name + index} id="myStats">
                <div className="myStatHeader">{player._name}</div>
                <div className="myStatsInfo">{`place: ${playerPlace}`} </div>
                <div className="myStatsInfo">{'Avg. Move Time: ' + timeToString(player.avgMovesTime,true)}</div>
                <div className="myStatsInfo">{'Last Card: ' + player.reachedLastCard}</div>
                <div className="myStatsInfo">{'Num Of Moves : '+ player.moves}</div>
            </div>

        )
    }

    mapPopupTypeToJsx(){
        if  (this.props.renderChooseColor){
            return(
                <div id="popup" style={{display:'block'}}>
                    <div className="popupContent">
                        <div className="popupHeader">Color Chooser</div>
                        <div className="colorOption" color="blue" id="squareBlue" onClick={this.onColorChoosed} />
                        <div className="colorOption" color="green" id="squareGreen" onClick={this.onColorChoosed} />
                        <div className="colorOption" color="yellow" id="squareYellow" onClick={this.onColorChoosed}/>
                        <div className="colorOption" color="red" id="squareRed" onClick={this.onColorChoosed}/>
                    </div>
                </div>
            )
        } else if(this.props.renderStatistics){
            let players=this.props.players;
            return(
                <div id="popup" style={{display:'block'}}>
                    <div className="endGamePopupContent">
                            <div className="endGamePopupHeader" style={{display: 'flex'}}>Game Statistics</div>
                            <div className="endGamePopupBody" color="blue">
                                <div id="endGameStats">
                                    {players.map((player, index) => this.createPlayerStatistics(player,index))}
                                </div>
                                <button id="replay-button" onClick={backToLobby}>back To Lobby</button>
                            </div>
                    </div>
                </div>
            )
        }

        else {
            return(
                <div/>
            )
        }
    }


    render(){

        return( this.mapPopupTypeToJsx()   )

    }
}
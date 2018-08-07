import React from 'react';
import {Component} from 'react'
import './css/main.css'
import './css/chooseColor.css'
import './css/endGame.css'
import timeToString from './js/serviceUtils/timeUtils'
import {handleColorChoosed,replay}  from "./js/Controllers/controller";
export default class Popup extends Component{

    constructor(props){
        super(props)
        this.state={
        }
    }

    onColorChoosed(event){
        handleColorChoosed(event)
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
            let player=this.props.players[0];
            let algo=this.props.players[1];
            return(
                <div id="popup" style={{display:'block'}}>
                    <div className="endGamePopupContent">
                            <div className="endGamePopupHeader" style={{display: 'flex'}}>Game Statistics</div>
                            <div className="endGamePopupBody" color="blue">
                                <div id="winner">{this.props.winner!==this.props.myIndex ? 'You Loose!':'You Win!'}</div>
                                <div id="endGameStats">
                                    <div id="myStats">
                                        <div id="myStatHeader">My Stats</div>
                                        <div id="myTotalAvgMoveTime" className="myStatsInfo"></div>
                                        <div id="myAvgMoveTime" className="myStatsInfo">{'Avg. Move Time: '+timeToString(player.avgMovesTime,true)}</div>
                                        <div id="myReachedLast" className="myStatsInfo">{'Last Card: '+player.reachedLastCard}</div>
                                        <div id="myTotalMoves" className="myStatsInfo">{'Num Of Moves : '+player.moves}</div>
                                    </div>
                                    <div id="algoStats">
                                        <div id="algoStatHeader">Algo Stats</div>
                                        <div id="algoTotalAvgMoveTime" className="algoStatsInfo"></div>
                                        <div id="algoAvgMoveTime" className="algoStatsInfo">{'Avg. Move Time: '+timeToString(algo.avgMovesTime,true)}</div>
                                        <div id="algoReachedLast" className="algoStatsInfo">{'Last Card: '+algo.reachedLastCard}</div>
                                        <div id="algoTotalMoves" className="algoStatsInfo">{'Num Of Moves : '+algo.moves}</div>
                                    </div>
                                </div>
                                <button id="replay-button" onClick={replay}>replay</button>
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
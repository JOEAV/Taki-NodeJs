import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'
import Statistics from './Statistics';
import {surrender,restart,prev,next} from './js/Controllers/controller'
import './css/topBar.css'
export default class TopBar extends Component{


    render(){
           return(
               <div id='topBar'>
                   <Statistics
                                stop = {this.props.stop}
                                name = {this.props.name}
                                totalMoves={this.props.totalMoves}
                               avgMovesTime={this.props.avgMovesTime}
                               reachedLastCard={this.props.reachedLastCard}
                               replayMode={this.props.replayMode}
                               timeElapsed={this.props.timeElapsed}
                                players = {this.props.players}
                   />
                   {this.props.replayMode ? (<div id='topBarButtonsContainer'>
                                                 <button className="replay-button" title='click' name='click1' onClick={prev}>previous</button>
                                                <button className="surrender-button" title='click' name='click1' onClick={restart}>restart</button>
                                                <button className="replay-button" title='click' name='click1' onClick={next}>next</button>
                                            </div>)
                       :
                       (<button className="surrender-button" title='click' name='click1' disabled={this.props.isTakiMode || !this.props.leaveGameIsShown} hidden={this.props.isTakiMode || !this.props.leaveGameIsShown} onClick={surrender}>leaveGame</button>)}
               </div>
           )
    }


}

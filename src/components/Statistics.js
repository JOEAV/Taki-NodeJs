import React from 'react';
import {Component} from 'react'
import './css/topBar.css'
import StatsFragment from './StatsFragment'
import Timer from './Timer'
export default class Statistics extends Component{

    render(){
        let names=''
        this.props.players.forEach(player=>{
            names+=player._name;
            names+=' ';
        })
        return(
            <div >
               <div id='topBarFirstRow'>
                   <StatsFragment style='topBarItemFirstRow' title="current player name" val={this.props.name} />
                   <StatsFragment style='topBarItemFirstRow' title="Total Moves" val={this.props.totalMoves} />
                   <StatsFragment style='topBarItemFirstRow' title="Avg Moves Time" val={this.props.avgMovesTime} />
                   <StatsFragment style='topBarItemFirstRow' title="Reached Last Card" val={this.props.reachedLastCard} />
                   <Timer  replayMode={this.props.replayMode}
                           timeElapsed={this.props.timeElapsed}
                           stop = {this.props.stop}
                   />
               </div>
                <div>
                    {`players list: ${names}`}
                </div>

            </div>
        )

    }

}
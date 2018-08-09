import React from 'react';
import {Component} from 'react'
import './css/topBar.css'
import StatsFragment from './StatsFragment'
import {registerTimerCompRef} from "./js/Controllers/controller";
import timer from './js/Logic/Timer'

export default class TimerStatsFragment extends Component{

    constructor(props){
        super(props);
        this.state={
            timeElapsed:"00:00"
        }
        this.getTimer = this.getTimer.bind(this)
    }

    componentWillMount(){
        this.getTimer();
    }

    componentWillUnmount(){
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
    render(){
        let val=this.props.replayMode? this.props.timeElapsed:this.state.timeElapsed;
        if (this.props.stopTime === true){
            this.stopTimer();
        }
        return(
            <StatsFragment style='topBarItemFirstRow' title="Time Elapsed" val={val} />
        )

    }

    getTimer() {

        return fetch('/Lobby/timeElapsed', {method: 'GET', credentials: 'include'})
            .then((response) => {
                if (!response.ok){
                    throw response;
                }
                this.timeoutId = setTimeout(this.getTimer, 200);
                return response.json();
            })
            .then(timeElapsed => {
                this.setState(()=>timeElapsed)
                timer.timeElapsed=timeElapsed.timeElapsed;
                timer.hour=timeElapsed.hour;
                timer.min=timeElapsed.min;
                timer.sec=timeElapsed.sec;
                timer.ms=timeElapsed.ms;
            })
            .catch(err => {throw err});

    }

    stopTimer(){
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}
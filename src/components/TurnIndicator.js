import React from 'react';
import {Component} from 'react'
import './css/main.css'
import './css/card.css'
import './css/TakiPopup.css'
import {TakiModeclickEventListener} from './js/Controllers/controller'
export default class TurnIndicator extends Component{

    fireTakiAnimation(){
        return `scaleColorAnimation${this.props.takiAnimationColor.toUpperCase()}`
    }

    setTurnIndicatorBackground(){
        let classNames="";
        if(this.props.isTakiMode){
            classNames= `turnIndicatorTakiOn`
        } else{
            classNames =  this.props.activePlayer===0 ? `turnIndicator backgroundImageBoy` : `turnIndicator backgroundImageRobot`
        }
        return classNames;


    }
    render(){

        return(
            <div id={'turnIndicatorContainer'}>
                <div className={this.setTurnIndicatorBackground()} style={{zIndex:100}} onClick={this.props.isTakiMode ? TakiModeclickEventListener : null}/>
                <div className={`takiInteractionActive ${this.props.isTakiMode ?  this.fireTakiAnimation() : ""}`}/>
            </div>
        )

    }
}
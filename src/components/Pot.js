import React from 'react';
import {Component} from 'react'
import './css/main.css'
import './css/pot.css'
import Deck from './Deck'
import {registerPotRef, onCardDroppedHandler} from "./js/Controllers/controller";
export default class Pot extends Component{


    dropHandler(e){
        onCardDroppedHandler(e)
    }
    allowDrop(e) {
        e.preventDefault();
    }
    componentDidMount(){
        registerPotRef();
    }

    mapInstructions(){
        switch(this.props.pot.getTopCardValue().rank){

            case 'plus':
                return 'You have another turn'
            case '2plus':
                return 'Put another +2 or take cards from the dekc'
            default:
                return ''
        }

    }
    render(){

        return(

            <div className={`potContainer` } onDragOver={this.allowDrop} onDrop={this.dropHandler} style={{zIndex:this.props.containerZIndex}}>
                <Deck owner='pot' cards={this.props.pot._cardArray}
                      replayMode={this.props.replayMode} />
            </div>
        )

    }
}
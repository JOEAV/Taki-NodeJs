import React from 'react';
import {Component} from 'react'
import './css/player.css'
import Deck from './Deck'
export default class Player extends Component{
    render(){
        return(
                <Deck cards={this.props.player._deck._cardArray ? this.props.player._deck._cardArray : []}
                      owner={this.props.owner==='player' ?
                          'player'+this.props.activeDescription
                          :
                          this.props.owner}
                          containerZIndex={this.props.containerZIndex}
                      replayMode={this.props.replayMode}
                 />

        )

    }
}
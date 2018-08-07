import React from 'react';
import {Component} from 'react'
import './css/main.css'
import Player from "./Player"
import GameRow from "./GameRow"
import Popup from "./Popup"
export default class Stage extends Component{

    mapInstructions(props){
       if (props.replayMode===false && props.isTakiMode===false) {
           switch (this.props.pot.getTopCardValue().rank) {

               case 'plus':
                   return 'You have another turn'
               case '2plus':
                   if (props.howMany2Plus>0) {
                       return 'Put another +2 or take cards from the deck'
                   }
                   else{
                       return ''
                   }
               case 'stop':
                   return 'you stopped your opponent play again'
               default:
                   return ''
           }
       }
       return'';

    }

    renderPlayers(numOfPlayers){
        if (numOfPlayers===3)
        return (
                <Player  player={this.props.players[(this.props.myIndex+1) % this.props.players.length]} owner={'playerNonActive'} containerZIndex = {this.props.isTakiMode ? 100 : 1} replayMode={this.props.replayMode}
                         activeDescription= 'Active' layout={{formation:'col',position:'right'}}/>
        )

        else  if (numOfPlayers===4)
        return (
            <div>
                <Player  player={this.props.players[(this.props.myIndex+1) % this.props.players.length]} owner={'playerNonActive'} containerZIndex = {this.props.isTakiMode ? 100 : 1} replayMode={this.props.replayMode}
                                activeDescription= 'Active' layout={{formation:'col',position:'right'}}/>
            <Player  player={this.props.players[(this.props.myIndex+3) % this.props.players.length]} owner={'playerNonActive'} containerZIndex = {this.props.isTakiMode ? 100 : 1} replayMode={this.props.replayMode}
        activeDescription= 'Active' layout={{formation:'col',position:'left'}}/>
            </div>
        )
        else return
    }

    render(){
        let numOfplayers= this.props.players.length;
        let topRowPlayerIndex = numOfplayers ===2 ?
            (this.props.myIndex+1) % this.props.players.length :
            (this.props.myIndex+2) % this.props.players.length

        return(
            <div id='mainContent'>
                <Popup renderChooseColor = {this.props.userInteractionsEvents.chooseColorCardDropped} renderStatistics={this.props.winner !== -1} players={this.props.players} winner={this.props.winner} myIndex={this.props.myIndex}/>
                <Player player={this.props.players[topRowPlayerIndex]} owner={'playerNonActive'} containerZIndex = {this.props.isTakiMode ? 100 : 1}  replayMode={this.props.replayMode} layout={{formation:'row',position:'top'}} />
                <GameRow userInteractionsEvents={this.props.userInteractionsEvents}
                    gameDeck = {this.props.gameDeck}
                    pot = {this.props.pot}
                    activePlayer={this.props.activePlayer}
                         containerZIndex = {this.props.isTakiMode ? 100 : 1}
                         isTakiMode={this.props.isTakiMode}
                         replayMode={this.props.replayMode}
                />
                <h1 id="cardInstructions">{this.mapInstructions(this.props)}</h1>
                {this.renderPlayers(numOfplayers)}
                <Player  player={this.props.players[this.props.myIndex]} owner={'playerActive'} containerZIndex = {this.props.isTakiMode ? 100 : 1} replayMode={this.props.replayMode}
                         activeDescription= 'Active' layout={{formation:'row',position:'bottom'}}/>
            </div>
        )
    }
}
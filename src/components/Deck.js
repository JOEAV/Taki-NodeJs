import React from 'react';
import {Component} from 'react'
import Card from './Card'
import './css/card.css'



import {onCardHoverStart, onCardHoverEnd, handlePulledTopCardClick,onDragStart,onDragEnd} from "./js/Controllers/controller";

export default class Deck extends Component{
    constructor(props) {
        super(props);

        this.initBehaviours = this.initBehaviours.bind(this);
        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragStoppedHandler = this.dragStoppedHandler.bind(this);
        this.state = {
            owner: this.props.owner,
            deckCssName:this.getDeckCssName(),
            deckBehaviour: {
                droppable: this.props.droppable
            },
            cardsBehaviour: this.mapCardBehaviourByOwner(this.props),
            actions:this.mapActionsByOwner(this.props),
            deckCards:[],
            cardsRotationDegree:this.setRotationDegrees()
        }



    }

    getDeckCssName() {
        let res;
        switch (this.props.owner) {
            case 'playerActive':
            case 'playerNonActive':
                res = 'cardsRowPlayer';
                break;
            case 'algo':
                res = 'cardsRowAlgo';
                break;
            case 'pot':
                res = 'pot';
                break;
            case 'gameDeck':
                res = 'gameDeck';
                break;
        }
        return res;
    }

    mapCardBehaviourByOwner(props){

        let defaultBehaviour = {
            clickable: false,
            backgroundShown: false,
            hoverable: false,
            draggable: false,
            rotateable:false,
            styleClasses: {
                cardWrapper: ['cardWrapper'],
                cardBase: ['cardBase']
            },
            spreadable:false,
            initBehaviours:this.initBehaviours
        }
        let newBehaviour = {
            clickable: false,
            backgroundShown: false,
            hoverable: false,
            draggable: false,
            rotateable : false,
            styleClasses: {
                cardWrapper: ['cardWrapper'],
                cardBase: ['cardBase']
            }
        }
        switch (props.owner) {
            case 'playerActive':
                newBehaviour.backgroundShown = true;
                newBehaviour.hoverable = true
                newBehaviour.draggable = true;
                newBehaviour.spreadable = true;
                newBehaviour.styleClasses.cardWrapper=[...newBehaviour.styleClasses.cardWrapper,'cardInsideCardRow']

                break;
            case 'playerNonActive':
                newBehaviour.backgroundShown = true;
                newBehaviour.spreadable = true;
                newBehaviour.styleClasses.cardWrapper=[...newBehaviour.styleClasses.cardWrapper,'cardInsideCardRow']

                break;
            case 'pot':
                newBehaviour.backgroundShown = true;
                newBehaviour.rotateable = true;
                newBehaviour.styleClasses.cardWrapper= [...newBehaviour.styleClasses.cardWrapper,'cardInsidePot']
                break;
            case 'gameDeck':
                newBehaviour.styleClasses.cardWrapper= [...newBehaviour.styleClasses.cardWrapper,'cardInsideGameDeck']
                break;
            case 'algo':
                newBehaviour.backgroundShown = false;
                newBehaviour.hoverable = false;
                newBehaviour.draggable = false;
                newBehaviour.spreadable = true;
                newBehaviour.styleClasses.cardWrapper= [...newBehaviour.styleClasses.cardWrapper,'cardInsideCardRow']
                break;
            default:
                throw new Error('no such owner !');

        }

        if (props.replayMode===true){
            newBehaviour.clickable= false;
            newBehaviour.hoverable=false;
            newBehaviour.draggable = false;
        }


        return Object.assign(defaultBehaviour, newBehaviour);

    }

    mapActionsByOwner(props){
        let defaultsActions = {

        }

        let newActions = {

        }

        switch(props.owner){

            case 'playerActive':
                newActions.dragStartHandler = this.dragStartHandler;
                newActions.dragStoppedHandler = this.dragStoppedHandler;
                newActions.hoverStartHandler = this.hoverStartHandler;
                newActions.hoverStoppedHandler = this.hoverStoppedHandler;
                break;
            case 'gameDeck':
                newActions.clickHandler = this.clickHandler;
                break;
            default:
                break;
        }

        if (props.replayMode===true){
            newActions.dragStartHandler =null;
            newActions.dragStoppedHandler = null;
            newActions.hoverStartHandler = null;
            newActions.hoverStoppedHandler = null;
            newActions.clickHandler = null;
        }
        return Object.assign({},defaultsActions,newActions)


    }

    initBehaviours(cardRef,props) {
        console.log('**************init card behaviour*************');
        let {owner} = this.state;
        let delayTime = (owner === 'gameDeck' || owner ===  'pot' ) ? 0 : 200
        let deck=this;

        setTimeout(() =>{
            let beforeSpeardStyleBehaviour = cardRef.state.behaviour;
            let newBehaviours = [];

            (props.topCard && props.behaviour.clickable && !props.replayMode) ? newBehaviours.push('topCardInGameDeck') : null;
            (beforeSpeardStyleBehaviour.spreadable) ?  newBehaviours.push('cardInsideCardRowAfterSpread') : null;
            (beforeSpeardStyleBehaviour.hoverable  && !props.replayMode) ? newBehaviours.push('cardPlayer') : null;
            let afterSpreadStyleBehaviour = Object.assign(beforeSpeardStyleBehaviour , {
                styleClasses:{
                    cardWrapper: [...deck.state.cardsBehaviour.styleClasses.cardWrapper,...newBehaviours],
                    cardBase: ['cardBase']
                }
            })

            cardRef.setState({
                behaviour: afterSpreadStyleBehaviour,
            })
        }, delayTime)


    }

    dragStartHandler(e){
        onDragStart(e);''
    }
    clickHandler(e){
        handlePulledTopCardClick(e)
    }

    dragStoppedHandler(e){
        onDragEnd(e);
    }

    hoverStartHandler(e){
        onCardHoverStart(e);
    }

    hoverStoppedHandler(e){
        onCardHoverEnd(e);
    }

    rotateCard(degree){
        return  Object.assign({},{
            position: "absolute",
            left: "10%",
            bottom: "10%",
            transform: `rotate(${degree}deg)`
        })
    }
    setRotationDegrees(){
        let degrees = []
        for(let i =0; i < 100; i++) {
            degrees.push(Math.floor(Math.random() * 150));
        }
        return degrees
    }


    setCardBackground(rank,color){
        return Object.assign({},{
            backgroundImage: this.state.cardsBehaviour.backgroundShown
                ? `url(./img/${rank}_${color}.png)`
                : `url(./img/card_back.png)`
        })

    }

    needsToSetState(props){
        if(props.replayMode === false
            && this.state.cardsBehaviour.clickable === false
            && this.state.cardsBehaviour.hoverable === false
            && this.state.cardsBehaviour.draggable === false)
        {
            this.setState({cardsBehaviour: this.mapCardBehaviourByOwner(props),actions:this.mapActionsByOwner(props)})
        }
        if(props.replayMode === true
            && (this.state.cardsBehaviour.clickable === true
                ||this.state.cardsBehaviour.hoverable === true
                || this.state.cardsBehaviour.draggable === true))
        {
            this.setState({cardsBehaviour: this.mapCardBehaviourByOwner(props),actions:this.mapActionsByOwner(props)})
        }


    }

    componentWillReceiveProps(props){
        this.needsToSetState(props);
    }


    render(){

        let  numOfChildrenCards  = this.props.cards.length-1
        return(
            <div className={this.state.deckCssName} style={{zIndex: this.props.containerZIndex}}>
                {

                    this.props.cards
                        ?
                        this.props.cards.map((card,index)=>{
                            this.state.deckCards.push(card.id);
                            return(
                                <Card id={card.id}  key={card.id} rank={card._rank} color={card._color}  behaviour={Object.assign({},this.state.cardsBehaviour)}
                                      style={ this.state.cardsBehaviour.rotateable
                                          ? Object.assign({},this.rotateCard(this.state.cardsRotationDegree[index]),this.setCardBackground(card._rank,card._color))
                                          : Object.assign({},this.setCardBackground(card._rank,card._color))}
                                      topCard={this.state.owner==='gameDeck' && index === numOfChildrenCards && !this.props.replayMode}
                                      actions={ Object.assign({},this.state.actions)} replayMode={this.props.replayMode}/>
                            )
                        })
                        :
                        <div/>
                }
            </div>
        )

    }

}
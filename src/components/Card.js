import React from 'react';
import {Component} from 'react'
import './css/card.css'
import {onTopGameDeckCardHover,onCardHoverEnd} from './js/Controllers/controller'
export default class Card extends Component{
    constructor(props){
        super(props)

        this.state={
            behaviour:this.props.behaviour,
            actions: this.props.actions
        }
    }


    translateClasses(classesArray,cardScope){
        let translate=(classesArray,cardScope) =>{
            let classes = '';
            classesArray[`${cardScope}`].forEach(styleClass => {
                classes = `${classes} ${styleClass}`;
            })

            return classes;
        }
        return translate(classesArray,cardScope);
    }


    componentWillMount(){
        this.state.behaviour.initBehaviours(this,this.props)
    }

    componentWillReceiveProps(props){
        this.state.behaviour.initBehaviours(this,props)
        return true;

    }

    extractMouseOver(){
        if (this.props.behaviour.hoverable){
            return this.props.actions.hoverStartHandler
        }
        else if (this.props.topCard){
            return onTopGameDeckCardHover;
        }
        return null
    }

    extractMouseleave(){
        if (this.props.behaviour.hoverable){
            return this.props.actions.hoverStoppedHandler
        }
        else if (this.props.topCard){
            return onCardHoverEnd;
        }
        return null
    }



    render(){
        return(
            <span  id={this.props.id} style = {this.props.style} className={`${this.translateClasses(this.state.behaviour.styleClasses,'cardWrapper')} ${this.props.topCard ? 'topCardInGameDeck'  : ''}`}
                   onDragStart={this.props.behaviour.draggable ? this.props.actions.dragStartHandler : null}
                   draggable={this.props.behaviour.draggable}
                   onDragEnd={this.props.behaviour.draggable ? this.props.actions.dragStoppedHandler : null}
                   onMouseOver={this.extractMouseOver()}
                   onMouseLeave={this.extractMouseleave()}
                   rank={this.props.rank} color={this.props.color} onClick={this.props.topCard? this.props.actions.clickHandler : null}

            >

                            <span  className={this.translateClasses(this.state.behaviour.styleClasses,'cardBase')}
                                   draggable={this.props.behaviour.draggable }  onDragStart={this.props.behaviour.draggable ? this.props.actions.dragStartHandler : null}
                                   onDragEnd={this.props.actions.dragStoppedHandler}>
                        </span>
                    </span>
        )

    }
}
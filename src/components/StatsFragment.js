import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react'

export default  class StatsFragment extends Component{
    render(){
        return(
            <div>
                <div className={this.props.style}>{this.props.title}
                    <div>{this.props.val}</div>
                </div>
            </div>
        )
    }

}

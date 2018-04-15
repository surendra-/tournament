import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getResults} from '../actions';

export class Summary extends Component{
	constructor(props) {
    	super(props);
    	this.state={

		  }
	}

  componentDidMount(){
    getResults(this.props.dispatch)
  }


    render(){
    return (
    	<div>
        {
          this.state.results?
          <div>Results</div>
          :null
        }
      </div>
    )}
}

const stateToProps = (state) => {
  return {}
}

export default connect(stateToProps)(Summary)
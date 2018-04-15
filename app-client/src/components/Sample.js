import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Sample extends Component{
	constructor(props) {
    	super(props);
    	this.state={

		  }
	}


    render(){
    return (
    	<div>
      </div>
    )}
}

const stateToProps = (state) => {
  return {}
}

export default connect(stateToProps)(Sample)
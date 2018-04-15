import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock,Button} from 'react-bootstrap'
import {createTeamRequest} from '../actions';

export class Home extends Component{
	constructor(props) {
    	super(props);
    	this.state={
        value:2,
        error:''
		  }
	}

  handleChange(e){
    var reg = /^\d+$/;
    if(reg.test(e.target.value)||e.target.value==""){
        this.setState({
           error:'',
           value:e.target.value
        })
    }else{
      this.setState({error:'Only numeric values are allowed'});
    }
  }

  handleTeamCreation(){
    if(this.state.value&&this.state.value!=''){
        createTeamRequest(this.state.value, this.props.dispatch)
    }
    else this.setState({error:'Team no. can not be empty'})
  }

  render(){
  return (
  	<div>
      <Grid>
        <Row>
          <Col mdOffset={3} md={6} style={{marginTop:100}}>
            <form>
              <FormGroup>
                <ControlLabel>Enter no. of teams</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Enter text"
                  onChange={(e)=>this.handleChange(e)}
                />
                <HelpBlock>{this.state.error}</HelpBlock>
              </FormGroup>
              <Button bsStyle="primary" onClick={()=>this.handleTeamCreation()}>Create Teams</Button>
            </form>
          </Col>
        </Row>
      </Grid>
    </div>
  )}
}

const stateToProps = (state) => {
  const {tournament} = state
  return {
    tournament
  }
}

export default connect(stateToProps)(Home)
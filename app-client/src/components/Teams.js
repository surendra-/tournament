import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock,Button} from 'react-bootstrap'
import {getTeamsRequest, createTournamentRequest} from '../actions';

export class Teams extends Component{
	constructor(props) {
    	super(props);
    	this.state={
         teams:[],
         maxMatch:'',
         error:''
		  }
	}

  componentDidMount(){
    getTeamsRequest(this.props.dispatch);
  }

  handleSimulation(){
    createTournamentRequest(this.state.maxMatch, this.props.dispatch);
  }

  handleChange(e){
    var reg = /^\d+$/;
    if(reg.test(e.target.value)||e.target.value==""){
        this.setState({
           error:'',
           maxMatch:e.target.value
        })
    }else{
      this.setState({error:'Only numeric values are allowed'});
    }
  }

  componentWillReceiveProps(nextProps){
    const { tournament } = nextProps
    if(tournament){
        if(tournament.teams||tournament.teams.length>0){
            this.setState({
              teams: tournament.teams
            })
        }
        else{
          this.setState({
            error: tournament.message
          })
        }
    }
  }

  render(){
    return (
    	<div>
      <Grid>
        <Row>
          <Col mdOffset={3} md={6} style={{marginTop:100}}>
          <h4>Teams</h4>
          {
            this.state.teams && this.state.teams.length>0?
            this.state.teams.map((team, index)=>(
              <div key={index} style={{height:40,border:'1px solid #000',margin:5,padding:5, display:'inline-block'}}>
                <p>{team}</p>
              </div>
            ))  
            :<div>Loading...</div>
          }
          <br /><br />
          <form>
              <FormGroup>
                <ControlLabel>Enter max no. of matches each team can play</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.maxMatch}
                  placeholder="Enter text"
                  onChange={(e)=>this.handleChange(e)}
                />
                <HelpBlock>{this.state.error}</HelpBlock>
              </FormGroup>
              <Button bsStyle="primary" onClick={()=>this.handleSimulation()}>Simulate Tournament</Button>
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

export default connect(stateToProps)(Teams)
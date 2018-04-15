import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getTournament, updateTournament} from '../actions';
import {Grid, Row, Col} from 'react-bootstrap'

export class Simulation extends Component{
	constructor(props) {
    	super(props);
    	this.state={
        currentMatch:[],
        tempWinner:[],
        index:1
		  }
      this.handleSimulation = this.handleSimulation.bind(this);
      this.handleUpdateTournament = this.handleUpdateTournament.bind(this)
      console.log('CONS', this.props);
	}

  componentDidMount(){
    getTournament(this.props.dispatch);
  }

  componentWillReceiveProps(nextProps){
    const {tournament} = nextProps
      if(tournament){
        let state = this.state;
        if(tournament.data){
          this.setState({
             matches:state.matches?state.matches:tournament.data.matches,
             teams: tournament.data.teams,
             name: tournament.data.name,
             _id: tournament.data._id,
             tournamentWinner:state.tournamentWinner?state.tournamentWinner:tournament.data.tournamentWinner,
             maxMatch: tournament.data.maxMatch,
             tempTeams: (state.tempTeams&&state.tempTeams.length>0)?state.tempTeams:tournament.data.teams
          })
          if(!state.tempTeams||state.tempTeams.length>1||state.tempWinner.length>1){
            setTimeout(this.handleSimulation,3000);
          }else{
            console.log(state.tempWinner)
          }
        }else{
          this.setState({
            error: tournament.message
          })
        }
      }
  }

  handleSimulation(){
    let state = this.state;
    if(this.state.currentMatch.length>0){
      if(this.state.currentMatch[0]==this.state.currentMatch[1]){
        this.setState({
          tournamentWinner: state.currentMatch[0]
        })
      }
      else{
        let w=0,l=1;
        if((Math.floor(Math.random() * 2) + 0)>0) {w = 1; l=0}
        state.matches.push({
          winner:state.currentMatch[w],
          loser: state.currentMatch[l]
        })
        state.tempWinner.push(state.currentMatch[w]);
        state.currentMatch = [];
        if((state.index+2)<state.tempTeams.length){
            state.currentMatch.push(state.tempTeams[(state.index+1)])
            state.currentMatch.push(state.tempTeams[(state.index+2)]);
            state.index = state.index+2;
        }
        else if((state.index+2)===state.tempTeams.length){
            state.currentMatch.push(state.tempTeams[(state.index+1)])
            state.currentMatch.push(state.tempWinner[0]);
            state.tempTeams = state.tempWinner;
            state.tempWinner = []
            state.index = 1
        }else{
            state.index = 0
            state.tempTeams = state.tempWinner;
            state.tempWinner = []
        }

        this.setState(state)
      }
    }else{
      let currentMatch = []
      currentMatch.push(state.tempTeams[0])
      currentMatch.push(state.tempTeams[1])
      this.setState({
        currentMatch:currentMatch
      })
    }
    setTimeout(this.handleUpdateTournament, 2000);
  }

  handleUpdateTournament(){
    console.log('tournament updated');
    console.log(this.props);
    updateTournament(this.state, this.props.dispatch)
  }

  render(){
    return (
    	<div>
        <Grid>
          <Row>
            <Col mdOffset={3} md={6} style={{marginTop:100}}>
              <h3>Teams</h3>
              {
                  this.state.teams && this.state.teams.length>0?
                  this.state.teams.map((team, index)=>(
                    <div key={index} style={{height:40,border:'1px solid #000',margin:5,padding:5, display:'inline-block'}}>
                      <p>{team}</p>
                    </div>
                  ))  
                  :<div>Loading...</div>
                }

              <h4>Current Match</h4>
              {
                this.state.currentMatch.length>0?
                this.state.currentMatch.map((team,index)=>(
                  <div key={index} style={{height:40,border:'1px solid #000',margin:5,padding:5, display:'inline-block'}}>
                      <p>{team}</p>
                    </div>
                ))
                :<p>Break Time</p>
              }
              <h4>Selected Teams</h4>
              {
                this.state.tempWinner.length>0&&(this.state.tempWinner[0]!==this.state.tempWinner[1])?
                this.state.tempWinner.map((team,index)=>(
                  <div key={index} style={{height:40,border:'1px solid #000',margin:5,padding:5, display:'inline-block'}}>
                      <p>{team}</p>
                    </div>
                ))
                :<p>Results will be displayed soon.</p>
              }

              <br />
              {
                this.state.tournamentWinner&&this.state.tournamentWinner!=''?
                <div>
                  <h4>Winner</h4>
                    <div style={{height:40,border:'1px solid #000',margin:5,padding:5, display:'inline-block'}}>
                      <p>{this.state.tempWinner[0]}</p>
                    </div>
                </div>
                :null
              }
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

export default connect(stateToProps)(Simulation)
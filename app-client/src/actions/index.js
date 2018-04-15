export const createTeamRequest = (totalTeams, dispatch) => {

      let config ={
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({totalTeams:totalTeams})
     } 

    console.log('REQUEST', `http://localhost:8080/api/v1/create-teams`, config)

    return fetch('http://localhost:8080/api/v1/create-teams', config)
      .then(response => response.json().then(payload => ({payload, response})))
      .then(({payload, response}) => {
        if(!response.ok) {
          return Promise.reject(payload)
        } else {
          if(payload) {
              if(payload.status){
                  window.location.href="/teams";
                //dispatch({type:'CREATE_TEAM_SUCCESS', teams:['A','B','C','D']});
              }
              else dispatch({type:'CREATE_TEAM_ERROR', message:payload.message});
          } else {
            dispatch({type:'CREATE_TEAM_ERROR', message:'Server Error'})
          }
        }
      }).catch(err => {
        console.log(err)
      })
  
}

export const getTeamsRequest = (dispatch) => {

      let config ={
        method: 'GET'
     } 
    return fetch('http://localhost:8080/api/v1/get-teams', config)
      .then(response => response.json().then(payload => ({payload, response})))
      .then(({payload, response}) => {
        if(!response.ok) {
          return Promise.reject(payload)
        } else {
          if(payload) {
              if(payload.status){
                dispatch({type:'TEAM_REQUEST_SUCCESS', teams:payload.data});
              }
              else dispatch({type:'TEAM_REQUEST_ERROR', message:payload.message});
          } else {
            dispatch({type:'TEAM_REQUEST_ERROR', message:'Server Error'})
          }
        }
      }).catch(err => {
        console.log(err)
      })
}

export const createTournamentRequest = (maxMatch,dispatch) => {

    let config ={
        method: 'PUT',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({maxMatch:maxMatch})
     } 

    return fetch('http://localhost:8080/api/v1/update-max-match', config)
      .then(response => response.json().then(payload => ({payload, response})))
      .then(({payload, response}) => {
        if(!response.ok) {
          return Promise.reject(payload)
        } else {
          if(payload) {
              if(payload.status){
                  window.location.href='/tournament-simulation';
              }
              else dispatch({type:'TOURNAMENT_REQUEST_ERROR', message:payload.message});
          } else {
            dispatch({type:'TOURNAMENT_REQUEST_ERROR', message:'Server Error'})
          }
        }
      }).catch(err => {
        console.log(err)
      })
  
}


/**************************** TOURNAMENT SIMULATION *********************/

export const getTournament = (dispatch) => {

      let config ={
        method: 'GET'
     } 
    return fetch('http://localhost:8080/api/v1/tournament', config)
      .then(response => response.json().then(payload => ({payload, response})))
      .then(({payload, response}) => {
        if(!response.ok) {
          return Promise.reject(payload)
        } else {
          if(payload) {
              if(payload.status){
                dispatch({type:'GET_TOURNAMENT_SUCCESS', tournament:payload.data});
              }
              else dispatch({type:'GET_TOURNAMENT_ERROR', message:payload.message});
          } else {
            dispatch({type:'GET_TOURNAMENT_ERROR', message:'Server Error'})
          }
        }
      }).catch(err => {
        console.log(err)
      })
}

export const updateTournament = (tournament, dispatch) => {

      let config ={
        method: 'PUT',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(tournament)
     } 

    return fetch('http://localhost:8080/api/v1/tournament', config)
      .then(response => response.json().then(payload => ({payload, response})))
      .then(({payload, response}) => {
        if(!response.ok) {
          return Promise.reject(payload)
        } else {
          if(payload) {
              if(payload.status){
                dispatch({type:'UPDATE_TOURNAMENT_SUCCESS', tournament: payload.data});
              }
              else dispatch({type:'UPDATE_TOURNAMENT_ERROR', message:payload.message});
          } else {
            dispatch({type:'UPDATE_TOURNAMENT_ERROR', message:'Server Error'})
          }
        }
      }).catch(err => {
        console.log(err)
      })
  
}

export const getResults = (dispatch) => {

      let config ={
        method: 'GET'
     } 
    return fetch('http://localhost:8080/api/v1/results', config)
      .then(response => response.json().then(payload => ({payload, response})))
      .then(({payload, response}) => {
        if(!response.ok) {
          return Promise.reject(payload)
        } else {
          if(payload) {
              if(payload.status){
                dispatch({type:'RESULT_SUCCESS', tournament:payload.data});
              }
              else dispatch({type:'RESULT_ERROR', message:payload.message});
          } else {
            dispatch({type:'RESULT_ERROR', message:'Server Error'})
          }
        }
      }).catch(err => {
        console.log(err)
      })
}

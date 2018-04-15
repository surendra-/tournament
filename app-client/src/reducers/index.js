import { combineReducers } from 'redux'

function tournament (state={}, action){
  switch (action.type) {
    case 'TEAM_REQUEST_SUCCESS': 
      return Object.assign({}, state, {
         teams: action.teams
      })
    case 'TEAM_REQUEST_ERROR': 
      return Object.assign({}, state, {
         message: action.message
      })
    case 'GET_TOURNAMENT_SUCCESS': 
      return Object.assign({}, state, {
         data: action.tournament
      })
    case 'GET_TOURNAMENT_ERROR': 
      return Object.assign({}, state, {
         message: action.message
      })
    case 'UPDATE_TOURNAMENT_SUCCESS': 
      return Object.assign({}, state, {
         data: action.tournament
      })
    case 'UPDATE_TOURNAMENT_ERROR': 
      return Object.assign({}, state, {
         message: action.message
      })
    case 'RESULT_SUCCESS': 
      return Object.assign({}, state, {
         data: action.tournament
      })
    case 'RESULT_ERROR': 
      return Object.assign({}, state, {
         message: action.message
      })
    default: 
      return state
   }
}


const rootReducer = combineReducers({
  tournament
})

export default rootReducer
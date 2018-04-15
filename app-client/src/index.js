import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import Home from './components/Home'
import Teams from './components/Teams'
import Simulation from './components/Simulation'
import Summary from './components/Summary'


const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

let store = createStore(
	rootReducer,
	applyMiddleware(thunk, logger)
)

ReactDOM.render(
  <Provider store={store}>
  	<Router history={browserHistory}>
  		<Route path="/" component={Home} />
      <Route path="/teams" component={Teams} />
      <Route path="/tournament-simulation" component={Simulation} />
      <Route path="/summary" component={Summary} />
	</Router>
</Provider>,
  document.getElementById('root')
);
import React, {Component} from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main';

import reduxApi from './configs/rest'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk'

import { Provider } from 'react-redux';
import navigation from './reducers/actionReducer'
import * as mapActions from './actions/mapActions'
import cookie from 'react-cookie';
import {updateLocation} from './configs/utils'

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const reducer = combineReducers({
  navigation,
  ...reduxApi.reducers
});
const store = createStoreWithMiddleware(reducer);

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props)
    this.location = {}
    this.updateCurrentLocation = this.updateCurrentLocation.bind(this)
    this.dispatchLocation = this.dispatchLocation.bind(this )

    this.updateCurrentLocation()
    setInterval(this.updateCurrentLocation, 10000)
  }

  updateCurrentLocation() {
    if (!navigator.geolocation) {
      store.dispatch(mapActions.locationStatus(false))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let prevLocation = this.location
        this.location = {lat: position.coords.latitude, lon: position.coords.longitude}

        // Update list as soon as we have first location
        if (!prevLocation.lat && cookie.load('user_id')) {
          console.log('updating with location')
          store.dispatch(mapActions.locationStatus(true))
          setTimeout(this.dispatchLocation, 0)
        }
      },
      () => {
        if (!this.location.lat) {
          store.dispatch(mapActions.locationStatus(false))
        }
        console.log('failed fetching location');
      },
      {
        timeout: 10000
      }
    );
  }

  dispatchLocation() {
    updateLocation(store.dispatch, cookie.load('user_id'), this.location)
  }

  componentDidMount() {
    if (cookie.load('user_id'))
      setTimeout((() => { store.dispatch(reduxApi.actions.user({id: cookie.load('user_id')}))}), 0)

    setTimeout(this.dispatchLocation, 0)
    setInterval(this.dispatchLocation, 30000)
  }

  render() {
    return <Main />;
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

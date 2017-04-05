import * as ActionTypes from '../configs/actions';

function clickPin(locationIndex) {
  return {
    locationIndex: locationIndex,
    type: ActionTypes.LOCATION_CLICK
  }
}

function locationStatus(status) {
  return {
    locationAvailable: status,
    type: ActionTypes.LOCATION_STATUS
  }
}

export { clickPin, locationStatus };

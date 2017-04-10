import * as ActionTypes from '../configs/actions';

function clickPin(locationIndex) {
  return {
    locationIndex: locationIndex,
    type: ActionTypes.LOCATION_CLICK
  }
}

export { clickPin };

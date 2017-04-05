import * as ActionTypes from '../configs/actions';

function clickLocation(locationIndex) {
  return {
    locationIndex: locationIndex,
    type: ActionTypes.LOCATION_CLICK
  };
}

export { clickLocation };

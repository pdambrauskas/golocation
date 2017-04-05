import * as ActionTypes from '../configs/actions';

function clickViewButton(viewIndex) {
  return {
    viewIndex: viewIndex,
    type: ActionTypes.NAVIGATION_CLICK
  };
}

export { clickViewButton };

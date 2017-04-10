import * as Actions from '../configs/actions'

export default function actionReducer(state={}, action) {
  switch(action.type) {
    case(Actions.NAVIGATION_CLICK):
      let activeView =  action.viewIndex;
      if (action.viewIndex == state.activeView) activeView = null;

      return {
        ...state,
        activeView: activeView
      };

    case Actions.LOCATION_CLICK:
      return {
        ...state,
        activeLocation: action.locationIndex
      };

    case Actions.CLOSE_DETAILS:
      return {
        ...state,
        activeLocation: null
      }

    case Actions.ONBOARD:
      return {
        ...state,
        onboarded: true
      }

    default:
      return state;
  }
}

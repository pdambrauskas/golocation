import * as ActionTypes from '../configs/actions';
import reduxApi from '../configs/rest'

function doCheckin(userId, locationId, answer) {
  return reduxApi.actions.checkin({}, { body: 'user_id='+userId+'&location_id='+locationId+'&answer='+answer })
}

function resetCheckinState() {
  return reduxApi.actions.checkin.reset()
}

export { doCheckin, resetCheckinState };

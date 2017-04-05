import * as ActionTypes from '../configs/actions';
import reduxApi from '../configs/rest'

function register(userName) {
  return reduxApi.actions.users({}, {body: 'name='+userName})
}

function login(userId) {
  return reduxApi.actions.user.sync({id: id})
}

function acknowledge() {
  return {
    type: ActionTypes.ONBOARD
  }
}

export { register, login, acknowledge };

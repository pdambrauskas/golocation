import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import cookie from 'react-cookie';
import {clickLocation} from '../actions/locationList'
import {updateLocation} from '../configs/utils'

export default reduxApi({
  locations: {
    url: "https://pavasaris.info/api/locations.php",
    transformer: transformers.array,
    headers: {
        'Accept': 'application/json'
    }
  },
  users: {
    reducerName: 'user',
    url: "https://pavasaris.info/api/users.php",
    postfetch: [
      function ({data}) {
        if (!cookie.load('user_id'))
          cookie.save('user_id', data.id, { maxAge: 172800 })
      }
    ],
    options: {
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  },
  user: {
    url: "https://pavasaris.info/api/users.php"
  },
  checkin: {
    url: "https://pavasaris.info/api/checkin.php",
    postfetch: [
      function({ dispatch, actions, data}) {
        if (data.correct) {
          setTimeout(()=> { updateLocation(dispatch, cookie.load('user_id')) }, 0)
        }
      },
      function({dispatch}) {
        setTimeout(() => { dispatch(clickLocation(null)) }, 0)
      }
    ],
    options: {
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  }
}).use("fetch", adapterFetch(fetch));

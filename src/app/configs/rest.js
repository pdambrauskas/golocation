import "isomorphic-fetch";
import reduxApi, {transformers} from "redux-api";
import adapterFetch from "redux-api/lib/adapters/fetch";
import cookie from 'react-cookie';
import {clickLocation} from '../actions/locationList'
import {updateLocation} from '../configs/utils'

export default reduxApi({
  locations: {
    url: "https://pasikark.eu/ruta/locations.php",
    transformer: transformers.array,
    headers: {
        'Accept': 'application/json'
    }
  },
  users: {
    reducerName: 'user',
    url: "https://pasikark.eu/ruta/users.php",
    postfetch: [
      function ({data}) {
        if (!cookie.load('user_id'))
          cookie.save('user_id', data.id)
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
    url: "https://pasikark.eu/ruta/users.php"
  },
  checkin: {
    url: "https://pasikark.eu/ruta/checkin.php",
    postfetch: [
      function({ dispatch, actions, data}) {
        if (data.correct) {
          console.log('update checks');
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

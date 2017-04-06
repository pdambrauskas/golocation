import { connect } from 'react-redux'
import CheckinDialog from '../components/CheckinDialog'
import * as checkinActions from '../actions/checkinActions';

function mapStateToProps(state) {
  return {
    location: state.locations.data.filter((loc) => loc.id == state.navigation.activeLocation)[0],
    user: state.user.data,
    checkin: state.checkin.data,
    error: state.checkin.error
  }
}

const CheckinContainer = connect(
  mapStateToProps,
  checkinActions
)(CheckinDialog)

export default CheckinContainer

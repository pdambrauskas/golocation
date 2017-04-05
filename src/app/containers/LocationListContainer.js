import { connect } from 'react-redux'
import LocationList from '../components/LocationList'
import * as locationListActions from '../actions/locationList';

function mapStateToProps(state) {
  return {
    locations: state.locations.data
  }
}

const LocationListContainer = connect(
  mapStateToProps,
  locationListActions
)(LocationList)

export default LocationListContainer

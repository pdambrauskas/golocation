import { connect } from 'react-redux'
import LocationDetails from '../components/LocationDetails'
import * as locationDetailsActions from '../actions/locationDetails';

function mapStateToProps(state) {
  return {
    location: state.locations.data[state.navigation.activeLocation]
  }
}

const LocationDetailsContainer = connect(
  mapStateToProps,
  locationDetailsActions
)(LocationDetails)

export default LocationDetailsContainer

import { connect } from 'react-redux'
import LocationDetails from '../components/LocationDetails'
import * as locationDetailsActions from '../actions/locationDetails';

function mapStateToProps(state) {
  return {
    location: state.locations.data.filter((loc) => loc.id == state.navigation.activeLocation)[0]
  }
}

const LocationDetailsContainer = connect(
  mapStateToProps,
  locationDetailsActions
)(LocationDetails)

export default LocationDetailsContainer

import { connect } from 'react-redux'
import GMap from '../components/GMap'
import * as mapActions from '../actions/mapActions';

function mapStateToProps(state) {
  return {
    locations: state.locations.data,
    loading: state.locations.loading,
  }
}

const MapContainer = connect(
  mapStateToProps,
  mapActions
)(GMap)

export default MapContainer

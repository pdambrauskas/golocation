import React, { Component } from 'react'
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps'

const SimpleMap = withGoogleMap(props => (
  <GoogleMap defaultZoom={13}
    defaultCenter={props.center}>
    { props.locations.map((location, index) => (
      <Marker
        key={index}
        position={{lng: location.lon, lat: location.lat}}
        title={location.name}
        onClick={() => props.onPinClick(index)}
      />
    ))}
  </GoogleMap>
));

class GMap extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.locations.length != this.props.locations.length
  }

  render() {
    let {locations, clickPin} = this.props
    let center = { lat: 54.600312, lng: 24.034102 }
    // TODO : center to user location
    return (
      <SimpleMap
         containerElement={<div className="map__container" />}
         mapElement={<div className="map__element" />}
         locations={locations}
         onPinClick={clickPin}
         center={center}
      />
    );
  }
}

export default GMap;

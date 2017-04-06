import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionDone from 'material-ui/svg-icons/action/done';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

class LocationList extends Component {
  locationIcon(location) {
    switch(location.type) {
      case 'cake':
        return <img src={'imgs/cake.png'} className={'typeicon'}/>
      case 'horses':
        return <img src={'imgs/horse.png'} className={'typeicon'}/>
      default:
        return <IconLocationOn />
    }
  }
  render() {
    let {locations, clickLocation} = this.props

    return (
      <List>
        <Subheader inset={true}>Vietelės</Subheader>
        { locations.map((location, index) => (
          <ListItem
            key={index}
            onTouchTap={ (e) => {e.preventDefault(); clickLocation(location.id) }}
            leftAvatar={this.locationIcon(location)}
            rightIcon={location.visited ? <ActionDone /> : null}
            primaryText={location.name}
            secondaryText={location.distance ? location.distance.toFixed(2) + ' km': '' }
          />
        ))}
      </List>
    );
  }
}

export default LocationList;

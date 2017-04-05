import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionDone from 'material-ui/svg-icons/action/done';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const locationsIcon = <IconLocationOn />;

class LocationList extends Component {
  render() {
    let {locations, clickLocation} = this.props

    return (
      <List>
        <Subheader inset={true}>Vietelės</Subheader>
        { locations.map((location, index) => (
          <ListItem
            key={index}
            onTouchTap={ () => clickLocation(index) }
            leftIcon={locationsIcon}
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

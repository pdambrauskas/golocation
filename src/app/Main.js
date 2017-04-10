import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as navigationActions from './actions/navigation';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import SocialPeople from 'material-ui/svg-icons/social/people';
import MapIcon from 'material-ui/svg-icons/maps/map'

import reduxApi from './configs/rest'

import Loader from './components/Loader'
import GMap from './containers/MapContainer'
import LocationList from './containers/LocationListContainer'
import LocationDetails from './containers/LocationDetailsContainer'
import UserDialog from './containers/UserDialogContainer'

const mapIcon = <MapIcon />;
const locationsIcon = <IconLocationOn />;

function select(state) {
  return {
    navigation: state.navigation,
    loading: state.user.loading || state.checkin.loading,
    knownLocation: state.locations.data.length >  0 && state.locations.data[0].distance
  }
}

class CMain extends Component {
  screenContent() {
    let {navigation} = this.props

    switch(navigation.activeView) {
      case 1:
        return <GMap />
      default:
        return <LocationList />
    }
  };

  render() {
    let {navigation, knownLocation, loading, clickViewButton} = this.props

    if (loading) {
      return(
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Loader open={true} />
        </MuiThemeProvider>
      )
    }
    let locationStatus = ''

    if (!knownLocation) {
      locationStatus = <div className={'error'}>
        Nepavyksta nustatyti lokacijos, pasitikrinkite nustatymus.
      </div>
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          {locationStatus}
          <UserDialog />
          <LocationDetails />
          <div className="container">
            {this.screenContent()}
          </div>
          <Paper zDepth={1} className="navigation">
            <BottomNavigation selectedIndex={navigation.activeView ? navigation.activeView : 0}>
              <BottomNavigationItem
                label="Sąrašas"
                icon={locationsIcon}
                onTouchTap={() => clickViewButton(0) }
              />
              <BottomNavigationItem
                label="Žemėlapis"
                icon={mapIcon}
                onTouchTap={() => clickViewButton(1) }
              />
            </BottomNavigation>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}
const Main = connect(select, navigationActions)(CMain);
export default Main;

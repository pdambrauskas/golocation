import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

class Loader extends Component {
  render() {
    let {location, closeDetails} = this.props

    return (
      <Dialog
          modal={false}
          open={this.props.open}>
          <CircularProgress size={30} thickness={4} /> Tu palauk, palauk..
        </Dialog>
    );
  }
}

export default Loader;

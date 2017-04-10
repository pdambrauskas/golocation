import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {saluteForName} from '../configs/utils'


class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.changeName = this.changeName.bind(this)
    this.state = {}
  }

  changeName(object, value) {
    this.setState({name: value})
  }

  proceed() {
    let { register, user, acknowledge } = this.props

    if (user.id) {
      acknowledge()
    } else if (this.state.name) {
      return register(this.state.name)
    }
  }

  render() {
    let { user, onboarded } = this.props

    if (onboarded) return null;

    const textField = <form onSubmit={() => this.proceed()}>
      <TextField
        hintText="Labas, kuo tu vardu?"
        fullWidth={true}
        onChange={this.changeName} />
    </form>
    const actions = [
      <FlatButton
        label="Pirmyn!"
        primary={true}
        onTouchTap={() => this.proceed()}
      />
    ];

    return (
      <div>
        <div className="hero hero--bottom"></div>
        <Dialog
          actions={actions}
          modal={false}
          open={true}
        >
          {user.name ? saluteForName(user.name) : textField }
        </Dialog>
      </div>
    );
  }
}

export default UserDialog;

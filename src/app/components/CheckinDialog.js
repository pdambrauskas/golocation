import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {saluteForName} from '../configs/utils'

class CheckinDialog extends Component {
  constructor(props) {
    super(props)
    this.changeAnswer = this.changeAnswer.bind(this)
    this.state = {}
  }

  changeAnswer(object, value) {
    this.setState({answer: value})
  }

  proceed() {
    let { doCheckin, location, user } = this.props
    doCheckin(user.id, location.id, this.state.answer)
  }

  hide() {
    let {resetCheckinState, closeQuestion} = this.props
    resetCheckinState()
    closeQuestion()
  }

  render() {
    let { location, error, checkin, open } = this.props
    if (!open && !error) return null;

    const textField = <form onSubmit={() => this.proceed()}>
      <TextField
        id="question"
        fullWidth={true}
        onChange={this.changeAnswer}
        errorText={error ? error.result : null }
      />
    </form>
    const actions = [
      <FlatButton
        label="Atšaukti"
        onTouchTap={() => this.hide()}
      />,
      <FlatButton
        label="Buvau!"
        primary={true}
        disabled={location.visited}
        onTouchTap={() => this.proceed()}
      />
    ];

    return (
      <div>
        <div className="hero hero--bottom"></div>
        <Dialog
          title="Vat įrodyk, kad buvai."
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={() => this.hide()}
        >
          <p>{location.question}</p>
          { textField }
        </Dialog>
      </div>
    );
  }
}

export default CheckinDialog;

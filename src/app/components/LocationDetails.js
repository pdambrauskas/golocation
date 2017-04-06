import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CheckinDialog from '../containers/CheckinContainer'
const styles = {
  dialogRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
  },
  dialogContent: {
    position: "relative",
    width: "90vw",
    transform: "",
  },
  dialogBody: {
    padding: 0
  }
};

class LocationDetails extends Component {

  constructor(props) {
    super(props)
    this.showQuestion = this.showQuestion.bind(this)
    this.closeQuestion = this.closeQuestion.bind(this)
    this.state = {}
  }

  showQuestion() {
    this.setState({questionVisible: true})
  }

  closeQuestion() {
    this.setState({questionVisible: false})
  }

  render() {
    let {location, closeDetails, questionVisible} = this.props
    if (!location) return null;

    const actions = [
      <a href={'https://www.google.com/maps/dir/Current+Location/'+location.lat+','+location.lon} target='_blank'>
        <FlatButton
          label="Navigacija"
        />
      </a>,
      <FlatButton
        label="Buvau!"
        primary={true}
        onTouchTap={this.showQuestion}
        disabled={location.visited}
      />
    ];

    return (
      <div>
        <Dialog
            title={location.name}
            actions={actions}
            open={true}
            onRequestClose={closeDetails}
            // contentStyle={{width: '95%'}}
            contentStyle={ styles.dialogContent }
            bodyStyle={ styles.dialogBody }
            style={ styles.dialogRoot }
            repositionOnUpdate={ false }
            // bodyClassName="location"
            autoScrollBodyContent={true}
            repositionOnUpdate={false}
          >

          <img
            src={location.picture}
            className="location__image"
            onLoad={ () => window.dispatchEvent(new Event('resize')) } />

            <div className="location__description">
              {location.description}
            </div>
          </Dialog>
          <CheckinDialog open={this.state.questionVisible} closeQuestion={this.closeQuestion}/>
        </div>
    );
  }
}

export default LocationDetails;

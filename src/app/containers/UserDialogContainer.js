import { connect } from 'react-redux'
import UserDialog from '../components/UserDialog'
import * as userActions from '../actions/userActions';

function mapStateToProps(state) {
  return {
    loading: state.user.loading,
    user: state.user.data,
    onboarded: state.navigation.onboarded
  }
}

const UserDialogContainer = connect(
  mapStateToProps,
  userActions
)(UserDialog)

export default UserDialogContainer

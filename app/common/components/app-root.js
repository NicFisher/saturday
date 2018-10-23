import * as fromAuth from '../../auth/reducers/auth.reducer';
import React, {Component} from 'react';
import {createRootNavigator} from "../../navigation/tab-navigator";
import {connect} from 'react-redux';

class AppRoot extends Component {
  render() {
    const Layout = createRootNavigator(this.props.authenticated);
    return <Layout/>
  }
}

const mapStateToProps = state => ({
  authenticated: fromAuth.getAuthenticated(state)
});

export default connect(mapStateToProps)(AppRoot);
import * as fromAuth from '../../auth/reducers/auth.reducer';
import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {createRootNavigator} from "../../navigation/common/tab-navigator";
import {connect} from 'react-redux';
import axios from "axios";

class AppRoot extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLayout: false
    }
  };

  componentDidMount() {
    axios.defaults.headers.common['Authentication'] = this.props.authenticationToken;
    this.setState({showLayout: true});
  }

  render() {
    // TODO - this is a quick fix
    const Layout = createRootNavigator(this.props.authenticated);
    if(this.state.showLayout) {
      return <Layout />
    }
    return <ActivityIndicator/>
  }
}

const mapStateToProps = state => ({
  authenticated: fromAuth.getAuthenticated(state),
  authenticationToken: fromAuth.getAuthenticationToken(state)
});

export default connect(mapStateToProps)(AppRoot);
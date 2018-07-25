import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    // AsyncStorage.removeItem('fb_token');
    this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete = props => {
    if (props.token) {
      this.props.navigation.navigate('Map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = state => ({
  token: state.AuthReducer
});

const mapDispatchToProps = dispatch => ({
  facebookLogin: () => dispatch(actions.facebookLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

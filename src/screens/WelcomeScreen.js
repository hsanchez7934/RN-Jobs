import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
  {
    text: 'Welcome to JobApp',
    color: '#03a9f4'
  },
  {
    text: 'Suck my balls',
    color: '#009688'
  },
  {
    text: 'Set your location, then swipe away!',
    color: '#03a9f4'
  }
];

export default class WelcomeScreen extends Component {
  state = {
    token: null
  }

  async componentDidMount() {
     // eslint-disable-next-line
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      this.props.navigation.navigate('Map');
      this.setState({
        token
      });
    } else {
      this.setState({
        token: false
      });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('Auth');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return (
        <AppLoading />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Slides
          data={SLIDE_DATA}
          onSlidesComplete={this.onSlidesComplete}
        />
      </View>
    );
  }
}

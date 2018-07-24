import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

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

  onSlidesComplete = () => {
    this.props.navigation.navigate('Auth');
  }

  render() {
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

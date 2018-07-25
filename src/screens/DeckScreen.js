import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
imoprt Swipe from '../components/Swipe';

class DeckScreen extends Component {
  render() {
    return (
      <View>
        <Swipe
          date={this.props.jobs}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  jobs: state.JobsReducer
});

export default(mapStateToProps)(DeckScreen);

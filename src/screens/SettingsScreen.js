import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import * as actions from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = () => ({
    title: 'Settings',
    headerTitleStyle: {
      marginRight: 'auto',
      marginLeft: 'auto'
    }
  })

  render() {
    return (
      <View>
        <Button
          title="Reset Liked Jobs"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#f44336"
          onPress={this.props.clearLikedJobs}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  clearLikedJobs: () => dispatch(actions.clearLikedJobs())
});

export default connect(null, mapDispatchToProps)(SettingsScreen);

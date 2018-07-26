import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => <Icon name="description" size={25} color={tintColor} />
  }

  renderCard = (job) => {
    const {
      jobtitle,
      formattedRelativeTime,
      company,
      snippet,
      longitude,
      latitude
    } = job;

    const initialRegion = {
      longitude,
      latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={jobtitle}>

        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>


        <View style={styles.detailWrapper}>
          <Text>{company}</Text>
          <Text>{formattedRelativeTime}</Text>
        </View>

        <Text>
          {snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
        </Text>

      </Card>
    );
  }

  renderNoMoreCards = () => (
      <Card title="No More Jobs">
        <Button
          title="Back To Map"
          large icon={{ name: 'my-location' }}
          backgroundColor="#03a9f4"
          onPress={() => this.props.navigation.navigate('Map')}
        />
      </Card>
  );

  render() {
    return (
      <View style={styles.deckContainer}>
          <Swipe
            keyProp="jobkey"
            data={this.props.jobs}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
            onSwipeRight={job => this.props.likeJob(job)}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  deckContainer: {
     marginTop: 10,
     backgroundColor: '#e5e6e8',
     flex: 1
  }
});

const mapStateToProps = state => ({
  jobs: state.JobsReducer
});

const mapDispatchToProps = dispatch => ({
  likeJob: (job) => dispatch(actions.likeJob(job))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);

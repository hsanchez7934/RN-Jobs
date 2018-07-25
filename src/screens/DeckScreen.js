import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import Swipe from '../components/Swipe';
import { MapView } from 'expo';
import * as actions from '../actions';

class DeckScreen extends Component {

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
            scrollEnable={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
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

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">

      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
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
  }
});

const mapStateToProps = state => ({
  jobs: state.JobsReducer
});

const mapDispatchToProps = dispatch => ({
  likeJob: (job) => dispatch(actions.likeJob(job))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);

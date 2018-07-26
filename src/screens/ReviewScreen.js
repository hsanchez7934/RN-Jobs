import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  ScrollView,
  StyleSheet,
  Linking
} from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Review Jobs',
    headerRight: (
      <Button
      title="Settings"
      onPress={() => navigation.navigate('Settings')}
      backgroundColor="rgba(0, 0, 0, 0)"
      color="rgba(0, 122, 255, 1)"
      />
    ),
    headerStyle: {
      marginTop: Platform.OS === 'android' ? 10 : 0
    },
    headerTitleStyle: {
      marginRight: 'auto',
      marginLeft: 'auto'
    }
  })

  renderLikedJobs = () => (
    this.props.likedJobs.map(job => {
      const {
        company,
        formattedRelativeTime,
        url,
        longitude,
        latitude,
        jobtitle,
        jobkey
      } = job;
      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      return (
        <Card key={jobkey} title={jobtitle}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply Now!"
              backgroundColor="#03a9f4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    })
  )

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
});

const mapStateToProps = state => ({
  likedJobs: state.LikedJobsReducer
});

export default connect(mapStateToProps)(ReviewScreen);

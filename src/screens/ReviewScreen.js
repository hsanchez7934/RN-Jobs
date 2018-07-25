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
    }
  })

  renderLikedJobs = () => (
    this.props.likedJobs.map(job => {
      const { company, formattedRelativeTime, url } = job;
      return (
        <Card>
          <View style={{ height: 200 }}>
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

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {

  renderLastSlide = (index) => {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="Continue"
          raised
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onSlidesComplete}
        />
      );
    }
  }

  renderSlides = () => (
    this.props.data.map((slide, index) =>
      <View
        key={slide.text}
        style={[styles.slideStyle, { backgroundColor: slide.color }]}
      >
        <Text style={styles.textStyle}>
          {slide.text}
        </Text>
        {this.renderLastSlide(index)}
      </View>)
  )

  render() {
    return (
      <ScrollView
         horizontal
         pagingEnabled
         style={{ flex: 1 }}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    paddingLeft: Platform.OS === 'android' ? 30 : 0,
    paddingRight: Platform.OS === 'android' ? 30 : 0,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30

  },
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  buttonStyle: {
    backgroundColor: '#0288d1',
    width: SCREEN_WIDTH / 2
  }
});

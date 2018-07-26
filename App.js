import Expo, { Notifications } from 'expo';
import React from 'react';
import { View, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';
import { PersistGate } from 'redux-persist/integration/react';

import store from './src/store';
import registerForNotifications from './src/services/push_notifications';

import AuthScreen from './src/screens/AuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const MainNavigator = createBottomTabNavigator({
  Welcome: { screen: WelcomeScreen },
  Auth: { screen: AuthScreen },
  Main: {
    screen: createBottomTabNavigator({
      Map: { screen: MapScreen },
      Deck: { screen: DeckScreen },
      Review: {
        screen: createStackNavigator({
          Review: { screen: ReviewScreen },
          Settings: { screen: SettingsScreen }
        }),
        navigationOptions: () => ({
          title: 'Review Jobs',
          tabBarIcon: ({ tintColor }) => <Icon name="favorite" size={25} color={tintColor} />
        })
      }
    }, {
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    })
  }
}, {
  lazy: true,
  navigationOptions: {
    tabBarVisible: false
  }
});

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      // const text = notification.data.text - same as next line;
      const { data: { text }, origin } = notification;
      if (origin === 'received' && text) {
        Alert.alert('New Push Notification', text, [{ text: 'Ok' }]);
      }
    });
  }

  render() {
    return (
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
          <View style={{ flex: 1 }}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

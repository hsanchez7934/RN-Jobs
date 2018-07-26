import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  // eslint-disable-next-line
  let previousToken = await AsyncStorage.getItem('push_token');
  console.log(previousToken);

  if (previousToken) {
    return;
  }
  // eslint-disable-next-line
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }
  // eslint-disable-next-line
  let token = await Notifications.getExpoPushTokenAsync();
  
  await axios.post(PUSH_ENDPOINT, {
    token: { token }
  });
  AsyncStorage.setItem('push_token', token);
};

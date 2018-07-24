import { AsyncStorage } from 'react-native';
import { FACEBOOK_LOGIN_SUCCESS } from './types';

//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token');
const facebookLoginSuccessAction = (action) => ({

})

export const facebookLogin = () => async dispatch => {
  // eslint-disable-next-line
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // Dispatch an action saying FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB login process
  }
};

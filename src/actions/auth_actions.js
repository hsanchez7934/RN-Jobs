import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import apiKeys from '../apiKeys';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token');

//Action Creators
const facebookLoginSuccessAction = loginToken => ({
  type: FACEBOOK_LOGIN_SUCCESS,
  payload: loginToken
});

const facebookLoginFailAction = () => ({
  type: FACEBOOK_LOGIN_FAIL
});

export const facebookLogin = () => async dispatch => {
  // eslint-disable-next-line
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // Dispatch an action saying FB login is done
    dispatch(facebookLoginSuccessAction(token));
  } else {
    // Start up FB login process
    doFacebookLogin(dispatch);
  }
};

//Helper functions
const doFacebookLogin = async dispatch => {
  // eslint-disable-next-line
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(apiKeys.facebookAppId, {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    dispatch(facebookLoginFailAction());
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch(facebookLoginSuccessAction(token));
};

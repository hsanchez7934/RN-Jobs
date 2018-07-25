import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import JobsReducer from './JobsReducer';
import LikedJobsReducer from './LikesReducer';

export default combineReducers({
  AuthReducer,
  JobsReducer,
  LikedJobsReducer
});

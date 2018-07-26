import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import apiKeys from '../apiKeys';
import mockData from '../mockData';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = `https://api.indeed.com/ads/apisearch?`;
const JOB_QUERY_PARAMS = {
  publisher: apiKeys.indeedAPIKey,
  form: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const fetchJobsAction = jobData => ({
  type: FETCH_JOBS,
  payload: jobData
});

const buildJobsUrl = zipCode => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zipCode });
  return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    // eslint-disable-next-line
    let zipCode = await reverseGeocode(region);
    const url = buildJobsUrl(zipCode);
    console.log(url);
    // eslint-disable-next-line
    // let { data } = await axios.get(url);    this piece of code fetches data from indeed api - couldn't get api key
    dispatch(fetchJobsAction(mockData));
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const likeJob = job => ({
  type: LIKE_JOB,
  payload: job
});

export const clearLikedJobs = () => ({
  type: CLEAR_LIKED_JOBS
});

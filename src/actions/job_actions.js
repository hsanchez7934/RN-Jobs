import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import apiKeys from '../apiKeys';

import {
  FETCH_JOBS
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

export const fetchJobs = region => async dispatch => {
  try {
    // eslint-disable-next-line
    let zipCode = await reverseGeocode(region);
    const url = buildJobsUrl(zipCode);
    // eslint-disable-next-line
    let { data } = await axios.get(url);
    console.log(data);
    dispatch(fetchJobsAction(data));
  } catch (error) {
    console.log(error);
  }
};

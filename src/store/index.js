import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['LikedJobsReducer']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  // eslint-disable-next-line
  let store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
  // eslint-disable-next-line
  let persistor = persistStore(store);
  return { store, persistor };
};

// call .purge() to clear data save to redux persist;

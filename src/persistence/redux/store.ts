import {
  REDUX__storeMetadataReducer,
  StoreMetadataSliceState,
  storeMetadataSliceInitialState
} from './lib/storeMetadata';

import Environment from '../../Environment';
import { configureStore } from '@reduxjs/toolkit';

export interface REDUX__GlobalState {
  _storeMetadata: StoreMetadataSliceState;
}

const defaultState: REDUX__GlobalState = {
  _storeMetadata: storeMetadataSliceInitialState
};

const store = configureStore({
  reducer: {
    _storeMetadata: REDUX__storeMetadataReducer
  },
  preloadedState: defaultState,
  devTools: Environment.isDevelopment(process.env.NEXT_PUBLIC_ENV)
});

export default store;

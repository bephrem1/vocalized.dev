import {
  ActionReducerMapBuilder,
  PrepareAction,
  Reducer,
  createAction,
  createReducer
} from '@reduxjs/toolkit';

import { REDUX__GlobalState } from '../store';
import { isEmpty } from '../../../helpers/empty';

/*
  The Redux store is transient & wipes on page reload, window close, etc. Upon page load
  we hydrate the store with data from local storage, session storage, etc.

  Before this initial hydration from persistence, the store is not ready to be read from,
  so we track a flag to indicate when the initial hydration has completed.
*/
interface ReduxStoreMetadata {
  initialHydrationComplete: boolean;
}

export interface StoreMetadataSliceState extends ReduxStoreMetadata {}

export const storeMetadataSliceInitialState: StoreMetadataSliceState = {
  initialHydrationComplete: false
};

/* Actions */

const NAMESPACE = 'store-metadata';

export const REDUX__updateStoreMetadataActionType = `${NAMESPACE}/updateStoreMetadata`;

export const REDUX__updateStoreMetadata = createAction<
  PrepareAction<{ metadata: Partial<ReduxStoreMetadata> }>
>(REDUX__updateStoreMetadataActionType, ({ metadata }) => {
  return {
    payload: {
      metadata
    }
  };
});

/* Reducer */

export const REDUX__storeMetadataReducer: Reducer<StoreMetadataSliceState> = createReducer(
  storeMetadataSliceInitialState,
  (builder: ActionReducerMapBuilder<StoreMetadataSliceState>) => {
    builder.addCase(REDUX__updateStoreMetadata, (state: StoreMetadataSliceState, action) => {
      if (
        !isEmpty(action.payload.metadata) &&
        !isEmpty(action.payload.metadata.initialHydrationComplete)
      ) {
        state.initialHydrationComplete = action.payload.metadata.initialHydrationComplete;
      }
    });
  }
);

/* Selectors */

export const REDUX__selectStoreInitialHydrationComplete = (
  globalState: REDUX__GlobalState
): boolean => {
  return globalState._storeMetadata.initialHydrationComplete;
};

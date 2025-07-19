// Manage State 

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { productApi } from './api/productsApi';

const rootReducer = combineReducers({
  counter: counterReducer,
  [productApi.reducerPath]: productApi.reducer,  // Add RTK Query reducer here
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required by redux-persist
    }).concat(productApi.middleware), // Add RTK Query middleware
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

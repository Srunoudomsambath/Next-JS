'use client'; // Needed for client-side

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> 
        
        {children}
      </PersistGate>
    </Provider>
  );
}
// store reload page data save in local storage


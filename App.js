/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import MainNavigator from './src/navigator';
import {Provider} from 'react-redux';
// import configureStore from './src/redux/store';
import { store, persistor } from './src/redux/store'
import {PersistGate} from 'redux-persist/integration/react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {typography} from './src/styles/typography';

typography();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6379f4',
    background: 'rgba(99, 121, 244, 0.2)',
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <MainNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

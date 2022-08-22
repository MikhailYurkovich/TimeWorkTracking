import React from 'react';
import MainStack from './pages/navigate';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {TextInput, Text} from 'react-native';

import {rootReducer} from './store/reducers';

function App() {
  const store = createStore(rootReducer);

  // отключить массштабирование
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}

export default App;

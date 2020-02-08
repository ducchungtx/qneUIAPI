
import React, { Component } from 'react';
import { Block, GalioProvider } from 'galio-framework';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import appReducers from 'src/Redux/reducers';
import RootRouter from 'src/RootRouter';
import { Theme } from 'src/Commons';

const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export const store = createStore(
  appReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GalioProvider theme={Theme}>
          <Block flex>
            <RootRouter />
          </Block>
        </GalioProvider>
      </Provider>
    )
  }
}

export default App;


import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider ,createStore } from 'easy-peasy';
import ScModel from './providers/ScModel';

import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(ScModel);

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();

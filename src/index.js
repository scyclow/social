import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store, { history } from './ducks'
import { ConnectedRouter } from 'connected-react-router'
// import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();

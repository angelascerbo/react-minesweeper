import React from 'react'; 
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import gameReducer from './reducers/gameReducer'
import styles from './styles/game.scss'

const store = createStore(gameReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
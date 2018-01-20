import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware,createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import user from './reducers.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css'

let store = createStore(user,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)); //for setting up chrome dev tools

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') 
)

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

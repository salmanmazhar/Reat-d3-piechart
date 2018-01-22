import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware,createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import appStore from './reducers.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css'

//create store with chrome devtools extension
let store = createStore(appStore,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)); 

//Render app with store    
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') 
)

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './index.css';
import GlobalStyle from './assets/styles/GlobalStyle';
import store from './store';

import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';


ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <GlobalStyle />
            <App />
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);

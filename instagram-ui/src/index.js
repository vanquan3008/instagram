import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from '~/Components/GlobalStyle';
// import store from "./Redux/store.js"
import { Provider } from 'react-redux';
import { persistor } from './Redux/store.js';
import {store} from './Redux/store.js';
// import store fro './Redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
       <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GlobalStyle>
                    <App/>
                </GlobalStyle>
            </PersistGate>
       </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

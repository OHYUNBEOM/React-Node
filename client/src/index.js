import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';


import 'antd/dist/antd.css';
import { applyMiddleware,createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers/';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)


ReactDOM.render( 
  <Provider
    store={createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__&&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  >
    <App /> 
  </Provider>

  
  ,document.getElementById('root')); 
// ReactDOM.render(
//   <React.StrictMode>
//     <App />  // 여기 부분에 보여주고싶은 컴포넌트를 넣는다 (App / 이 아닌 <div>Hello</div>) 작성시에 화면에 Hello 만 보여짐
//   </React.StrictMode>,
//   document.getElementById('root')
// ); 


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//testing

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//引入CreateStore创建数据仓库
import { createStore } from './flux';
import Reducers from './reducers';

//引入顶层组件Provider,用来分发props
import Provider from './redux-flux/Provider';
//引入调度器
// import Dispatcher from './Dispatcher';
//添加中间件
// Dispatcher.use((action, next) => {
//     setTimeout(() => {
//         console.log('--------------log-----------------:' + action.type);
//         next();
//     },2000);
// }).use((action, next)=>{
//     setTimeout(() => {
//         console.log('--------------show-----------------:' + action.type);
//         next();
//     },2000);
// })

const store = createStore(Reducers);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
    , 
    document.getElementById('root')
);
registerServiceWorker();

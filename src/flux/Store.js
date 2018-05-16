import Events  from 'events';
//引入调度器
import Dispatcher from './Dispatcher';

const EventEmitter = Events.EventEmitter;

class Store extends EventEmitter {
    constructor(reducers, middlewareList) {
        super();
        this._store = { };
        //遍历reducers,拿到对应的key做为Store中的数据属性名,同时初始化this._store
        Object.keys(reducers).forEach((key) => {
            if(typeof reducers[key] === 'function')
            this._store[key] = reducers[key](undefined,{ });
                // this._store = Object.assign({ },this._store,reducers[key](undefined,{ }));
        });
        console.log('---------初始化完成,展示store-------------');
        console.log(this._store);
        //每创建一个Store,就在调度器中注册
        Dispatcher.register((action) => {
            //#region  重构之前
            // this._list = [];
            //判断action类型,做出相应的处理
            // switch(action.type) {
            //     case 'ADD': 
            //         this._add(action.item);break;
            //     case 'GETLIST':
            //         this._getList(action.list);break;
            // }
            //#endregion
            console.log('---------更改之前store-------------');
            console.log(this._store);
            //遍历reducers,调用其中的函数
            let newStore = { };
            Object.keys(reducers).forEach(key => {
                let reducer = reducers[key];
                if(typeof reducer === 'function') {
                    // this._store = reducer(this._store, action);
                    newStore[key] = reducer(this._store[key], action);
                }
            });
            this._store = Object.assign({ }, this._store, newStore);
            console.log('---------更改之后store-------------');
            console.log(this._store);
            //通知引用的UI组件,store的值已经发生变化
            this.emit('change',this._store);
        })
        
    }
    //返回当前的状态
    getState() {
        return this._store;
    }
    //#region  重构之前
    //已经封装到外部,不再需要内部编写
    // _add(item) {
    //     this._list.push(item);

    //     this.emit('change',this._list);
    // }


    // _getList(list) {
    //     this._list = list;
    //     this.emit('change',this._list);
    // }
    //#endregion
}


//reducers是一个对象,里面是对应的action处理函数
const createStore = (reducers) => {
    return new Store(reducers);
}
export default createStore;
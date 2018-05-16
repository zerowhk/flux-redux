
//Store回调函数列表,每一个Store对应一个回调函数,接收一个action
const storeCallbackList = [];
//需要调用的中间件列表
const middlewareList = [];
const Dispatcher = {
    //注册StoreCallback
    register(storeCallback) {
        storeCallbackList.push(storeCallback);
    },
    //使用中间件
    use(middleware) {
        middlewareList.push(middleware);
        //方便链式调用
        return this;
    },
    dispatch(action) {
        //首先经过所有的中间件,最后再调用storeCallback
        let that = this;
        //记录当前中间件索引
         let currentIndex = -1;
        //有可能会有异步调用的情况,提供next函数保证异步函数顺序正常进行
        function next() {
            let middleware = middlewareList[++currentIndex];
            if(typeof middleware === 'function') {
                middleware(action, next);
            }else {   //说明中间件执行完成
                that._dispatch(action);
            }
        }

        next();
    },
    _dispatch(action) {
        for(let storeCallback of storeCallbackList) {
            if(typeof storeCallback === 'function') {
                storeCallback(action);
            }
        }
    }
}

export default Dispatcher;
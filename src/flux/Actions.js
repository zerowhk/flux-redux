//引入调度器
import Dispatcher from './Dispatcher';

class Actions {
    constructor(actions) {
        console.log('---------包装之前的actions');
        console.log(actions);
        //包装传递过来的actions
        Object.keys(actions).forEach((key) => {
            let action = actions[key];
            this[key] = (options) =>{
                console.log('----------生成的action');
                console.log(action());
                Dispatcher.dispatch(action(options));
            }
        });
    }
    //#region  重构之前
    //已经外部包装,不再需要自己定义了
    // add(item) {
    //     const action = {
    //         type: 'ADD',
    //         item
    //     }
    //     Dispatcher.dispatch(action);
    // } 

    // getList() {
    //     WebApi.getList((list) => {
    //         const action = {
    //             type: 'GETLIST',
    //             list
    //         }
    //         Dispatcher.dispatch(action);
    //     })
    // }
    //#endregion
}

const packageActions = (actions) => {
    return new Actions(actions);
}
export default packageActions;
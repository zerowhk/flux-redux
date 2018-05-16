const initState = [];

export default function(state = initState, action) {
     //判断action类型,做出相应的处理
    switch(action.type) {
        case 'add': 
            //克隆原数组,在原数组的基础上进行添加,再重新赋值给原数组
            let _list = state.slice(0);
            _list.push(action.item);
            return _list;
        case 'getList':
            return action.list;
        default:
            return state;
    }
}
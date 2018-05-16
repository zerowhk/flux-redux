import React  from 'react';
import PropTypes from 'prop-types';

class Provider extends React.Component {
    constructor(props) {
        super(props);
        //设置store
        this.state = {
            store : props.store.getState()
        };
        //监听store,在store发生改变的时候重新setState store,分发给对应的子组件
        props.store.on('change',(store) => {
            console.log('------------监听到了store更新---------');
            this.setState({
                store
            })
        });
        
        console.log('----Provider接收的store------');
        console.log(this.state.store);    //{list: []}
    }
    componentWillReceiveProps() {
        console.log('--------Provider的props发生变化---------');
        console.log(this.props);
    }
    getChildContext() {
        // console.log({ store: this.store });
        return { store: this.state.store };
    } 

    render() {
        console.log('--------Provider重新render---------');
        return this.props.children;
    }

}

// 设置子组件的context值
Provider.childContextTypes = {
    store: PropTypes.object.isRequired
}


export default Provider;
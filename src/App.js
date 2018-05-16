import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { packageActions, createStore } from './flux';
import { packageActions } from './flux';
import connect from './redux-flux/connect';
// import Reducers from './reducers';
import actionsFunc from './actions/index';
//引入WebApi,模拟向后台请求数据
import WebApi from './WebApi';

// const actions = packageActions(actionsFunc);
// const store = createStore(Reducers);

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        list: []
      }
    }
   
    componentDidMount() {
      console.log('--------接收到传递过来的props---------');
      console.log(this.props);
      // 调用actions.getList来初始化数据
      WebApi.getList((list) => {
        this.props.actions.getList({ list });
      });
      //监听的工作放到了Provider组件中去了
      // store.on('change',(state) => {
      //   this.setState({ list: state.list });
      // })
    }
    add() {
      this.props.actions.add({ item: this.refs.inputName.value });
      //清空文本框输入内容
      this.refs.inputName.value = '';
    }
    render() {
      return (
        <ul>
          {/* { this.state.list.map((item,index) => <li key={index}>{item}</li>) } */}

          { this.props.list.map((item,index) => <li key={index}>{item}</li>) }
          <li>
            <input ref='inputName' />
            <button onClick={ () => this.add() }>添加</button>
          </li>
        </ul>
      )
    }
}

App.contextTypes = {
  store: PropTypes.object
};

function mapStateToProps(state) {
  return {
     list: state.list   
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: packageActions(actionsFunc)
  };
}


// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);

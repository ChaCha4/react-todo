import React, { Component } from 'react';
import Bottom from './Bottom/Bottom';
import Todo from './Todo/Todo';
import axios from 'axios';
class App extends Component {
  // todo和bottom 中都需要设置state因此将ｓｔａｔｅ写在ａｐｐ中
  state = {
    list: [],
    type: 'all'
  };
  // 刷新页面state就要和后台数据库连接起来，利用componentDidMount
  componentDidMount() {
    axios.get('http://localhost:3008/list').then(res => {
      this.setState({
        list: res.data
      });
    });
  }
  render() {
    const { list, type } = this.state;
    return (
      <>
        <h1>TO DO</h1>
        {/* 分为两个组件，一个输入框和展示列表，一个是底部的各项 */}
        <Todo
          addTodo={this.addTodo}
          list={list}
          doneTodo={this.doneTodo}
          deleteItem={this.deleteItem}
          type={type}
        />
        <Bottom
          list={list}
          type={type}
          changeStyle={this.changeStyle}
          clearItem={this.clearItem}
        />
      </>
    );
  }
  addTodo = newTodo => {
    const { list } = this.state;
    axios.post('http://localhost:3008/list', newTodo).then(res => {
      this.setState({ list: [...list, res.data] });
    });
  };
  doneTodo = id => {
    const { list } = this.state;
    if (id) {
      // 实现可以多次点击改变对应删除线状态
      axios
        .patch(`http://localhost:3008/list/${id}`, {
          done: !list.find(todo => todo.id === id).done
        })
        .then(res => {
          this.setState({
            list: list.map(todo => {
              if (todo.id === id) {
                // 为什么不用 todo=res.data 和 todo.done =true 这两个方法，因为map内 todo 这个参数就是 list 数组内的某个对象，直接对 todo 进行修改也就相当于直接修改了 todos
                return res.data;
              }
              return todo;
            })
          });
        });
    }
  };
  deleteItem = id => {
    const { list } = this.state;
    // 删除一个元素就是过滤出来除这个元素以外的其他元素
    this.setState({
      list: list.filter(i => i.id !== id)
    });
  };
  changeStyle = type => {
    this.setState({
      type: type
    });
  };
}

export default App;

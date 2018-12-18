import React, { Component } from 'react';
import './todo.css';
import Axios from 'axios';
class Todo extends Component {
  // 展示列表中的项目
  state = {
    val: ''
  };
  render() {
    const { val } = this.state;
    const { list, doneTodo, type } = this.props;
    // const showTodos = todos.filter(todo => {
    //   if (type === 'all') {
    //     return true
    //   } else if (type === 'active') {
    //     return !todo.done
    //   } else {
    //     return todo.done
    //   }
    // })
    const showTodos = list.filter(todo =>
      type === 'all' ? true : type === 'active' ? !todo.done : todo.done
    );
    const showList = showTodos.reverse().map(item => (
      <li key={item.id}>
        <span
          style={{
            textDecoration: item.done ? 'line-through' : 'none',
            color: item.done ? '#d9dadd' : '#4d4d4d',
            transition: 'all 0.5s'
          }}
          onClick={() => {
            doneTodo(item.id);
          }}
        >
          {item.body}
        </span>
        <button
          className="delete"
          onClick={() => {
            this.deleteItem(item.id);
          }}
        >
          ×
        </button>
      </li>
    ));
    return (
      <>
        {/* 输入框和展示列表 */}
        <input
          type="text"
          value={val}
          onChange={this.handleList}
          placeholder="What needs to be done?"
          onKeyDown={this.handleEnter}
        />

        <ul className="list">{showList}</ul>
      </>
    );
  }
  handleEnter = event => {
    if (event.keyCode === 13) {
      this.addTodo();
    }
  };
  handleList = event => {
    this.setState({
      val: event.target.value
    });
  };
  addTodo = () => {
    const { val } = this.state;
    const { addTodo } = this.props;
    if (val.trim()) {
      const newTodo = {
        body: val,
        done: false
      };
      addTodo(newTodo);
      this.setState({
        val: ''
      });
    }
  };
  deleteItem = id => {
    const { deleteItem } = this.props;
    Axios.delete(`http://localhost:3008/list/${id}`).then(res => {
      deleteItem(id);
    });
  };
}

export default Todo;

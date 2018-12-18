import React, { Component } from 'react';
import './bottom.css';
// import axios from 'axios';
class Bottom extends Component {
  render() {
    const { list, type, changeStyle } = this.props;
    const num = list.filter(item => !item.done).length;
    // 清除已经完成的项目
    const haveDone = list.filter(item => item.done).length;

    return (
      // 底部按钮
      <ul className="btn">
        <li>
          {num}
          {num === 1 || num === 0 ? 'item' : 'items'} left
        </li>
        <li
          style={{
            border: type === 'all' ? '1px solid #000' : '1px solid #fff'
          }}
          onClick={() => {
            changeStyle('all');
          }}
        >
          All
        </li>
        <li
          style={{
            border: type === 'active' ? '1px solid #000' : '1px solid #fff'
          }}
          onClick={() => {
            changeStyle('active');
          }}
        >
          Active
        </li>
        <li
          style={{
            border: type === 'completed' ? '1px solid #000' : '1px solid #fff'
          }}
          onClick={() => {
            changeStyle('completed');
          }}
        >
          Completed
        </li>
        {haveDone ? <li>clearItem</li> : null}
      </ul>
    );
  }
  // clearItem
}

export default Bottom;

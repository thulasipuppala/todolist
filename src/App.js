import React, { Component } from 'react';
import logo from './logo.svg';
import FlipMove from 'react-flip-move'

import './App.css';

class TodoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    var itemArray = this.state.items;

    if (this._inputElement.value !== "") {
      itemArray.unshift(
        {
          text: this._inputElement.value,
          key: Date.now()
        }
      );

      this.setState({
        items: itemArray
      });

      this._inputElement.value = "";
    }
    console.log(itemArray);
    e.preventDefault();
  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }

  render() {
    return (
      <div className="todoListMain">
        <h1>To-Do List</h1>
        <div className="header">
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a}
              placeholder="enter task">
            </input>
            <button type="submit">Add Task</button>
          </form>
        </div>

        <TodoItems entries={this.state.items}
                  delete={this.deleteItem}/>
      </div>
    );
  }
}

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  delete(key){
    this.props.delete(key);
  }

  createTasks(item) {
    return <li onClick={() => this.delete(item.key)} key={item.key}>{item.text}</li>
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
        <FlipMove duration={250} easing="ease-out">
          {listItems}
        </FlipMove>
      </ul>
      );
    }
}

class App extends Component {

  render() {
    return (
      <div className = "App">
        <TodoList addItem={this.addItem}/>
      </div>
    );
  }
}

export default App;

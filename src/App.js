import React from 'react';
import './App.css';


import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListHeader from "./TodoListHeader";
import TodoListFooter from "./TodoListFooter ";

class App extends React.Component {
    tasks = [
        {title: 'js', isDone: true, priority: 'high'},
        {title: 'react', isDone: true, priority: 'high'},
        {title: 'Css', isDone: false, priority: 'low'},

    ]
    filterValue = 'All'
    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks tasks ={this.tasks} />
                    <TodoListFooter filterValue={this.filterValue} />
                </div>
            </div>
        );
    }
}
export default App;




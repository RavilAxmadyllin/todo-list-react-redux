import React from 'react';

import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter ";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";

class TodoList extends React.Component {
    componentDidMount(){
        this.restoreState()
    }

    state= {
        tasks: [
            {id:1, title: 'js', isDone: false, priority: 'high'},
            {id:2, title: 'react', isDone: false, priority: 'high'},
            {id:3, title: 'Css', isDone: false, priority: 'low'},
        ],
        filterValue: 'All'
    };

    newTaskId = 0

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };
    changeTasks = (taskId, obj) => {
        let newTasks = this.state.tasks.map( t =>{
            if (t.id !==taskId){
                return {...t}
            }else {
                return {...t, ...obj}
            }
        })
        this.setState({
            tasks:newTasks
        })
    }

    addTask = (newText) =>{
        let newTask ={
            id:this.newTaskId,
            title: newText,
            isDone: false,
            priority: 'low'
        };
        let newTasks = [...this.state.tasks, newTask];
        this.newTaskId++
        this.setState({
            tasks:newTasks
        }, this.saveState)
    };

    saveState = (key, value) => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem("our-state", stateAsString +this.props.id)
    }
    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        }
        let stateAsString = localStorage.getItem("our-state" + this.props.id)
        if (stateAsString != null){
            state = JSON.parse(stateAsString)
        }

        this.setState(state, ()=>{
            this.state.tasks.forEach(task =>{
                if (task.id <= this.nextTaskId){
                    this.nextTaskId = task.id + 1
                }
            })
        })

    }

    render = () => {
        let tasks =this.state.tasks.filter(t => {
            switch (this.state.filterValue) {
                case "All": return t
                case 'Completed': return t.isDone
                case 'Active': return !t.isDone
                default: return  t
            }
        })
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle title={this.props.title} />
                        <AddNewItemForm addItem={this.addTask} />
                    </div>
                    <TodoListTasks changeTasks={this.changeTasks} tasks={tasks} />
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    }
}
export default TodoList;



// changeStatus =(taskId, isDone) =>{
//
//     let newTask = this.state.tasks
//     newTask.forEach(t => {
//         if (t.id === taskId) {
//             return t.isDone = !t.isDone
//         }
//     })
//     this.setState({
//         tasks: newTask
//     })
// }
// changeTitle = (taskId, title) =>{
//     let newTask = this.state.tasks
//     newTask.forEach(t => {
//         if(t.id === taskId) {
//             return t.title = title
//         }
//
//     })
//     this.setState({
//         tasks: newTask
//     })
// }

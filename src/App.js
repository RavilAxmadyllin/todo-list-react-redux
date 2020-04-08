import React from 'react';
import './App.css';


import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListHeader from "./TodoListHeader";
import TodoListFooter from "./TodoListFooter ";

class App extends React.Component {
    constructor(e) {
        super(e);
        window.state = this.state;
    }
    componentDidMount(){
        this.restoreState()
    }

    state= {
        tasks: [
            // {id:1, title: 'js', isDone: false, priority: 'high'},
            // {id:2, title: 'react', isDone: false, priority: 'high'},
            // {id:3, title: 'Css', isDone: false, priority: 'low'},

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

    saveState = () => {
        // let stateAsString = JSON.stringify(this.state)
        localStorage.setItem("our-state", JSON.stringify(this.state))
    }
    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        }
        let stateAsString = localStorage.getItem('our-state')
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

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} />

                    <TodoListTasks changeTasks={this.changeTasks} changeTitle={this.changeTitle} changeStatus={this.changeStatus} tasks ={this.state.tasks.filter(t => {
                        if(this.state.filterValue === 'All') {
                            return true;
                        }
                        if(this.state.filterValue === 'Completed') {
                            return t.isDone === true
                        }
                        if(this.state.filterValue === 'Active') {
                            return t.isDone === false
                        }
                    })} />
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    }
}
export default App;




import React from 'react';
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter ";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTask, changeTask, deleteTask, deleteTodoList} from "./redux/reducer";

class TodoList extends React.Component {
    state= {
        filterValue: 'All'
    };
    deleteTodo = () =>{
        this.props.deleteTodoList(this.props.id)
    }
    deleteTask =(id) =>{
        this.props.deleteTask(this.props.id, id)
    }
    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    };
    changeTasks = (taskId, obj) => {
        this.props.changeTask(this.props.id, taskId, obj)
    }

    addTask = (newText) =>this.props.addTasks(newText, this.props.id)
    render = () => {
        let tasks =this.props.tasks.filter(t => {
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
                        <TodoListTitle title={this.props.title} deleteTodo={this.deleteTodo} />
                        <AddNewItemForm addItem={this.addTask} />
                    </div>
                    <TodoListTasks
                        changeTasks={this.changeTasks} tasks={tasks}
                        todolist={this.props.id} deleteTask={this.deleteTask} />
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    }
}
const mdtp = (dispatch) =>{
    return{
        addTasks:(text,todoID) =>{
            dispatch(addTask(text,todoID))
        },
        deleteTodoList:(todoID) =>dispatch(deleteTodoList(todoID)),
        deleteTask: (todoID, taskId) =>dispatch(deleteTask(todoID, taskId)),
        changeTask: (todoID, taskId, obj) => dispatch(changeTask(todoID, taskId, obj))
    }
}
const ConnectTodolist = connect(null, mdtp)(TodoList)
export default ConnectTodolist;

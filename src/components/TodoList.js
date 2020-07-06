import React from 'react';
import TodoListTasks from './TodoListTasks/TodoListTasks';
import TodoListFooter from './TodoListFooter ';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm';
import {connect} from 'react-redux';
import {
    addTask,
    changeTaskSucces,
    deleteTask,
    deleteTodolist,
    getTasks,
    updateTask,
    updateTodoListTitle
} from '../redux/reducer';

class TodoList extends React.Component {
    componentDidMount() {
        this.props.setTasks(this.props.id)
    }

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
    }
    changeTasks = (taskId, obj) => {
        let changedTask = this.props.tasks.find(task => {
            if(task.id === taskId) return task;
        })
        changedTask = {...changedTask, ...obj}
        this.props.updateTask(this.props.id, taskId, changedTask)
    }
    changeTitle = (title) =>{
        this.props.updateTodolistTitle(title, this.props.id)
    }
    addTask = (newText) =>this.props.addTasks(this.props.id, newText)
    render = () => {
        let {tasks = []} = this.props;
        let filter = tasks.filter(t => {
            switch (this.state.filterValue) {
                case "All": return true
                case 'Completed': return t.status === 2
                case 'Active': return t.status === 0
                default: return  t
            }
        })

        return (
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle changeTitle={this.changeTitle} title={this.props.title} deleteTodo={this.deleteTodo} />
                        <AddNewItemForm addItem={this.addTask} />
                    </div>
                    <TodoListTasks
                        changeTasks={this.changeTasks} tasks={filter}
                        todolist={this.props.id} deleteTask={this.deleteTask} />
                    <TodoListFooter
                        filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                    />
                </div>
        );
    }
}
const mdtp = (dispatch) =>{
    return{
        addTasks:(todoID, text) =>{
            dispatch(addTask(todoID,text))
        },
        setTasks:(todoId) => {
            dispatch(getTasks(todoId))
        },
        deleteTodoList:(todoID) =>dispatch(deleteTodolist(todoID)),
        deleteTask: (todoID, taskId) =>dispatch(deleteTask(todoID, taskId)),
        updateTask: (todoID, taskId, delta) => dispatch(updateTask(todoID,taskId, delta)),
        updateTodolistTitle:(title, id) => dispatch(updateTodoListTitle(title, id))
    }
}
const ConnectTodolist = connect(null, mdtp)(TodoList)
export default ConnectTodolist;

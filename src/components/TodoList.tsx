import React from 'react';
import TodoListTasks from './TodoListTasks/TodoListTasks';
import TodoListFooter from './TodoListFooter ';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm';
import {connect} from 'react-redux';
import {
    addTask,
    deleteTask,
    deleteTodolist,
    getTasks, TaskType,
    updateTask,
    updateTodoListTitle,
} from '../redux/reducer';
import {RootStateType} from '../redux/store';


class TodoList extends React.Component<AllPropsType> {
    componentDidMount() {
        this.props.getTasks(this.props.id)
    }

    state = {
        filterValue: 'All'
    };
    deleteTodo = () => {
        this.props.deleteTodolist(this.props.id)
    }
    deleteTask = (id: string) => {
        this.props.deleteTask(this.props.id, id)
    }
    changeFilter = (newFilterValue: string) => {
        this.setState({
            filterValue: newFilterValue
        })
    }
    changeTasks = (taskId: string, obj: any) => {
        let changedTask = this.props.tasks.find(task => {
            if (task.id === taskId) return task;
        })
        if (changedTask) {
            changedTask = {...changedTask, ...obj}
            // @ts-ignore
            this.props.updateTask(this.props.id, taskId, changedTask)
        }
    }
    changeTitle = (title: string) => {
        this.props.updateTodoListTitle(title, this.props.id)
    }
    addTask = (newText: string) => this.props.addTask(this.props.id, newText)
    render = () => {
        let {tasks = []} = this.props;
        let filter = tasks.filter(t => {
            switch (this.state.filterValue) {
                case 'All':
                    return true
                case 'Completed':
                    return t.status === 2
                case 'Active':
                    return t.status === 0
                default:
                    return t
            }
        })

        return (
            <div className="todoList">
                <div className="todoList-header">
                    <TodoListTitle changeTitle={this.changeTitle} title={this.props.title}
                                   deleteTodo={this.deleteTodo}/>
                    <AddNewItemForm addItem={this.addTask}/>
                </div>
                <TodoListTasks
                    changeTasks={this.changeTasks} tasks={filter}
                    todolist={this.props.id} deleteTask={this.deleteTask}/>
                <TodoListFooter
                    filterValue={this.state.filterValue}
                    changeFilter={this.changeFilter}
                />
            </div>
        );
    }
}

const ConnectTodolist = connect<OwnPropsType, MdtpType, OwnPropsType, RootStateType>(null, {
    addTask,
    getTasks,
    deleteTodolist,
    deleteTask,
    updateTask,
    updateTodoListTitle
})(TodoList)
export default ConnectTodolist;

type MdtpType = {
    addTask: (todoId: string, value: string) => void
    getTasks: (todoId: string) => void
    deleteTodolist: (todoId: string) => void
    deleteTask: (todoId: string, taskId: string) => void
    updateTask: (todoID: string, taskId: string, delta: TaskType) => void
    updateTodoListTitle: (title: string, taskId: string) => void
}
type OwnPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
}
// type StatePropsType = {
//     filterValue: string
// }
type AllPropsType = OwnPropsType & MdtpType


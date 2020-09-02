import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddNewItemForm from './components/AddNewItemForm';
import {connect} from 'react-redux';
import {addTodolist, setTodoList, TodoType} from './redux/reducer';
import {TodolistHeder} from './TodolistHeder';
import {RootStateType} from './redux/store';


class App extends React.Component<AllPropsType> {
    componentDidMount() {
        this.props.setTodoList();
    }

    addTodoList = (newTodoListTitle: string) => {
        this.props.addTodolist(newTodoListTitle);
    };
    render = () => {
        let todo =
            this.props.todoLists.map(t => {
                return <TodoList key={t.id} id={t.id} title={t.title} tasks={t.tasks}/>;
            });
        return <>
            <TodolistHeder/>
            <div className={'container'}>
                <h1>Список дел </h1>
                <AddNewItemForm addItem={this.addTodoList} className={'main-header'}/>
                <div className="todoList-wrapper">
                    {todo}
                </div>
            </div>

        </>;
    };
}

const mstp = (state: RootStateType): MapStatePropType => {
    return {
        todoLists: state.todo.todoLists
    };
};


const ConnectedApp = connect<MapStatePropType, MapDispatchPropType, {}, RootStateType>(mstp, {
    setTodoList,
    addTodolist
})(App);
export default ConnectedApp;


type MapStatePropType = {
    todoLists: Array<TodoType>
}
type MapDispatchPropType = {
    setTodoList: () => void
    addTodolist: (title: string) => void
}
type AllPropsType = MapStatePropType & MapDispatchPropType

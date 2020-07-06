import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddNewItemForm from './components/AddNewItemForm';
import {connect} from 'react-redux';
import {addTodolist, setTodoList} from './redux/reducer';
import {TodolistHeder} from './TodolistHeder';


class App extends React.Component {
    componentDidMount() {
        this.props.setTodoList()
    }

    addTodoList=(newTodoListTitle)=>{
        this.props.addTodolist(newTodoListTitle)
    }
    render = () => {
        let todoList = this.props.todoLists.map(t =>{
            return <TodoList key={t.id} id={t.id} title={t.title} tasks={t.tasks}/>
        })
        return <>
            <TodolistHeder />
            <div className={'container'}>
                <h1>Список дел </h1>
                <AddNewItemForm addItem={this.addTodoList} className={'main-header'}/>
                <div className="todoList-wrapper">
                    {todoList}
                </div>
            </div>

        </>
    }
}
const mstp = (state) =>{
    return{
        todoLists: state.todoLists
    }
}


const ConnectedApp = connect(mstp, {setTodoList, addTodolist})(App)
export default ConnectedApp;




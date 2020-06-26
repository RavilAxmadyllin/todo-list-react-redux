import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddNewItemForm from './components/AddNewItemForm';
import {connect} from 'react-redux';
import {addTodolist, setTodoList} from './redux/reducer';


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
        return (
            <div>
                <TodolistHeder />
                <AddNewItemForm addItem={this.addTodoList}/>
                <div className="App">
                    {todoList}
                </div>
            </div>
        );
    }
}
const mstp = (state) =>{
    return{
        todoLists: state.todoLists
    }
}


const ConnectedApp = connect(mstp, {setTodoList, addTodolist})(App)
export default ConnectedApp;




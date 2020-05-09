import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList} from "./redux/reducer";


class App extends React.Component {
    nextTodoListId=0
    state={
        todoLists:[]
    }
    addTodoList=(newTodoListTitle)=>{
        this.props.addTodo(newTodoListTitle)
        // let newTodoList = {
        //     id: this.nextTodoListId,
        //     title:newTodoListTitle
        // }
        // this.nextTodoListId++
        // this.setState({ todoLists: [...this.state.todoLists, newTodoList]})
    }
    render = () => {
        let todoList = this.props.todoLists.map(t =>{
            return <TodoList id={t.id} title={t.title}/>
        })
        return (
            <div>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
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
const mdtp = (dispatch) => {
    return{
        addTodo:(title) =>{
            dispatch(addTodoList(title))
        }
    }
}

const ConnectedApp = connect(mstp, mdtp)(App)
export default ConnectedApp;




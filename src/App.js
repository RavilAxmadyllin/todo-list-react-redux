import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList} from "./redux/reducer";


class App extends React.Component {

    addTodoList=(newTodoListTitle)=>{
        this.props.addTodo(newTodoListTitle)
    }
    render = () => {
        let todoList = this.props.todoLists.map(t =>{
            return <TodoList id={t.id} title={t.title} tasks={t.tasks}/>
        })
        return (
            <div>
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
const mdtp = (dispatch) =>({
        addTodo:(title) =>dispatch(addTodoList(title)),
})

const ConnectedApp = connect(mstp, mdtp)(App)
export default ConnectedApp;




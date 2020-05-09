import React from 'react';
import AddNewItemForm from "./AddNewItemForm";

class TodoListTitle extends React.Component {
    render = () => {
        return (
            <>
                <h3 className="todoList-header__title">{this.props.title}
                    <button onClick={()=>this.props.deleteTodo()}> X</button>
                </h3>

            </>
        );
    }
}


export default TodoListTitle;
import React from 'react';

class TodoListHeader extends React.Component {
    state={
        error: false,
        value: ''
    }
    onAddTaskClick = () => {
        let newText = this.state.value
        if (!newText.trim()){
            this.setState({
                error: true
            })
        }else {
            this.setState({
                error: false,
                value: ''
            })
            this.props.addTask(newText);
        }
    };

    onKeyPress =(e)=>{
        if(e.key === 'Enter'){
            this.onAddTaskClick()
        }
    }
    onTitleChange = (e) =>{
        this.setState({
            value: e.currentTarget.value
        })
    }
    render = () => {
        return (
            <div className="TodoListHeader">
                <div className="todoList-header">
                    <h3 className="todoList-header__title">What to Learn</h3>
                    <div className="todoList-newTaskForm">
                        <input
                               type="text" placeholder="New task name"
                               value={this.state.value}
                               onChange={this.onTitleChange}
                               onKeyPress={this.onKeyPress}
                        className={this.state.error ? 'error' : 'notError'}
                        />
                        <button onClick={this.onAddTaskClick}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default TodoListHeader;
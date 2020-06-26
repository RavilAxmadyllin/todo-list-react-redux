import React from 'react';

class AddNewItemForm extends React.Component {
    state={
        error: false,
        value: ''
    }
    onAddItemClick = () => {
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
            this.props.addItem(newText);
        }
    };

    onKeyPress =(e)=>{
        if(e.key === 'Enter'){
            this.onAddItemClick()
        }
    }
    onTitleChange = (e) =>{
        this.setState({
            value: e.currentTarget.value
        })
    }
    render = () => {
        return (
            <div className="todoList-newTaskForm">
                <input
                    type="text" placeholder="New task name"
                    value={this.state.value}
                    onChange={this.onTitleChange}
                    onKeyPress={this.onKeyPress}
                    className={this.state.error ? 'error' : 'notError'}
                />
                <button onClick={this.onAddItemClick}>Add</button>
            </div>
        );
    }
}


export default AddNewItemForm;
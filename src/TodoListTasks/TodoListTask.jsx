import React from 'react'


class TodoListTask extends React.Component {

    state = {editMode: false}
    onIsDoneChanged = (e) => {
        this.props.changeTasks(this.props.tasks.id, {isDone: e.currentTarget.checked})
    };
    onTitleChange = (e) =>{
        this.props.changeTasks(this.props.tasks.id, {title: e.currentTarget.value})

    }
    activatedEditMode = () => this.setState({editMode:true})
    deactivatedEditMode =() => this.setState({editMode:false})

    render = () =>{
        let done = this.props.tasks.isDone ? 'todoList-task done' : 'todoList-task'
        return (
            <div className={done} >
                <input type="checkbox" checked={this.props.tasks.isDone}
                       onChange={this.onIsDoneChanged}/>
                {this.state.editMode ? <input
                        onBlur={this.deactivatedEditMode}
                        onChange={this.onTitleChange}
                        value={this.props.tasks.title}
                        autoFocus={true}/>:
                    <span
                        onClick={this.activatedEditMode}>
                        <span>{this.props.tasks.id}</span>
                        <span> {this.props.tasks.title}</span>
                        <span> priority:{this.props.tasks.priority}</span>
                   </span>
                }
            </div>
        );
    }
}
export default TodoListTask;
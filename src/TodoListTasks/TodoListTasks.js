import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {

    render = () => {
        let taskElement = this.props.tasks.map(task => {
            return <TodoListTask title={task.title} isDone={task.isDone} priority={task.priority}/>
        });
        return (
            <div className="todoList-tasks">
                {taskElement}
                {/*<TodoListTask title={this.props.tasks[0].title} isDone={this.props.tasks[0].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[1].title} isDone={this.props.tasks[1].isDone}/>*/}
                {/*<TodoListTask title={this.props.tasks[2].title} isDone={this.props.tasks[2].isDone}/>*/}

            </div>
        );
    }
}


export default TodoListTasks;
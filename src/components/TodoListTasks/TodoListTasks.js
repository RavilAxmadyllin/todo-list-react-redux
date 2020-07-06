import React from 'react';
import TodoListTask from "./TodoListTask";



class TodoListTasks extends React.Component {
    render = () => {
        let taskElement = this.props.tasks.map((task) => {
            return <TodoListTask
                key ={task.id}
                changeTasks={this.props.changeTasks}
                task={task}
                deleteTask={this.props.deleteTask}
                todolist={this.props.todolist}
            />
        });
        return (
            <ul>
                {taskElement}
            </ul>

        );
    }
}


export default TodoListTasks;
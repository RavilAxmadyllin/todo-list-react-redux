import React from 'react';
import TodoListTask from "./TodoListTask";



class TodoListTasks extends React.Component {

    render = () => {
        let taskElement = this.props.tasks.map((task, index) => {
            return <TodoListTask
                key ={index}
                changeTasks={this.props.changeTasks}
                tasks={task}
                deleteTask={this.props.deleteTask}
                todolist={this.props.todolist}
            />
        });
        return (
            <div className="todoList-tasks">
                {taskElement}
            </div>
        );
    }
}


export default TodoListTasks;
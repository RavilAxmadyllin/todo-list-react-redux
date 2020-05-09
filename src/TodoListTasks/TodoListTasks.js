import React from 'react';
import TodoListTask from "./TodoListTask";



class TodoListTasks extends React.Component {

    render = () => {
        let taskElement = this.props.tasks.map((task, index) => {
            return <TodoListTask
                key ={index}
                changeTasks={this.props.changeTasks}
                tasks={task}
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
import React from 'react'
import EditeblSpan from '../EditeblSpan'


const TodoListTask = (props) => {
    const onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0
        props.changeTasks(props.task.id, {status: status})
    }
    const onTitleChange = (title) =>{
        props.changeTasks(props.task.id, {title})

    }
    let done = props.task.status ? 'todoList-task done' : 'todoList-task'

    let priotityTitle = props.task.priority
    // switch (props.task.priority) {
    //     case 0: priotityTitle = "Low"; break
    //     case 1: priotityTitle = "Middle" ;break
    //     case 2: priotityTitle = "High"; break
    //     case 3: priotityTitle = "Urgently";break
    //
    // }
    const  onChangeSelected = (e) => {
        props.changeTasks(props.task.id, {priority: e.target.value})
    }
    return (
        <div className={done} >
            <input type="checkbox" checked={props.task.status === 2}
                   onChange={onIsDoneChanged}/>
            <EditeblSpan title={props.task.title}  onTitleChange={onTitleChange}/>
            <span> priority: <select onChange={onChangeSelected} value={priotityTitle} >
                <option value="0">Low </option>
                <option value="1">Middle</option>
                <option value="2">High</option>
                <option value="3">Urgently</option>
            </select></span>
            <button onClick={()=>props.deleteTask(props.task.id)}>X</button>

        </div>
    );

}
export default TodoListTask
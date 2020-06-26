import React from 'react';
import EditeblSpan from './EditeblSpan';

const TodoListTitle = (props) => {
    return (
        <>
            <EditeblSpan title={props.title} onTitleChange={props.changeTitle}/>
            <button onClick={props.deleteTodo}> X</button>
        </>
    );

}


export default TodoListTitle;
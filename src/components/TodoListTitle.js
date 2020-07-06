import React from 'react';
import EditeblSpan from './EditeblSpan';

const TodoListTitle = (props) => {
    return (
        <div className={'todolist-title'}>
            <EditeblSpan title={props.title}
                         onTitleChange={props.changeTitle}
                         deleteTodo={props.deleteTodo}/>
            <button onClick={props.deleteTodo}> X</button>
        </div>
    );

}


export default TodoListTitle;
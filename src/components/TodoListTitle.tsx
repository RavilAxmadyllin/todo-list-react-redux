import React from 'react';
import EditeblSpan from './EditeblSpan';

const TodoListTitle:React.FC<PropsType> = (props) => {
    return (
        <div className={'todolist-title'}>
            <EditeblSpan title={props.title}
                         onTitleChange={props.changeTitle}
                         />
            <button onClick={props.deleteTodo}> X </button>
        </div>
    );

}

export default TodoListTitle;

type PropsType = {
    title: string
    changeTitle: (title: string) => void
    deleteTodo: () => void
}

import React, {ChangeEvent, useState} from 'react';

const EditeblSpan:React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [state, setState] = useState(props.title)

    const activatedEditMode = () => {
        setEditMode(true)
    }
    const deactivatedEditMode = () => {
        setEditMode(false)
        props.onTitleChange(state)
    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.currentTarget.value)
    }
    return<>
        {editMode ? <input
                className={'input'}
                onBlur={deactivatedEditMode}
                onChange={onTitleChange}
                value={state}
                autoFocus={true}/>:
            <span className={'span-todo'} onDoubleClick={activatedEditMode}>
                {state}
            </span>
        }
    </>

}
export default EditeblSpan


type PropsType = {
    title: string
    onTitleChange: (title: string) => void
}

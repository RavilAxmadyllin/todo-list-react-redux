import React, {ChangeEvent} from 'react';


class AddNewItemForm extends React.Component<PropsType> {
    state = {
        error: false,
        value: ''
    }
    onAddItemClick = () => {
        let newText = this.state.value
        if (!newText.trim()) {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false,
                value: ''
            })
            this.props.addItem(newText);
        }
    };

    onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemClick()
        }
    }
    onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: e.currentTarget.value
        })
    }
    render = () => {
        return (
            <div className={this.props.className ? this.props.className : ''}>
                <input
                    type="text" placeholder="New task name"
                    value={this.state.value}
                    onChange={this.onTitleChange}
                    onKeyPress={this.onKeyPress}
                    className={this.state.error ? 'error input' : 'notError input'}
                />
                <button onClick={this.onAddItemClick}>+</button>
            </div>
        );
    }
}


export default AddNewItemForm;


type PropsType = {
    addItem: (title: string) => void
    className?: string
}

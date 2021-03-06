import React from 'react';

class TodoListFooter extends React.Component<PropsType> {
    state = {
        isHidden: true
    }
    onAllFilterClick = () => this.props.changeFilter('All');
    onCompletedFilterClick = () => this.props.changeFilter('Completed');
    onActiveFilterClick = () => this.props.changeFilter('Active');
    onShowFiltersClick = () => this.setState({isHidden: true});
    onHideFiltersClick = () => this.setState({isHidden: false});

    render = () => {
        let classForAll = this.props.filterValue === 'All' ? 'filter-active' : '';
        let classForCompleted = this.props.filterValue === 'Completed' ? 'filter-active' : '';
        let classForActive = this.props.filterValue === 'Active' ? 'filter-active' : '';
        return (
            <div className="todoList-footer">
                {!this.state.isHidden && <div>
                    <button
                        className={classForAll}
                        onClick={this.onAllFilterClick}>All
                    </button>
                    <button
                        className={classForCompleted}
                        onClick={this.onCompletedFilterClick}>Completed
                    </button>
                    <button
                        onClick={this.onActiveFilterClick}
                        className={classForActive}>Active
                    </button>
                </div>
                }
                {!this.state.isHidden && <span onClick={this.onShowFiltersClick}>hide</span>}
                {this.state.isHidden && <span onClick={this.onHideFiltersClick}>show</span>}
            </div>
        );
    }
}

export default TodoListFooter;

type PropsType = {
    changeFilter: (val: string) => void
    filterValue: string
}

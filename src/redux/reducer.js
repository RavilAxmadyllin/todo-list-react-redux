const ADD_TODO = "ADD_TODO"

const initialState = {
    todoLists: [
        {id: Math.random(), title:"today", task: [{id:Math.random(), title: 'CSS', isDone: false, priority: 'low'}]}
    ]
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            let tasks = {id:Math.random(), title: action.title, tasks:[]}
            return {
                ...state,
                todoLists: [...state.todoLists, tasks]
            }
    }
    return state
}


export const addTodoList = (title) =>({type:ADD_TODO, title})
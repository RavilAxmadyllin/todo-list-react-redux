import {api} from '../api/api';

// action types
const ADD_TODO = 'TodoList/Reducer/ADD_TODO'
const GET_TODOLIST = 'TodoList/Reducer/GET_TODOLIST'
const ADD_TASK = 'TodoList/Reducer/ADD_TASK'
const SET_TASKS = 'TodoList/Reducer/SET_TASKS'
const DELETE_TODOLIST = 'TodoList/Reducer/DELETE_TODOLIST'
const DELETE_TASK = 'TodoList/Reducer/DELETE_TASK'
const CHANGE_TASK = 'TodoList/Reducer/CHANGE_TASK'
const UPDATE_TITLE = 'TodoList/Reducer/UPDATE_TITLE'


const initialState = {
    todoLists: [
        // {id: Math.random(), title:'today', tasks: [{id:Math.random(), title: 'CSS', isDone: false, priority: 'low'}]},
        // {id: Math.random(), title:'tomorrow', tasks: []}
    ]
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TODOLIST:
            return {
                ...state,
                todoLists: action.todolists.map(tl => ({...tl, tasks:[]}))
            }
        case ADD_TODO:

            return {
                ...state,
                todoLists: [ action.newTodolist, ...state.todoLists]
            }
        case ADD_TASK:

            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if(tl.id === action.todoId){
                        return{
                            ...tl,
                            tasks:[action.tasks, ...tl.tasks]
                        }
                    }else return tl
                })
            }
        case SET_TASKS:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if(tl.id === action.todoId){
                        return {...tl, tasks: action.tasks}
                    }
                    return tl
                })
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(t => t.id !== action.id)
            }
        case DELETE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(todo => {
                    if(todo.id === action.todoId){
                        return{
                            ...todo,
                            tasks:todo.tasks.filter(t => t.id !== action.taskId)
                        }
                    }else return todo
                })
            }
        case CHANGE_TASK:
            return  {
                ...state,
                todoLists: state.todoLists.map(todo => {
                    if(todo.id === action.todoId){
                        return{
                            ...todo,
                            tasks:todo.tasks.map(t => {
                                if(t.id === action.taskId){

                                    return{
                                        ...t,
                                        ...action.obj
                                    }
                                }else return t
                            })
                        }
                    }else return todo
                })
            }
        case UPDATE_TITLE:return {
            ...state,
            todoLists: state.todoLists.map(tl => {
                if (tl.id === action.id){
                    return{...tl, title: action.title}
                }
                else return  tl

            })
        }
    }
    return state
}

// action creators
const addTodoSucces = (newTodolist) =>({type:ADD_TODO, newTodolist})
const getTodolistSucces = (todolists) => ({type: GET_TODOLIST, todolists})
const addTaskSucces = (todoId, tasks) =>({type:ADD_TASK, tasks, todoId})
const setTasksSucces = (todoId, tasks) => ({type: SET_TASKS, tasks, todoId})
const deleteTodoListSucces = (id) =>({type:DELETE_TODOLIST, id})
const deleteTaskSucces = (todoId, taskId) =>({type:DELETE_TASK, todoId, taskId})
export const changeTaskSucces = (todoId, taskId, obj) => ({type: CHANGE_TASK,todoId, taskId, obj})
const updateTitleTodolist = (title, id) => ({type: UPDATE_TITLE, title, id})
// =======
// thunk Creator
export const setTodoList = () => dispatch => {
    api.getTodolist().then(res => {
        dispatch(getTodolistSucces(res.data))
    })
}
export const addTodolist = (newTodo) => dispatch => {
    api.createTodolist(newTodo).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTodoSucces(res.data.data.item))
        }
    })
}
export const deleteTodolist = (id) => dispatch => {
    api.deleteTodolist(id).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTodoListSucces(id))
        }
    })
}
export const addTask = (todoId, title) => dispatch => {
    api.createTask(todoId, title).then(res =>{
        if (res.data.resultCode === 0){
            const {item} = res.data.data
            const {todoListId} = res.data.data.item
            dispatch(addTaskSucces(todoListId, item))
        }
    })
}
export const getTasks = (todoId) => dispatch =>{
    api.getTasks(todoId).then(res => {
        const allTasks = res.data.items;
        dispatch(setTasksSucces(todoId, allTasks))

    })
}
export const deleteTask = (todoId, taskId) => dispatch => {
    api.deleteTask(todoId, taskId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(deleteTaskSucces(todoId, taskId))
        }
    })
}
export const updateTask = (todolistId, taskId, task) =>(dispatch) =>{
    api.updateTask(todolistId, taskId, task).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(changeTaskSucces(todolistId, taskId, task))
        }
    })
}
export const updateTodoListTitle = (title, id) =>(dispatch) =>{
    api.updateTodolistTitle(title, id).then(res => {
        dispatch(updateTitleTodolist(title, id))

    })
}
// =======

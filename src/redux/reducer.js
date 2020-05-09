const ADD_TODO = 'ADD_TODO'
const ADD_TASK = 'ADD_TASK'
const DELETE_TODOLIST = 'DELETE_TODOLIST'
const DELETE_TASK = 'DELETE_TASK'
const CHANGE_TASK = 'CHANGE_TASK'

const initialState = {
    todoLists: [
        {id: Math.random(), title:'today', tasks: [{id:Math.random(), title: 'CSS', isDone: false, priority: 'low'}]},
        {id: Math.random(), title:'tomorrow', tasks: []}
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
        case ADD_TASK:
            let newTask = {id:Math.random(), title: action.title, isDone: false, priority: 'low'}
            return {
                ...state,
               todoLists: state.todoLists.map(t => {
                   if(t.id === action.todoID){
                       return{
                           ...t,
                           tasks:[...t.tasks, newTask]
                       }
                   }else return t

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
                    if(todo.id === action.todoID){
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
                    if(todo.id === action.todoID){
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
    }
    return state
}


export const addTodoList = (newText) =>({type:ADD_TODO, title:newText})
export const addTask = (title, todoID) =>({type:ADD_TASK, title, todoID})
export const deleteTodoList = (id) =>({type:DELETE_TODOLIST, id})
export const deleteTask = (todoID, taskId) =>({type:DELETE_TASK, todoID, taskId})
export const changeTask = (todoID, taskId, obj) => ({type: CHANGE_TASK,todoID, taskId, obj})
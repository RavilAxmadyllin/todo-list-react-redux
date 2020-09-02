import {api, TodolistType} from '../api/api';
import {Dispatch} from 'redux';

const initialState = {
    todoLists: []
};

export const reducer = (state: InitialStateType = initialState, action: ActionsTodolistType):InitialStateType => {
    switch (action.type) {
        case 'GET_TODOLIST':
            return {...state, todoLists: action.todolists.map(tl => ({...tl, tasks: []}))};
        case 'ADD_TODO':
            return {...state, todoLists: [action.newTodolist, ...state.todoLists]};
        case 'ADD_TASK':
            return {
                ...state,
                todoLists: state.todoLists
                    .map(tl => tl.id === action.todoId ?
                        {...tl, tasks: [action.task, ...tl.tasks]} : tl)
            };
        case 'SET_TASKS':
            return {
                ...state,
                todoLists: state.todoLists.map(tl => tl.id === action.todoId ?
                    {...tl, tasks: action.tasks} : tl)
            };
        case 'DELETE_TODOLIST':
            return {
                ...state,
                todoLists: state.todoLists.filter(t => t.id !== action.id)
            };
        case 'DELETE_TASK':
            return {
                ...state,
                todoLists: state.todoLists.map(todo => todo.id === action.todoId ?
                    {...todo, tasks: todo.tasks.filter(t => t.id !== action.taskId)} : todo)
            };
        case 'CHANGE_TASK':
            return {
                ...state,
                todoLists: state.todoLists.map(todo => todo.id !== action.todoId ?
                    todo :
                    {
                        ...todo, tasks: todo
                            .tasks
                            .map(t => t.id === action.taskId ?
                                {...t, ...action.obj} : t)
                    })
            };
        case 'UPDATE_TITLE':
            return {
                ...state,
                todoLists: state.todoLists.map(tl =>
                    tl.id === action.id ?
                        {...tl, title: action.title} : tl)
            };
        default:
            return state
    }
}

// action creators
const addTodoSuccess = (newTodolist: TodoType) => ({type: 'ADD_TODO', newTodolist} as const);
const getTodolistSuccess = (todolists: Array<TodolistType>) => ({type: 'GET_TODOLIST', todolists} as const);
const addTaskSuccess = (todoId: string, task: TaskType) => ({type: 'ADD_TASK', task, todoId} as const);
const setTasksSuccess = (todoId: string, tasks: Array<TaskType>) => ({type: 'SET_TASKS', tasks, todoId} as const);
const deleteTodoListSuccess = (id: string) => ({type: 'DELETE_TODOLIST', id} as const);
const deleteTaskSuccess = (todoId: string, taskId: string) => ({type: 'DELETE_TASK', todoId, taskId} as const);
export const changeTaskSucces = (todoId: string, taskId: string, obj: UpdateType) =>
    ({type: 'CHANGE_TASK', todoId, taskId, obj} as const);
const updateTitleTodolist = (title: string, id: string) => ({type: 'UPDATE_TITLE', title, id} as const);
// =======
// thunk Creator
export const setTodoList = () => async (dispatch: Dispatch) => {
    const result = await api.getTodolist();
    dispatch(getTodolistSuccess(result));
};
export const addTodolist = (title: string) => async (dispatch: Dispatch) => {
    const result = await api.createTodolist(title);
    dispatch(addTodoSuccess(result.data.item));
};
export const deleteTodolist = (id: string) => async (dispatch: Dispatch) => {
    await api.deleteTodolist(id);
    dispatch(deleteTodoListSuccess(id));
};
export const addTask = (todoId: string, title: string) => async (dispatch: Dispatch) => {
    const result = await api.createTask(todoId, title);
    const {item} = result.data;
    const {todoListId} = result.data.item;
    dispatch(addTaskSuccess(todoListId, item));
};
export const getTasks = (todoId: string) => async (dispatch: Dispatch) => {
    const result = await api.getTasks(todoId);
    dispatch(setTasksSuccess(todoId, result.items));
};
export const deleteTask = (todoId: string, taskId: string) => async (dispatch: Dispatch) => {
    await api.deleteTask(todoId, taskId);
    dispatch(deleteTaskSuccess(todoId, taskId));
};
export const updateTask = (todolistId: string, taskId: string, task: TaskType) => async (dispatch: Dispatch) => {
    await api.updateTask(todolistId, taskId, task);
    dispatch(changeTaskSucces(todolistId, taskId, task));
};
export const updateTodoListTitle = (title: string, id: string) => async (dispatch: Dispatch) => {
    await api.updateTodolistTitle(title, id);
    dispatch(updateTitleTodolist(title, id));
};
// =======

type ActionsTodolistType =
    ReturnType<typeof addTodoSuccess>
    | ReturnType<typeof getTodolistSuccess>
    | ReturnType<typeof addTaskSuccess>
    | ReturnType<typeof setTasksSuccess>
    | ReturnType<typeof deleteTodoListSuccess>
    | ReturnType<typeof deleteTaskSuccess>
    | ReturnType<typeof changeTaskSucces>
    | ReturnType<typeof updateTitleTodolist>


export type TodoType = {
    id:string
    title:string
    tasks: Array<TaskType>
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateType = {
    title?: string
    status?: number
}
type InitialStateType = {
    todoLists: Array<TodoType>
}

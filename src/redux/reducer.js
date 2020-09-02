import {api} from '../api/api';

// action types
const ADD_TODO = 'TodoList/Reducer/ADD_TODO';
const GET_TODOLIST = 'TodoList/Reducer/GET_TODOLIST';
const ADD_TASK = 'TodoList/Reducer/ADD_TASK';
const SET_TASKS = 'TodoList/Reducer/SET_TASKS';
const DELETE_TODOLIST = 'TodoList/Reducer/DELETE_TODOLIST';
const DELETE_TASK = 'TodoList/Reducer/DELETE_TASK';
const CHANGE_TASK = 'TodoList/Reducer/CHANGE_TASK';
const UPDATE_TITLE = 'TodoList/Reducer/UPDATE_TITLE';


const initialState = {
    todoLists: []
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TODOLIST:
            return {...state, todoLists: action.todolists.map(tl => ({...tl, tasks: []}))};
        case ADD_TODO:
            return {...state, todoLists: [action.newTodolist, ...state.todoLists]};
        case ADD_TASK:
            return {
                ...state,
                todoLists: state.todoLists
                    .map(tl => tl.id === action.todoId ?
                        {...tl, tasks: [action.tasks, ...tl.tasks]} : tl)
            };
        case SET_TASKS:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => tl.id === action.todoId ?
                    {...tl, tasks: action.tasks} : tl)
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.filter(t => t.id !== action.id)
            };
        case DELETE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map(todo => todo.id === action.todoId ?
                    {...todo, tasks: todo.tasks.filter(t => t.id !== action.taskId)} : todo)
            };
        case CHANGE_TASK:
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
        case UPDATE_TITLE:
            return {
                ...state,
                todoLists: state.todoLists.map(tl =>
                    tl.id === action.id ?
                        {...tl, title: action.title} : tl)
            };
        default: return state
    }
}


// action creators
const addTodoSuccess = (newTodolist) => ({type: ADD_TODO, newTodolist});
const getTodolistSuccess = (todolists) => ({type: GET_TODOLIST, todolists});
const addTaskSuccess = (todoId, tasks) => ({type: ADD_TASK, tasks, todoId});
const setTasksSuccess = (todoId, tasks) => ({type: SET_TASKS, tasks, todoId});
const deleteTodoListSuccess = (id) => ({type: DELETE_TODOLIST, id});
const deleteTaskSuccess = (todoId, taskId) => ({type: DELETE_TASK, todoId, taskId});
export const changeTaskSucces = (todoId, taskId, obj) => ({type: CHANGE_TASK, todoId, taskId, obj});
const updateTitleTodolist = (title, id) => ({type: UPDATE_TITLE, title, id});
// =======
// thunk Creator
export const setTodoList = () => async dispatch => {
    const result = await api.getTodolist();
    dispatch(getTodolistSuccess(result));
};
export const addTodolist = (newTodo) => async dispatch => {
    const result = await api.createTodolist(newTodo);
    dispatch(addTodoSuccess(result.data.item));
};
export const deleteTodolist = (id) => async dispatch => {
    await api.deleteTodolist(id);
    dispatch(deleteTodoListSuccess(id));
};
export const addTask = (todoId, title) => async dispatch => {
    const result = await api.createTask(todoId, title);
    const {item} = result.data;
    const {todoListId} = result.data.item;
    dispatch(addTaskSuccess(todoListId, item));
};
export const getTasks = (todoId) => async dispatch => {
    const result = await api.getTasks(todoId);
    dispatch(setTasksSuccess(todoId, result.items));
};
export const deleteTask = (todoId, taskId) => async dispatch => {
    await api.deleteTask(todoId, taskId);
    dispatch(deleteTaskSuccess(todoId, taskId));
};
export const updateTask = (todolistId, taskId, task) => async (dispatch) => {
    await api.updateTask(todolistId, taskId, task);
    dispatch(changeTaskSucces(todolistId, taskId, task));
};
export const updateTodoListTitle = (title, id) => async (dispatch) => {
    await api.updateTodolistTitle(title, id);
    dispatch(updateTitleTodolist(title, id));
};
// =======

import {applyMiddleware, combineReducers, createStore} from 'redux';
import {reducer} from "./reducer";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    todo: reducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))
export default store

export type RootStateType = ReturnType<typeof rootReducer>

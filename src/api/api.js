import  axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY' : 'ef3df34b-f620-4141-98a4-941ac190a9df'}
})

export const api = {
    getTodolist() {
        return instance.get('')
    },
    createTodolist(title) {
        return instance.post('', {title})
    },
    deleteTodolist(id) {
        return instance.delete(`/${id}`)
    },
    updateTodolistTitle(title, id) {
        return instance.put(`/${id}`, {title})
    },
    getTasks(id) {
        return instance.get(`/${id}/tasks`)
    },
    createTask(id, title) {
        return instance.post(`/${id}/tasks`, {title})
    },
    deleteTask(id, taskId) {
        return instance.delete(`/${id}/tasks/${taskId}`)
    },
    updateTask(id, taskId, task) {
        return instance.put(`/${id}/tasks/${taskId}`, task)
    }

}
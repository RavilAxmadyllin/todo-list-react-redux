import  axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY' : 'ef3df34b-f620-4141-98a4-941ac190a9df'}
})

export const api = {
   async getTodolist() {
        const result = await instance.get('')
       return result.data
    },
    async createTodolist(title) {
        const result = await instance.post('', {title})
        return result.data
    },
    async deleteTodolist(id) {
        const result = await instance.delete(`/${id}`)
    },
    async updateTodolistTitle(title, id) {
        const result = await instance.put(`/${id}`, {title})
        return result.data
    },
    async getTasks(id) {
        const result = await instance.get(`/${id}/tasks`)
        return result.data
    },
    async createTask(id, title) {
        const result = await instance.post(`/${id}/tasks`, {title})
        return result.data
    },
    async deleteTask(id, taskId) {
        const result = await instance.delete(`/${id}/tasks/${taskId}`)
        return result.data
    },
    async updateTask(id, taskId, task) {
        const result = await instance.put(`/${id}/tasks/${taskId}`, task)
        return result.data
    }

}

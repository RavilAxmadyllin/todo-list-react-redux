import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': 'ef3df34b-f620-4141-98a4-941ac190a9df'}
})

export const api = {
    async getTodolist() {
        const result = await instance.get<Array<TodolistType>>('')
        return result.data
    },
    async createTodolist(title: string) {
        const result = await instance.post<ResponseType<{item: TodolistType}>>('', {title})
        return result.data
    },
    async deleteTodolist(id: string) {
        await instance.delete<ResponseType<{}>>(`/${id}`)
    },
    async updateTodolistTitle(title: string, id: string) {
        const result = await instance.put<UpdateTodolistTitle>(`/${id}`, {title})
        return result.data
    },
    async getTasks(id: string) {
        const result = await instance.get<GetTasksResponseType>(`/${id}/tasks`)
        return result.data
    },
    async createTask(id: string, title: string) {
        const result = await instance.post(`/${id}/tasks`, {title})
        return result.data
    },
    async deleteTask(id: string, taskId: string) {
        const result = await instance.delete(`/${id}/tasks/${taskId}`)
        return result.data
    },
    async updateTask(id: string, taskId: string, task: TaskType) {
        const result = await instance.put(`/${id}/tasks/${taskId}`, task)
        return result.data
    }
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
export type TodolistType = {
    id: string
    addedDate: number
    order: number
    title: string
    tasks: Array<TaskType>
}
type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
type ResponseType<T> = {
    resultCode: number
    message: Array<string>
    data: T
}
type UpdateTodolistTitle = {
    title: string
}


import { defineStore } from 'pinia'
import Axios from '../composables/Axios'

export const useTodoStore = defineStore('todo', {
  state: () => {
    return {
      todos: [],
      loading: false,
      todo: {},
      submitting: false
    }
  },
  actions: {
    async getTodos() {
      this.loading = true
      try {
        const response = await Axios.get('todos')
        this.todos = response.data.todos
        return this.todos
      } catch (ex) {
        return Promise.reject(ex.response.statusText)
      } finally {
        this.loading = false
      }
    },
    async getTodo(id) {
      this.loading = true
      try {
        const response = await Axios.get(`todos/${id}`)
        this.todo = response.data.todo
        return this.todo
      } catch (ex) {
        return Promise.reject(ex.response.statusText)
      } finally {
        this.loading = false
      }
    },
    async updateTodo(id, todo) {
      this.submitting = true
      try {
        const response = await Axios.put(`todos/${id}`, todo)
        return response.data
      } catch (ex) {
        const error = { status: ex.response.status, message: ex.response.data.error }
        return Promise.reject(error)
      } finally {
        this.submitting = false
      }
    },
    async addTodo(todo) {
      this.submitting = true
      try {
        const response = await Axios.post(`todos/`, todo)
        return response.data
      } catch (ex) {
        const error = { status: ex.response.status, message: ex.response.data.error }
        return Promise.reject(error)
      } finally {
        this.submitting = false
      }
    },
    async deleteTodo(id) {
      this.submitting = true
      try {
        const response = await Axios.delete(`todos/${id}`)
        return response.data
      } catch (ex) {
        const error = { status: ex.response.status, message: ex.response.data.error }
        return Promise.reject(error)
      } finally {
        this.submitting = false
      }
    },
    async changeCompletedStatus(id, todo) {
      this.submitting = true
      try {
        const response = await Axios.put(`todos/completed/${id}`, todo)
        return response.data
      } catch (ex) {
        const error = { status: ex.response.status, message: ex.response.data.error }
        return Promise.reject(error)
      } finally {
        this.submitting = false
      }
    }
  },
  getters: {
    all_todos(state) {
      return state.todos.sort((a, b) => {
        // console.log(
        //   a.completed,
        //   b.completed,
        //   '=',
        //   a.id,
        //   b.id,
        //   '=',
        //   a.completed - b.completed || b.id - a.id
        // )
        return a.completed - b.completed || b.id - a.id
      })
    }
  }
})

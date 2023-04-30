import { defineStore } from 'pinia'
import Axios from '../composables/Axios'
import { setToken, removeToken, hasToken } from '../composables/Token'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isLoggedIn: false,
      name: null,
      id: null,
      email: null,
      loading: false
    }
  },
  actions: {
    async login(email, password) {
      const credentials = { email, password }
      this.loading = true
      try {
        const response = await Axios.post('login', credentials)
        this.name = response.data.user.name
        this.id = response.data.user.id
        this.email = response.data.user.email
        this.isLoggedIn = true
        return response.data.token
      } catch (ex) {
        const error = { status: ex.response.status, message: ex.response.data.error }
        return Promise.reject(error)
      } finally {
        this.loading = false
      }
    },
    async logout() {
      try {
        const response = await Axios.post('logout')
        this.isLoggedIn = false
        this.id = null
        this.name = null
        this.email = null
        return response.data
      } catch (ex) {
        const error = { status: ex.response.status, message: ex.response.data.message }
        return Promise.reject(error)
      }
    },
    setUserToken(token) {
      setToken(token)
    },
    removeUserToken() {
      removeToken()
    }
  },
  getters: {
    user_information(state) {
      return { isLoggedIn: state.isLoggedIn, name: state.name, id: state.id, email: state.email }
    }
  },
  persist: true
})

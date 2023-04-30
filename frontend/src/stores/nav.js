import { defineStore } from 'pinia'

export const useNavStatusStore = defineStore('nav', {
  state: () => {
    return { enableNav: false }
  },
  getters: {
    statusToggle(state) {
      return state.enableNav
    }
  },
  persist: true
})

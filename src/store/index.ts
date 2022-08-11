import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'musicData',
  state: () => {
    return {
      count: 0,
      showDetail: false
    }
  },
  getters: {
    
  },
  actions: {
    setCount() {
      console.log(123, this.count);
      
      this.count++
    },
    setShowDetail() {
      this.showDetail = true
    },
    setHideDetail() {
      this.showDetail = false
    }
  }
})

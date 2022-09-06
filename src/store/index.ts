import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'musicData',
  state: () => {
    return {
      count: 0,
      showDetail: false,
      loadingState: false,
      musicIDs: {},
      musicSrcData: 'http://m701.music.126.net/20220812174731/f9a93eddbbc05e2c8d4dcbd557a4acf3/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/1585173705/5971/e847/b42c/899049a82bc5990ebdd4710f233fe222.mp3'
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
    },
    setShowLoadingState() {
      this.loadingState = true
    },
    setHideLoadingState() {
      this.loadingState = false
    },
    setMusicSrc(src: string) {
      console.log(src);
      
      this.musicSrcData = src
    },
    setMusicIDArr(obj: {}) {
      this.musicIDs = obj
    }
  }
})

export function useMusicState() {
  return useCounterStore()
}
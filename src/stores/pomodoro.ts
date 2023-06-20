import { defineStore } from 'pinia'

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    pomodoro: localStorage.getItem('pomodoro')
      ? JSON.parse(localStorage.getItem('pomodoro')!)
      : {
          type: 'pomodoro',
          pomodoro: {
            time: 25
          },
          'short break': {
            time: 5
          },
          'long break': {
            time: 15
          },
          font: 'Kumbh Sans',
          color: '#F87070'
        }
  }),
  getters: {
    getCurrentTimer: (state) => {
      return state.pomodoro[state.pomodoro.type].time
    },
    getTimerByType: (state) => {
      return (type: string) => state.pomodoro[type].time
    }
  },
  actions: {
    setType(type: string) {
      this.pomodoro.type = type
      localStorage.setItem('pomodoro', JSON.stringify(this.pomodoro))
    },
    setFont(font: string) {
      this.pomodoro.font = font
      document.documentElement.style.fontFamily = font
    },
    setColor(color: string) {
      this.pomodoro.color = color
      document.documentElement.style.setProperty('--accent-clr', color)
    },
    setTimers(timer: Timer[]) {
      timer.map((element) => {
        this.pomodoro[element.name].time = element.time
      })
    }
  }
})

interface Timer {
  name: string
  time: number
}

<script setup lang="ts">
import { ref } from 'vue'
import { usePomodoroStore } from '@/stores/pomodoro'

import FontSelect from './FontSelect.vue'
import ColorSelect from './ColorSelect.vue'
import TimeSelect from './TimeSelect.vue'

const store = usePomodoroStore()
const showModal = ref(false)

const font = ref(store.pomodoro.font)
const color = ref(store.pomodoro.color)

const fontList = ['Kumbh Sans', 'Roboto Slab', 'Space Mono']
const colorList = ['#F87070', '#70F3F8', '#D881F8']
const timerList = [
  {
    name: 'pomodoro',
    time: store.getTimerByType('pomodoro')
  },
  {
    name: 'short break',
    time: store.getTimerByType('short break')
  },
  {
    name: 'long break',
    time: store.getTimerByType('long break')
  }
]

const updateDefaultFont = (selectedFont: string) => {
  font.value = selectedFont
}

const updateDefaultColor = (selectedColor: string) => {
  color.value = selectedColor
}

const updateTimer = (newTimer: { name: string; time: number }) => {
  const index = timerList.findIndex((item) => item.name === newTimer.name)

  timerList[index].time = newTimer.time
}

const submitSettings = () => {
  store.setColor(color.value)
  store.setFont(font.value)
  store.setTimers(timerList)

  localStorage.setItem('pomodoro', JSON.stringify(store.pomodoro))
}

const closeModal = () => {
  // Set default values for parameters
  font.value = store.pomodoro.font
  color.value = store.pomodoro.color

  // Close modal
  showModal.value = false
}
</script>

<template>
  <button class="pt-20 md:pt-36" @click="showModal = true">
    <svg class="h-7 w-7" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.0377 15.365L26.9653 17.682C27.2289 17.899 27.3053 18.2771 27.1318 18.578L24.3567 23.429C24.1833 23.73 23.8226 23.849 23.5104 23.73L20.0555 22.323C19.3409 22.883 18.5569 23.345 17.7106 23.702L17.1903 27.412C17.1348 27.741 16.8503 28 16.5034 28H10.9534C10.6065 28 10.3221 27.741 10.2666 27.412L9.74627 23.702C8.89991 23.345 8.11598 22.8761 7.40139 22.323L3.94648 23.73C3.63429 23.856 3.27358 23.73 3.10012 23.429L0.325071 18.578C0.15161 18.27 0.227967 17.892 0.491573 17.682L3.4192 15.365C3.36373 14.917 3.3221 14.462 3.3221 14C3.3221 13.538 3.36373 13.083 3.4192 12.635L0.491573 10.318C0.227967 10.101 0.15161 9.72302 0.325071 9.42199L3.10019 4.57099C3.27358 4.26996 3.63436 4.15098 3.94655 4.26996L7.40146 5.67697C8.11598 5.11699 8.89997 4.65499 9.74633 4.29799L10.2667 0.588001C10.3221 0.259022 10.6066 0 10.9535 0H16.5035C16.8504 0 17.1348 0.259022 17.1973 0.588001L17.7176 4.29799C18.564 4.65499 19.3479 5.12394 20.0625 5.67697L23.5174 4.26996C23.8296 4.14396 24.1903 4.26996 24.3637 4.57099L27.1388 9.42199C27.3123 9.72997 27.2359 10.108 26.9723 10.318L24.0377 12.635C24.0932 13.083 24.1348 13.538 24.1348 14C24.1348 14.462 24.0932 14.917 24.0377 15.365ZM8.87213 14C8.87213 16.709 11.0436 18.9 13.7285 18.9C16.4133 18.9 18.5848 16.7091 18.5848 14.0001C18.5848 11.2911 16.4133 9.10004 13.7285 9.10004C11.0436 9.10004 8.87213 11.291 8.87213 14Z"
          fill="#D7E0FF"
        />
      </g>
    </svg>
  </button>
  <div
    v-if="showModal"
    class="absolute left-0 top-0 grid h-full w-full place-items-center bg-modal"
  >
    <modal class="left-0 top-0 w-5/6 min-w-[327px] max-w-[540px] rounded-2xl bg-white">
      <div class="inline-flex w-full items-center justify-between px-6 pb-8 pt-6">
        <h1 class="m-0 text-m font-bold text-deepNavy md:text-xl">Settings</h1>
        <button @click="closeModal">
          <svg
            class="h-3.5 w-3.5"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.3639 2.0502L11.9497 0.635986L6.99995 5.58573L2.0502 0.635986L0.635986 2.0502L5.58573 6.99995L0.635986 11.9497L2.0502 13.3639L6.99995 8.41416L11.9497 13.3639L13.3639 11.9497L8.41416 6.99995L13.3639 2.0502Z"
                fill="#1E213F"
              />
            </g>
          </svg>
        </button>
      </div>
      <span class="mb-6 inline-block h-px w-full bg-[#E3E1E1]"></span>
      <div class="flex flex-col gap-6 px-6 pb-8">
        <div>
          <h2
            class="pb-5 text-center text-xs font-bold uppercase tracking-[0.26rem] text-deepNavy sm:text-left md:text-s md:tracking-[0.3125rem]"
          >
            Time (minutes)
          </h2>
          <ul
            class="m-auto flex w-[17.5rem] flex-col gap-y-2 pb-6 sm:m-0 sm:w-full sm:flex-row sm:justify-between"
          >
            <li
              class="flex flex-row items-center justify-between gap-y-2.5 sm:flex-col sm:items-start"
              v-for="item in timerList"
              :key="item.name"
            >
              <TimeSelect :name="item.name" :time="item.time" @time-updated="updateTimer" />
            </li>
          </ul>
        </div>
        <span class="inline-block h-px w-full bg-[#E3E1E1]"></span>
        <div class="flex flex-col items-center gap-y-5 sm:flex-row sm:justify-between">
          <h2
            class="text-xs font-bold uppercase tracking-[0.26rem] text-deepNavy md:text-s md:tracking-[0.3125rem]"
          >
            Font
          </h2>
          <ul class="inline-flex gap-6">
            <li v-for="item in fontList" :key="item">
              <FontSelect :font="item" :defaultFont="font" @font-selected="updateDefaultFont" />
            </li>
          </ul>
        </div>
        <span class="inline-block h-px w-full bg-[#E3E1E1]"></span>
        <div class="flex flex-col items-center gap-y-5 sm:flex-row sm:justify-between">
          <h2
            class="text-xs font-bold uppercase tracking-[0.26rem] text-deepNavy md:text-s md:tracking-[0.3125rem]"
          >
            Color
          </h2>
          <ul class="inline-flex gap-6">
            <li v-for="item in colorList" :key="item">
              <ColorSelect
                :color="item"
                :defaultColor="color"
                @color-selected="updateDefaultColor"
              />
            </li>
          </ul>
        </div>
      </div>
      <button
        class="relative mx-auto -mb-6 block rounded-3xl bg-coral px-12 py-4 text-base font-bold text-white before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-3xl before:content-[''] hover:cursor-pointer hover:before:bg-white/20"
        @click="submitSettings"
      >
        Apply
      </button>
    </modal>
  </div>
</template>

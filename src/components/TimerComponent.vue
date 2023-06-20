<script setup lang="ts">
import { usePomodoroStore } from '@/stores/pomodoro'
import { ref, onBeforeUnmount, computed, onMounted, onUnmounted, watch } from 'vue'

const MOBILE_SIZE = 768

const store = usePomodoroStore()
const currentTime = ref(store.getCurrentTimer)
const currentTimerType = computed(() => store.pomodoro.type)

// Default timer value
const timerId = ref()
const status = ref('start')

const windowWidth = ref(window.innerWidth)

// Circle progress bar parameters
const size = ref(338)
const strokeWidth = ref(12)
const progress = ref(100)
const step = ref(100 / (currentTime.value * 60))

// Time left
const timeRemain = ref(currentTime.value * 60)

// Start timer function
const startTimer = () => {
  progress.value = 0
  status.value = 'pause'
  timerId.value = setInterval(() => {
    timeRemain.value--

    progress.value += step.value

    if (timeRemain.value === 0) {
      clearInterval(timerId.value)
      status.value = 'restart'
    }
  }, 1000)
}

// Stop timer function
const stopTimer = () => {
  clearInterval(timerId.value)
  status.value = 'resume'
}

// Resume timer function
const resumeTimer = () => {
  status.value = 'pause'
  timerId.value = setInterval(() => {
    timeRemain.value--

    progress.value += step.value

    if (timeRemain.value === 0) {
      clearInterval(timerId.value)
      status.value = 'restart'
    }
  }, 1000)
}

// Restart timer function
const restartTimer = () => {
  // Get current time directly from the store in case if it was updated in process
  timeRemain.value = store.getCurrentTimer * 60
  step.value = 100 / (store.getCurrentTimer * 60)
  startTimer()
}

const progressData = computed(() => {
  let center = size.value / 2
  let radius = center - strokeWidth.value
  let arcLength = 2 * Math.PI * radius
  let arcOffset = arcLength * ((100 - progress.value) / 100)

  return { arcLength, arcOffset }
})

// Button handle function
const handleOnClick = () => {
  if (timeRemain.value === 0) {
    restartTimer()

    return
  }

  if (status.value === 'pause') {
    stopTimer()

    return
  }

  if (status.value === 'resume') {
    resumeTimer()

    return
  }

  startTimer()
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

const currentTimeString = computed(() => {
  const minutes = Math.floor(timeRemain.value / 60)
  const seconds = timeRemain.value % 60

  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
})

/**
 * When the type of timer is changed:
 *  - set default timer parameters
 *  - reset status
 *  - reset progress
 *  - stop timer
 */
watch(currentTimerType, () => {
  currentTime.value = store.getCurrentTimer
  status.value = 'start'

  timeRemain.value = currentTime.value * 60
  progress.value = 100
  step.value = 100 / (currentTime.value * 60)

  clearInterval(timerId.value)
})

watch(windowWidth, () => {
  if (windowWidth.value < MOBILE_SIZE) {
    if (size.value !== 248 || strokeWidth.value !== 8) {
      size.value = 248
      strokeWidth.value = 8
    }
  } else {
    if (size.value !== 338 || strokeWidth.value !== 12) {
      size.value = 338
      strokeWidth.value = 12
    }
  }
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  clearInterval(timerId.value)
  window.removeEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div
    class="timer grid h-[18.75rem] w-[18.75rem] place-items-center rounded-full md:h-[25.625rem] md:w-[25.625rem]"
  >
    <div
      class="relative grid h-[16.75rem] w-[16.75rem] place-items-center rounded-full bg-deepNavy md:h-[22.875rem] md:w-[22.875rem]"
    >
      <svg
        class="svg-pi h-[15.5rem] w-[15.5rem] -rotate-90 rounded-full md:h-[21.1875rem] md:w-[21.1875rem]"
      >
        <circle
          class="svg-pi-indicator stroke-accent"
          :style="
            'stroke-dashoffset: ' +
            progressData.arcOffset +
            'px; ' +
            'stroke-dasharray: ' +
            progressData.arcLength +
            'px'
          "
        />
      </svg>
      <button class="group absolute flex flex-col items-center" @click="handleOnClick">
        <span
          class="text-3xl text-paleBlue md:text-4xl"
          :style="{
            'letter-spacing':
              windowWidth < MOBILE_SIZE
                ? store.pomodoro.font === 'Kumbh Sans'
                  ? '-0.25rem'
                  : store.pomodoro.font === 'Roboto Slab'
                  ? 'normal'
                  : '-0.625rem'
                : store.pomodoro.font === 'Kumbh Sans'
                ? '-0.3125rem'
                : store.pomodoro.font === 'Roboto Slab'
                ? 'normal'
                : '-0.625rem',
            'font-weight': store.pomodoro.font === 'Space Mono' ? 'normal' : 'bold'
          }"
        >
          {{ currentTimeString }}
        </span>
        <span
          class="test-sm font-bold uppercase tracking-[0.85rem] text-paleBlue group-hover:text-accent md:text-base md:tracking-[0.9375rem]"
        >
          {{ status }}
        </span>
      </button>
    </div>
  </div>
</template>

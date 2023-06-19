<script setup lang="ts">
import { onMounted } from 'vue'
import { usePomodoroStore } from '@/stores/pomodoro'

import RadioSelect from './components/RadioSelect.vue'
import SettingsModal from './components/SettingsModal.vue'
import TimerComponent from './components/TimerComponent.vue'

const store = usePomodoroStore()

onMounted(() => {
  document.documentElement.style.setProperty('--accent-clr', store.pomodoro.color)
  document.documentElement.style.fontFamily = store.pomodoro.font
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center pb-24 pt-20 md:pb-14 md:pt-12">
    <h1 class="m-0 pb-12 font-KumbhSans text-large font-bold text-paleBlue md:text-2xl">
      pomodoro
    </h1>
    <nav class="pb-[6.25rem]">
      <RadioSelect />
    </nav>
    <TimerComponent />
    <SettingsModal />
  </div>
</template>

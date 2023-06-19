<script setup lang="ts">
import { usePomodoroStore } from '@/stores/pomodoro'

const store = usePomodoroStore()
const type = store.pomodoro.type

const timerList = ['pomodoro', 'short break', 'long break']
</script>

<template>
  <ul class="inline-flex items-center rounded-[2rem] bg-deepNavy p-2">
    <li v-for="item in timerList" :key="item" class="flex">
      <input
        type="radio"
        name="timer"
        :id="item"
        class="peer hidden"
        :checked="type === item"
        @click="store.setType(item)"
      />
      <label
        :for="item"
        class="rounded-3xl px-6 py-4 text-xs font-bold text-paleBlue/40 hover:cursor-pointer peer-checked:bg-accent peer-checked:text-midnightBlue md:text-sm"
      >
        {{ item }}
      </label>
    </li>
  </ul>
</template>

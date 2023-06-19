<script setup lang="ts">
import { defineProps, ref } from 'vue'

const emit = defineEmits<{
  (e: 'time-updated', value: { name: string; time: number }): void
}>()

const props = defineProps({
  time: { type: Number, required: true },
  name: { type: String, required: true }
})

const localTimer = ref(props.time)

const handleInput = (event: Event) => {
  const inputValue = parseInt((event.target as HTMLInputElement).value, 10)

  if (inputValue <= 0) {
    localTimer.value = 1

    emit('time-updated', { name: props.name, time: localTimer.value })
  } else {
    localTimer.value = inputValue

    emit('time-updated', { name: props.name, time: localTimer.value })
  }
}
</script>

<template>
  <label :for="props.name + '-settings'" class="text-xs font-bold text-midnightBlue/40">{{
    props.name
  }}</label>
  <div class="flex h-10 w-36 items-center justify-between rounded-xl bg-frost px-4">
    <input
      class="w-24 bg-transparent text-sm font-bold outline-none"
      type="number"
      :id="props.name + '-settings'"
      :value="localTimer"
      pattern="^[0-9]*$"
      @input="handleInput"
    />
    <div class="flex flex-col gap-2.5">
      <button
        @click="
          $emit('time-updated', {
            name: props.name,
            time: ++localTimer
          })
        "
      >
        <svg class="h-2 w-3.5" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            class="opacity-25 hover:opacity-100"
            d="M1 6L7 2L13 6"
            stroke="#1E213F"
            stroke-width="2"
          />
        </svg>
      </button>
      <button
        @click="
          $emit(
            'time-updated',
            (() => {
              if (localTimer <= 0) {
                localTimer = 1

                return {
                  name: props.name,
                  time: localTimer
                }
              }

              return {
                name: props.name,
                time: --localTimer
              }
            })()
          )
        "
      >
        <svg class="h-2 w-3.5" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            class="opacity-25 hover:opacity-100"
            d="M1 1L7 5L13 1"
            stroke="#1E213F"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

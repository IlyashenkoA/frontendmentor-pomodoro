<script setup lang="ts">
const props = defineProps({
  defaultColor: { type: String, required: true },
  color: { type: String, required: true }
})
</script>

<template>
  <input
    type="radio"
    name="color"
    :id="props.color"
    class="peer hidden"
    :checked="props.color === props.defaultColor"
    @click="$emit('color-selected', props.color)"
  />
  <label
    :for="props.color"
    class="grid h-10 w-10 place-items-center rounded-full hover:cursor-pointer"
    :style="'background-color:' + props.color"
  >
    <span v-if="props.color === props.defaultColor">
      <svg class="h-3 w-4" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 5.5L4.95263 9.45263L13.4053 1" stroke="#161932" stroke-width="2" />
      </svg>
    </span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  defaultFont: { type: String, required: true },
  font: { type: String, required: true }
})
</script>

<template>
  <input
    type="radio"
    name="font"
    :id="props.font"
    class="peer hidden"
    :checked="props.font === props.defaultFont"
    @click="$emit('font-selected', props.font)"
  />
  <label
    :for="props.font"
    class="text-midnightBLue grid h-10 w-10 place-items-center rounded-full bg-frost font-normal opacity-70 hover:cursor-pointer peer-checked:bg-deepNavy peer-checked:text-white peer-checked:opacity-100"
    :style="{
      'font-family': props.font,
      'font-weight': props.font === 'Kumbh Sans' || props.font === 'Space Mono' ? '700' : '400'
    }"
  >
    Aa
  </label>
</template>

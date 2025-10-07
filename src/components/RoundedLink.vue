<script setup lang="ts">
import NerdIcon from './NerdIcon.vue'

const props = defineProps({
  nerdIconClass: { type: String, required: true },
  text: { type: String, required: true },
  to: { type: String, required: true },
})
</script>

<template>
  <RouterLink
    :to="props.to"
    class="flex items-center gap-2 px-2 py-1 rounded-2xl transition bg-neutral-300 hover:bg-neutral-400 hover:text-white"
  >
    <NerdIcon :icon-class="props.nerdIconClass" />
    {{ props.text }}
  </RouterLink>
</template>

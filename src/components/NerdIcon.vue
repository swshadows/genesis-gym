<script setup lang="ts">
const props = defineProps({
  iconClass: { type: String, required: true },
})
</script>

<template>
  <i class="nf" :class="props.iconClass"></i>
</template>

<script setup lang="ts">
import RoundedLink from '@/components/RoundedLink.vue'
</script>

<template>
  <div class="h-full grid place-items-center">
    <div class="flex flex-col gap-2 items-center">
      <h1 class="text-2xl font-bold">👋 Bem-vindo.</h1>
      <h2 class="text-md font-bold text-neutral-600">Escolha uma opção:</h2>
      <RoundedLink text="Planejador" to="/planner" nerd-icon-class="nf-md-view_grid_plus" />
    </div>
  </div>
</template>

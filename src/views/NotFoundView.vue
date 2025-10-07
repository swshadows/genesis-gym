<script setup lang="ts">
import NerdIcon from '@/components/NerdIcon.vue'
import RoundedLink from '@/components/RoundedLink.vue'
</script>

<template>
  <div class="w-full h-full grid place-items-center">
    <div class="flex flex-col gap-2 items-center">
      <NerdIcon icon-class="nf-md-emoticon_dead" class="text-6xl text-red-500" />
      <h1 class="text-neutral-600 text-2xl font-bold">Página não encontrada</h1>
      <RoundedLink text="Voltar" to="/" nerd-icon-class="nf-md-home" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import NerdIcon from './components/NerdIcon.vue'

const route = useRoute()

const now = new Date()
</script>

<template>
  <header class="h-12 flex items-center justify-between px-2 bg-black">
    <RouterLink
      v-if="route.path !== '/'"
      to="/"
      class="rounded-full bg-white border border-neutral-300 w-8 h-8 grid place-items-center hover:bg-black hover:text-white transition cursor-pointer"
      ><NerdIcon icon-class="nf-md-home"
    /></RouterLink>
    <RouterLink
      class="flex ml-auto rounded-2xl bg-white border border-neutral-300 gap-2 items-center px-2 py-1 hover:bg-black hover:text-white transition cursor-pointer"
      to="/config"
    >
      <NerdIcon icon-class="nf-md-cog" />
      Configurações
    </RouterLink>
  </header>
  <main class="w-full h-full overflow-y-auto">
    <RouterView />
  </main>
  <footer class="h-12 flex items-center justify-between px-2 bg-black text-white">
    <div class="flex items-center gap-2">
      <img class="h-8" src="/favicon.png" />
      <span>Academia Genesis</span>
    </div>
    <span class="flex gap-2 items-center">
      <span>{{ now.toLocaleDateString('pt-BR', { dateStyle: 'full' }) }}</span>
      <NerdIcon icon-class="nf-md-calendar" />
    </span>
  </footer>
</template>

<script setup lang="ts">
import NerdIcon from '@/components/NerdIcon.vue'
import { getConfig, saveConfig } from '@/utils/configManager'
import { onMounted, reactive } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const inputs = reactive({
  name: '',
  phone: '',
  cref: '',
  address: '',
  socialLinks: [''] as string[],
})

onMounted(() => {
  const data = getConfig()
  const { name = '', phone = '', cref = '', address = '', socialLinks = [''] } = data

  inputs.name = name
  inputs.phone = phone
  inputs.cref = cref
  inputs.address = address
  inputs.socialLinks = socialLinks
})

function saveData() {
  saveConfig({
    name: inputs.name,
    phone: inputs.phone,
    cref: inputs.cref,
    address: inputs.address,
    socialLinks: inputs.socialLinks,
  })
  toast.success('Configurações salvas com sucesso')
}
</script>

<template>
  <div class="p-2">
    <h1 class="text-2xl font-bold flex items-center gap-2 justify-center mb-2">
      <NerdIcon icon-class="nf-md-cog" />
      Configurações
    </h1>
    <div class="w-1/2 mx-auto flex flex-col gap-2">
      <label>
        <h2 class="lab">Nome</h2>
        <input
          type="text"
          placeholder="Digite seu nome"
          v-model="inputs.name"
          @keyup.enter="saveData"
        />
      </label>

      <label>
        <h2 class="lab">CREF</h2>
        <input
          type="text"
          placeholder="Digite seu CREF"
          v-model="inputs.cref"
          @keyup.enter="saveData"
        />
      </label>

      <label>
        <h2 class="lab">Telefone</h2>
        <input
          type="text"
          placeholder="Digite seu telefone"
          v-model="inputs.phone"
          @keyup.enter="saveData"
        />
      </label>

      <label>
        <h2 class="lab">Endereço</h2>
        <input
          type="text"
          placeholder="Digite seu endereço"
          v-model="inputs.address"
          @keyup.enter="saveData"
        />
      </label>

      <div class="flex flex-col gap-2">
        <label v-for="(link, index) in inputs.socialLinks" :key="index">
          <h2 class="lab">Link {{ index + 1 }}</h2>
          <input
            type="text"
            placeholder="Digite seu link"
            v-model="inputs.socialLinks[index]"
            @keyup.enter="saveData"
          />
        </label>

        <div class="grid grid-cols-2 gap-1">
          <button
            class="bg-green-500 hover:bg-green-600 rounded-xl cursor-pointer transition hover:text-white"
            @click="inputs.socialLinks.push('')"
          >
            <NerdIcon icon-class="nf-fa-plus" /> Adicionar link
          </button>
          <button
            class="bg-red-400 hover:bg-red-500 rounded-xl cursor-pointer transition hover:text-white"
            @click="inputs.socialLinks.pop()"
            :disabled="inputs.socialLinks.length === 1"
          >
            <NerdIcon icon-class="nf-fa-minus" /> Remover link
          </button>
        </div>
      </div>

      <button
        class="flex items-center justify-center gap-2 bg-blue-400 text-white px-2 py-1 rounded-lg w-full transition hover:bg-blue-500 cursor-pointer"
        @click="saveData"
      >
        <NerdIcon icon-class="nf-md-zip_disk" /> Salvar
      </button>
    </div>
  </div>
</template>

<style scoped>
@reference '@/base.css';

label {
  @apply flex flex-col items-center gap-2;
}

h2.lab {
  @apply text-xl italic text-neutral-600;
}

input[type='text'] {
  @apply w-full;
}
</style>

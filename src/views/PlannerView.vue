<script setup lang="ts">
import ModalComponent from '@/components/ModalComponent.vue'
import NerdIcon from '@/components/NerdIcon.vue'
import { getConfig } from '@/utils/configManager'
import { computed, reactive } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const lsData = getConfig()

const days = {
  mon: 'Segunda-feira',
  tue: 'Terça-feira',
  wed: 'Quarta-feira',
  thu: 'Quinta-feira',
  fri: 'Sexta-feira',
  sat: 'Sábado',
  sun: 'Domingo',
}
type Exercise = {
  name: string
  reps: number
  sets: number
}

const exercises = reactive({
  mon: [] as Exercise[],
  tue: [] as Exercise[],
  wed: [] as Exercise[],
  thu: [] as Exercise[],
  fri: [] as Exercise[],
  sat: [] as Exercise[],
  sun: [] as Exercise[],
})

const inputs = reactive({
  showModal: false,
  choosenDays: {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  },
  name: '',
  reps: null as number | null,
  sets: null as number | null,
})

function addExerciseToDay() {
  if (Object.values(inputs.choosenDays).every((v) => !v)) {
    return toast.error('Selecione pelo menos um dia')
  }

  if (!inputs.name) {
    return toast.error('Digite o nome do exercício')
  }

  if (!inputs.reps) {
    return toast.error('Digite o número de repetições')
  }

  if (!inputs.sets) {
    return toast.error('Digite o número de séries')
  }

  Object.entries(inputs.choosenDays).forEach(([k, v]) => {
    if (v)
      exercises[k as keyof typeof exercises].push({
        name: inputs.name,
        reps: inputs.reps || 0,
        sets: inputs.sets || 0,
      })
  })

  inputs.showModal = false
  inputs.name = ''
  inputs.reps = null
  inputs.sets = null
}

const blobData = computed(() => {
  if (Object.values(exercises).every((exer) => exer.length === 0)) {
    return null
  }

  let html = ''
  Object.entries(exercises).forEach(([key, value]) => {
    if (value.length > 0) {
      html += `<h1>${days[key as keyof typeof days]}</h1>`
      html += `<table><tr><th>Nome</th><th>Séries</th><th>Repetições</th></tr>`
      value.forEach((exer) => {
        html += `<tr><td>${exer.name}</td><td>${exer.sets}</td><td>${exer.reps}</td></tr>`
      })
      html += '</table>'
    }
  })
  const { name = '', phone = '', cref = '', address = '' } = lsData || {}
  const footerIsValid = name && phone && cref && address
  const footer = footerIsValid
    ? `
   <footer class="print-footer">
      <p>Instrutor ${name}, CREF ${cref}</p>
      <p>${phone} — ${address}</p>
    </footer>
  `
    : ''

  return `
    <!doctype html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" href="${window.location.origin}/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Plano de Treino</title>
      <style>
          * { box-sizing: border-box; }
          body { font-family: monospace; font-size: 12pt; line-height: 1.4; color: #222; margin: 20mm; }
          h1 { font-size: 18pt; text-align: center; font-weight: 600; margin: 0.5em 0; color: #249fd9; }
          table { width: 90%; border-collapse: collapse; margin: 1em 0; page-break-inside: avoid; margin: 0 auto; }
          th, td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; vertical-align: top; }
          th { background: #f5f5f5; font-weight: bold; }
          h1, h2 { page-break-after: avoid; }
          tr { page-break-inside: avoid; }

          @media print {
            body { margin: 10mm; }
            .print-footer {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              text-align: center;
              font-size: 12px;
              color: #555;
              border-top: 1px solid #aaa;
              padding: 5px 0;
            }
            .content { padding-bottom: 50px; }
          }
        }
      </style>
    </head>
    <body style="width: 210mm; height: 297mm; margin: 0;">
      <div class="content">${html}</div>
      ${footer}
      <img style="position: fixed; bottom: 0; right: 0; height: 50px" src="${window.location.origin}/favicon.png" />
    <script>
      window.addEventListener('load', () => {
        window.print()
      });
    <\/script>
    </body>

    </html>
    `
})

function blobExport() {
  if (blobData.value === null) {
    return toast.warning('Nenhum exercício adicionado')
  }
  const blob = new Blob([blobData.value], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank', 'noopener,noreferrer')
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}
</script>

<template>
  <div class="p-2">
    <div class="flex flex-col gap-2 items-center">
      <button
        v-if="blobData !== null"
        @click="blobExport"
        class="flex items-center gap-2 bg-blue-400 text-white px-2 py-1 rounded-2xl transition hover:bg-blue-500 cursor-pointer"
      >
        <NerdIcon icon-class="nf-md-download" />Exportar
      </button>

      <button
        class="mx-auto flex items-center gap-2 border self-start border-neutral-300 bg-emerald-200 hover:bg-emerald-300 px-2 py-1 rounded-md transition cursor-pointer"
        @click="inputs.showModal = true"
      >
        <NerdIcon icon-class="nf-md-plus" style="font-size: 10px" /> Adicionar novo exercício
      </button>

      <template v-for="(value, key) in exercises" :key="key">
        <template v-if="value.length !== 0">
          <h2 class="font-bold text-3xl text-neutral-500">{{ days[key] }}</h2>
          <small>{{ exercises[key].length }} exercicio(s)</small>
          <div class="w-full grid grid-cols-4 gap-2">
            <div
              v-for="(exer, index) in exercises[key]"
              :key="index"
              class="relative flex flex-col gap-2 border border-neutral-300 rounded-md p-2"
            >
              <button
                @click="exercises[key].splice(index, 1)"
                class="absolute top-2 right-2 rounded-full w-5 h-5 text-white bg-red-400 hover:bg-red-500 transition cursor-pointer grid place-items-center"
              >
                <NerdIcon icon-class="nf-fa-xmark" style="font-size: 0.5rem" />
              </button>
              <label class="flex flex-col items-center">
                <span class="font-bold text-neutral-600">Nome</span>
                <input type="text" v-model="exer.name" class="w-full" />
              </label>

              <label class="flex flex-col items-center">
                <span class="font-bold text-neutral-600">Séries</span>
                <input type="text" v-model="exer.sets" class="w-full" />
              </label>

              <label class="flex flex-col items-center">
                <span class="font-bold text-neutral-600">Repetições</span>
                <input type="text" v-model="exer.reps" class="w-full" />
              </label>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>

  <ModalComponent
    v-if="inputs.showModal"
    @close="inputs.showModal = false"
    body-classes="w-3/4 h-max px-2 py-1"
  >
    <h2 class="text-center font-bold text-2xl">Adicionando novo exercicio</h2>

    <label class="flex flex-col gap-2 items-center">
      <span>Nome do exercicio</span>
      <input
        type="text"
        class="w-full bg-white"
        placeholder="Digite o nome do exercício"
        v-model="inputs.name"
        @keyup.enter="addExerciseToDay"
      />
    </label>

    <div class="grid grid-cols-2 gap-2">
      <label class="flex flex-col gap-2 items-center">
        <span>Séries</span>
        <input
          type="number"
          class="w-full bg-white"
          placeholder="Digite a quantidade de séries"
          v-model="inputs.sets"
          @keyup.enter="addExerciseToDay"
        />
      </label>
      <label class="flex flex-col gap-2 items-center">
        <span>Repetições</span>
        <input
          type="number"
          class="w-full bg-white"
          placeholder="Digite a quantidade de repetições"
          v-model="inputs.reps"
          @keyup.enter="addExerciseToDay"
        />
      </label>
    </div>

    <div class="grid grid-cols-7 gap-2 mt-2">
      <label v-for="(value, key) in inputs.choosenDays" :key="key" class="flex gap-2 items-center">
        <input type="checkbox" v-model="inputs.choosenDays[key]" />
        <span>{{ days[key] }}</span>
      </label>
    </div>

    <button
      class="flex items-center justify-center gap-2 mt-2 w-full border border-neutral-300 bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded-md transition cursor-pointer"
      @click="addExerciseToDay"
    >
      <NerdIcon icon-class="nf-fa-plus" style="font-size: 10px" />
      Adicionar
    </button>
  </ModalComponent>
</template>

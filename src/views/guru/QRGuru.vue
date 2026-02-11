<template>
  <LayoutMobile>
    <div class="flex flex-col min-h-screen bg-background-light">

      <!-- HEADER -->
      <header class="flex items-center justify-between sticky top-0 z-10
               bg-white px-4 py-3 border-b border-primary/10">

        <button @click="goBack" class="size-11 flex items-center justify-center text-primary">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>

        <h2 class="font-bold text-primary text-lg">Generate QR</h2>

        <span class="material-symbols-outlined text-primary/40">
          info
        </span>
      </header>

      <!-- CLASS INFO -->
      <section class="text-center px-6 pt-8 pb-4">
        <h1 class="text-2xl font-extrabold text-primary">
          Mathematics • 10A
        </h1>

        <p class="text-sm text-primary/60 mt-2">
          Monday, 25 Oct | 09:41 AM
        </p>
      </section>

      <!-- QR CONTAINER -->
      <section class="flex-1 flex flex-col items-center justify-center px-6">

        <div class="relative w-full max-w-[320px] aspect-square
               bg-white rounded-2xl shadow-lg
               flex items-center justify-center p-8 border-4 border-primary/5">

          <!-- QR IMAGE -->
          <img v-if="sesi.qr_image" :src="sesi.qr_image" alt="QR Code" class="w-full h-full object-contain" />

          <div v-else class="w-full h-full bg-slate-200 rounded-lg flex items-center justify-center text-primary/40">
            QR HERE
          </div>

          <!-- FRAME CORNERS -->
          <div class="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
          <div class="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
          <div class="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
          <div class="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
        </div>

        <p class="text-sm text-primary/60 mt-6 text-center px-4">
          {{ sesi.qr_token }}
        </p>
        <p class="text-sm text-primary/60 mt-6 text-center px-4">
          Arahkan kamera siswa ke QR untuk presensi otomatis.
        </p>
      </section>

      <!-- PROGRESS -->
      <section class="px-6 space-y-3">
        <div class="flex justify-between text-sm font-semibold text-primary">
          <span>Dynamic Security</span>
          <span>Refresh 12s</span>
        </div>

        <div class="h-2 rounded-full bg-primary/20 overflow-hidden">
          <div class="h-full bg-primary w-2/3"></div>
        </div>
      </section>

      <!-- ACTION BUTTONS -->
      <section class="p-6 space-y-3">
        <button class="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg active:scale-95">
          Finish Session
        </button>

        <button
          class="w-full bg-white border-2 border-primary/10 text-primary/70 py-4 rounded-xl font-semibold active:scale-95">
          Download PDF
        </button>
      </section>

    </div>
  </LayoutMobile>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LayoutMobile from '@/layouts/LayoutMobile.vue'

const router = useRouter()
const sesi = ref({})

const goBack = () => router.back()

onMounted(() => {
  const data = localStorage.getItem('sesi')
  if (data) {
    sesi.value = JSON.parse(data)
  }
})
</script>

<template>
  <ion-page>
    <LayoutMobile>
      <div class="flex flex-col h-screen bg-background-light">

        <!-- HEADER -->
        <header class="flex items-center justify-between sticky top-0 z-10
                       bg-white px-4 py-3 border-b border-primary/10">

          <button @click="goBack" class="size-11 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>

          <h2 class="font-bold text-primary text-lg">
            QR Absensi
          </h2>

          <span class="material-symbols-outlined text-primary/40">
            qr_code
          </span>

        </header>

        <!-- INFO -->
        <section class="text-center px-6 pt-6 pb-4">

          <h1 class="text-2xl font-extrabold text-primary">
            Sesi {{ sesi.tipe }}
          </h1>

          <p class="text-sm text-primary/60 mt-1">
            {{ currentDateTime }}
          </p>

        </section>

        <!-- QR -->
        <section class="flex flex-col items-center px-6">

          <div class="relative w-full max-w-[320px] aspect-square
                      bg-white rounded-3xl shadow-lg
                      flex items-center justify-center p-6
                      border-4 border-primary/10">

            <img v-if="sesi.qr_image" :src="sesi.qr_image" class="w-full h-full object-contain" />

            <div v-else class="w-full h-full bg-slate-200 rounded-lg
                     flex items-center justify-center
                     text-primary/40 font-semibold">

              QR Loading...

            </div>

          </div>

          <p class="text-sm text-primary/60 mt-4 font-mono">
            {{ sesi.qr_token }}
          </p>

          <p class="text-xs text-primary/50 mt-1 text-center">
            Murid scan QR untuk melakukan absensi
          </p>

        </section>

        <!-- LIST MURID -->
        <section class="flex-1 px-6 mt-6 overflow-y-auto">

          <div class="flex justify-between mb-3 text-sm font-semibold">
            <span>Total: {{ muridList.length }}</span>
            <span class="text-green-500">
              Hadir: {{ countBy('hadir') }}
            </span>
            <span class="text-slate-400">
              Belum: {{ countBelum }}
            </span>
          </div>

          <div class="space-y-2 pb-4">

            <div v-for="m in muridList" :key="m.id" class="flex justify-between items-center
                     bg-white rounded-xl p-3 border border-slate-100">

              <span class="font-medium">
                {{ m.name }}
              </span>

              <span :class="{
                'text-green-500 font-semibold': m.status === 'hadir',
                'text-blue-500 font-semibold': m.status === 'izin',
                'text-yellow-500 font-semibold': m.status === 'sakit',
                'text-red-500 font-semibold': m.status === 'alpha',
                'text-slate-400': !m.status
              }">

                {{ m.status ?? 'Belum Absen' }}

              </span>

            </div>

          </div>

        </section>

      </div>
    </LayoutMobile>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { IonPage } from '@ionic/vue'
import { useRouter } from 'vue-router'
import LayoutMobile from '@/layouts/LayoutMobile.vue'
import api from '@/services/api'

const router = useRouter()
const goBack = () => router.back()

const sesi = ref({})
const muridList = ref([])

const loadMuridSesi = async () => {
  try {

    const res = await api.get(`/sesi/${sesi.value.sesi_id}/murid`)
    muridList.value = res.data.data

  } catch (err) {

    console.error(err)

  }
}

onMounted(() => {

  const data = localStorage.getItem('sesi')

  if (data) {

    sesi.value = JSON.parse(data)

    loadMuridSesi()

    setInterval(loadMuridSesi, 5000)

  }

})

const countBy = (status) =>
  muridList.value.filter(m => m.status === status).length

const countBelum = computed(() =>
  muridList.value.filter(m => !m.status).length
)

const currentDateTime = computed(() => {

  const now = new Date()

  return now.toLocaleString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })

})
</script>
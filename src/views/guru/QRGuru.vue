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

          <h2 class="font-bold text-primary text-lg">Generate QR</h2>

          <span class="material-symbols-outlined text-primary/40">
            info
          </span>
        </header>

        <!-- CLASS INFO -->
        <section class="text-center px-6 pt-6 pb-4">
          <h1 class="text-2xl font-extrabold text-primary">
            {{ sesi.jadwal?.mapel_name || 'Mathematics' }} • {{ sesi.jadwal?.kelas_name || '10A' }}
          </h1>
          <p class="text-sm text-primary/60 mt-1">
            {{ currentDateTime }}
          </p>
        </section>

        <!-- QR CONTAINER -->
        <section class="flex-none flex flex-col items-center justify-center px-6">
          <div class="relative w-full max-w-[320px] aspect-square
                      bg-white rounded-3xl shadow-lg
                      flex items-center justify-center p-6 border-4 border-primary/10">

            <img v-if="sesi.qr_image" :src="sesi.qr_image" alt="QR Code" class="w-full h-full object-contain" />

            <div v-else
              class="w-full h-full bg-slate-200 rounded-lg flex items-center justify-center text-primary/40 text-lg font-semibold">
              QR HERE
            </div>

            <!-- FRAME CORNERS -->
            <div class="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
            <div class="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
            <div class="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
            <div class="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
          </div>

          <p class="text-sm text-primary/60 mt-4 font-mono text-center">
            {{ sesi.qr_token }}
          </p>
          <p class="text-sm text-primary/50 mt-1 text-center">
            Arahkan kamera siswa untuk presensi otomatis
          </p>
        </section>

        <!-- PROGRESS -->
        <section class="flex-none px-6 mt-4">
          <div class="flex justify-between text-sm font-semibold text-primary mb-1">
            <span>Expired</span>
            <span class="text-primary/60">{{ formattedSisa }}</span>
          </div>
          <div class="h-2 w-full rounded-full bg-primary/20 overflow-hidden">
            <div class="h-full bg-primary transition-all duration-1000" :style="{ width: progressWidth + '%' }"></div>
          </div>
        </section>

        <!-- FILTER & MURID LIST -->
        <section class="px-6 mt-6 flex flex-col" style="height: calc(100vh - 650px);">
          <!-- Filter Buttons -->
          <div class="flex gap-2 mb-3 justify-center">
            <button @click="filterStatus = 'all'"
              :class="filterStatus === 'all' ? activeFilterClass : inactiveFilterClass">Semua</button>
            <button @click="filterStatus = 'hadir'"
              :class="filterStatus === 'hadir' ? activeFilterClass : inactiveFilterClass">Hadir</button>
            <button @click="filterStatus = 'belum'"
              :class="filterStatus === 'belum' ? activeFilterClass : inactiveFilterClass">Belum Absen</button>
          </div>

          <!-- Total Stats -->
          <div class="flex justify-between mb-2 text-sm font-semibold px-1">
            <span>Total: {{ muridList.length }}</span>
            <span class="text-green-500">Hadir: {{ countBy('hadir') }}</span>
            <span class="text-slate-400">Belum: {{ countBelum }}</span>
          </div>

          <!-- Scrollable List -->
          <div class="overflow-y-auto space-y-2 h-full pb-2">
            <div v-for="m in filteredMurid" :key="m.id"
              class="flex justify-between items-center bg-white rounded-xl p-2 border border-slate-100">
              <span class="font-medium">{{ m.name }}</span>
              <span :class="{
                'text-green-500 font-semibold': m.status === 'hadir',
                'text-blue-500 font-semibold': m.status === 'izin',
                'text-yellow-500 font-semibold': m.status === 'sakit',
                'text-red-500 font-semibold': m.status === 'alpha',
                'text-slate-400 font-medium': !m.status
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
import { IonPage, IonContent, IonSpinner } from '@ionic/vue'
import { useRouter } from 'vue-router'
import LayoutMobile from '@/layouts/LayoutMobile.vue'
import api from '@/services/api'

const router = useRouter()
const goBack = () => router.back()

const sesi = ref({})
const sisaWaktu = ref(0)
const totalWaktu = ref(0)
const muridList = ref([])
const filterStatus = ref('all')

const activeFilterClass = 'px-3 py-1 rounded-full bg-primary text-white text-sm font-semibold'
const inactiveFilterClass = 'px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm'

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
    const expired = new Date(sesi.value.expired_at)
    const dibuka = new Date(sesi.value.dibuka_pada || new Date(expired.getTime() - 30 * 60 * 1000))
    totalWaktu.value = (expired - dibuka) / 1000
    updateSisaWaktu()
    setInterval(updateSisaWaktu, 1000)
    setInterval(loadMuridSesi, 5000)
  }
})

function updateSisaWaktu() {
  if (!sesi.value.expired_at) return
  const now = new Date()
  const expired = new Date(sesi.value.expired_at)
  const diff = (expired - now) / 1000
  sisaWaktu.value = diff > 0 ? diff : 0
}

const formattedSisa = computed(() => {
  const m = Math.floor(sisaWaktu.value / 60)
  const s = Math.floor(sisaWaktu.value % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
})

const progressWidth = computed(() => {
  if (!totalWaktu.value || sisaWaktu.value <= 0) return 0
  return (sisaWaktu.value / totalWaktu.value) * 100
})

const filteredMurid = computed(() => {
  if (filterStatus.value === 'all') return muridList.value
  if (filterStatus.value === 'hadir') return muridList.value.filter(m => m.status === 'hadir')
  if (filterStatus.value === 'belum') return muridList.value.filter(m => !m.status)
  return muridList.value
})

const countBy = (status) => muridList.value.filter(m => m.status === status).length
const countBelum = computed(() => muridList.value.filter(m => !m.status).length)

const currentDateTime = computed(() => {
  const now = new Date()
  return now.toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
})
</script>
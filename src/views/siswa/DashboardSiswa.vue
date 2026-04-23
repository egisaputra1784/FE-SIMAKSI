<template>
  <ion-page>
    <LayoutSiswa>
      <ion-content @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <!-- HEADER MODERN -->
        <header class="bg-primary px-6 pt-10 pb-8 rounded-b-[2.5rem] shadow-xl shadow-primary/20 mb-6 relative overflow-hidden">
          <!-- Abstract gradient overlay -->
          <div class="absolute -top-10 -right-10 size-48 rounded-full bg-white/10 blur-3xl"></div>
          <div class="absolute top-10 -left-10 size-32 rounded-full bg-black/10 blur-2xl"></div>

          <!-- Top Menu Bar -->
          <div class="relative z-10 flex justify-between items-center mb-8 text-white">
            <button class="size-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center backdrop-blur-md active:scale-95 transition-all w-10">
              <span class="material-symbols-outlined">grid_view</span>
            </button>
            <span class="text-xs font-bold tracking-widest uppercase opacity-80">Dashboard Siswa</span>
            <button class="size-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center backdrop-blur-md active:scale-95 transition-all w-10 relative">
              <span class="material-symbols-outlined">school</span>
            </button>
          </div>

          <!-- Profile & Greeting -->
          <div class="relative z-10 flex items-center justify-between text-white">
            <div class="flex-1 pr-4">
              <p class="text-white/70 text-sm font-semibold mb-1">Halo Spesial,</p>
              <h2 class="text-2xl font-black tracking-tight">{{ studentName || 'SIMAKSI' }}</h2>
            </div>
            <!-- Normal Profile Avatar -->
            <div @click="$router.push('/murid/profil')" class="shrink-0 w-14 h-14 bg-white/20 border-2 border-white/50 rounded-full flex items-center justify-center overflow-hidden cursor-pointer active:scale-95 transition-all shadow-sm">
              <span class="material-symbols-outlined text-3xl text-white">person</span>
            </div>
          </div>
        </header>

        <div v-if="isRefreshing" class="flex justify-center py-4">
          <span class="material-symbols-outlined animate-spin text-primary text-3xl">
            refresh
          </span>
        </div>

        <!-- GREETING -->
        <section class="px-6 pt-6 pb-4">
          <h2 class="text-3xl font-bold tracking-tight">
            Halo, {{ studentName }}
          </h2>
          <p class="text-gray-500 text-sm mt-1">
            {{ today }} • {{ timeNow }}
          </p>
        </section>

        <!-- SUMMARY / AKTIF -->
        <section class="px-6 mb-8">
          <div v-if="jadwalAktif" class="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center">
            <span class="text-primary font-bold text-xl">{{ jadwalAktif.mapel }}</span>
            <span class="text-[10px] text-gray-500 mt-1">
              {{ jadwalAktif.kelas }} • {{ jadwalAktif.jam_mulai }} - {{ jadwalAktif.jam_selesai }}
            </span>
            <span :class="jadwalAktif.sudah_absen ? 'text-green-600' : 'text-red-500'"
              class="text-[10px] mt-1 font-bold">
              {{ jadwalAktif.sudah_absen ? 'Sudah Absen' : 'Belum Absen' }}
            </span>
          </div>
          <div v-else class="text-gray-400 text-center text-sm">Tidak ada jadwal aktif saat ini</div>
        </section>

        <!-- SCAN BUTTON -->
        <section class="px-6 mb-8">
          <button @click="$router.push('/scan')" class="w-full bg-primary py-8 rounded-2xl shadow-xl shadow-primary/20
               flex flex-col items-center gap-3 text-white active:scale-[0.98]">

            <div class="size-16 bg-white/20 rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-4xl"
                style="font-variation-settings: 'FILL' 1">qr_code_scanner</span>
            </div>

            <div class="text-center">
              <p class="text-lg font-bold">Scan QR Absensi</p>
              <p class="text-xs text-white/70">Ketuk untuk mulai memindai</p>
            </div>
          </button>
        </section>

        <!-- JADWAL HARI INI -->
        <section class="px-6 space-y-4 pb-28">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold">Jadwal Hari Ini</h3>
            <button @click="refreshJadwal" class="text-xs font-bold text-primary">Refresh</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="j in jadwalHariIni" :key="j.jadwal_id"
              class="flex gap-4 rounded-xl bg-white p-4 shadow-sm border">
              <div class="flex-1 space-y-1">
                <span class="text-[10px] font-bold" :class="j.sesi_dibuka ? 'text-green-600' : 'text-gray-400'">
                  {{ j.sesi_dibuka ? 'Sedang Berlangsung' : 'Belum ada sesi' }}
                </span>
                <p class="font-bold">{{ j.mapel }}</p>
                <p class="text-xs text-gray-500">{{ j.jam_mulai }} - {{ j.jam_selesai }}</p>
                <p class="text-[10px] mt-1" :class="j.sudah_absen ? 'text-green-600' : 'text-red-500'">
                  {{ j.sudah_absen ? 'Sudah Absen' : 'Belum Absen' }}
                </p>
              </div>
            </div>
          </div>
        </section>
      </ion-content>
    </LayoutSiswa>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue'
import LayoutSiswa from '@/layouts/LayoutSiswa.vue'
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const studentName = ref('')
const today = ref('')
const timeNow = ref('')

const jadwalHariIni = ref([])
const jadwalAktif = ref(null)

const isRefreshing = ref(false)

let startY = 0

const handleTouchStart = (e) => {
  startY = e.touches[0].clientY
}

const handleTouchEnd = (e) => {
  const endY = e.changedTouches[0].clientY
  const diff = endY - startY

  if (diff > 80) {
    manualRefresh()
  }
}

const manualRefresh = async () => {
  if (isRefreshing.value) return

  isRefreshing.value = true
  try {
    await loadJadwal()
  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(() => {
      isRefreshing.value = false
    }, 700)
  }
}

const updateDateTime = () => {
  const now = new Date()
  today.value = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  timeNow.value = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

// load jadwal dari API
const loadJadwal = async () => {
  try {
    const res = await api.get('/jadwal/murid/hari-ini')
    jadwalHariIni.value = res.data.data.map(j => ({
      ...j,
      sudah_absen: j.sudah_absen || false
    }))

    const now = new Date().toTimeString().slice(0, 5)
    jadwalAktif.value = jadwalHariIni.value.find(j => now >= j.jam_mulai && now <= j.jam_selesai) || null
  } catch (err) {
    console.error(err)
  }
}

const refreshJadwal = async () => {
  await loadJadwal()
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (user) studentName.value = user.name || ''

  updateDateTime()
  setInterval(updateDateTime, 1000)

  loadJadwal()
})
</script>
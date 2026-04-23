<template>
  <ion-page>
    <LayoutGuru>

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
          <span class="text-xs font-bold tracking-widest uppercase opacity-80">Dashboard Guru</span>
          <button class="size-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center backdrop-blur-md active:scale-95 transition-all w-10 relative">
            <span class="material-symbols-outlined">school</span>
          </button>
        </div>

        <!-- Profile & Greeting -->
        <div class="relative z-10 flex items-center justify-between text-white">
          <div class="flex-1 pr-4">
            <p class="text-white/70 text-sm font-semibold mb-1">Selamat Datang,</p>
            <h2 class="text-2xl font-black tracking-tight">{{ guruName || 'Guru' }}</h2>
          </div>
          <!-- Normal Profile Avatar -->
          <div @click="$router.push('/guru/detail')" class="shrink-0 w-14 h-14 bg-white/20 border-2 border-white/50 rounded-full flex items-center justify-center overflow-hidden cursor-pointer active:scale-95 transition-all shadow-sm">
            <span class="material-symbols-outlined text-3xl text-white">person</span>
          </div>
        </div>
      </header>

      <!-- SCROLLABLE CONTENT + REFRESH -->
      <ion-content class="bg-gray-50" @touchstart="handleTouchStart" @touchend="handleTouchEnd">

        <!-- PULL TO REFRESH -->
        <div v-if="isRefreshing" class="flex justify-center py-4">
          <span class="material-symbols-outlined animate-spin text-primary text-3xl">
            refresh
          </span>
        </div>

        <!-- MAIN DASHBOARD -->
        <main class="pb-28">

          <!-- ===== STATS ===== -->
          <section class="px-5 pt-6">
            <div class="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6">

              <div class="bg-white border border-slate-100 rounded-2xl p-3 shadow-md shadow-slate-200/50 flex flex-col items-center justify-center">
                <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-1">
                  <span class="material-symbols-outlined text-blue-600 text-xl block">groups</span>
                </div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total</p>
                <p class="text-2xl font-black text-slate-800 leading-none">{{ totalSiswa }}</p>
              </div>

              <div class="bg-white border border-slate-100 rounded-2xl p-3 shadow-md shadow-slate-200/50 flex flex-col items-center justify-center">
                <div class="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mb-1">
                  <span class="material-symbols-outlined text-emerald-600 text-xl block">how_to_reg</span>
                </div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Hadir</p>
                <p class="text-2xl font-black text-emerald-600 leading-none">{{ totalHadir }}</p>
              </div>

              <div class="bg-white border border-slate-100 rounded-2xl p-3 shadow-md shadow-slate-200/50 flex flex-col items-center justify-center">
                <div class="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center mb-1">
                  <span class="material-symbols-outlined text-rose-600 text-xl block">person_off</span>
                </div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Absen</p>
                <p class="text-2xl font-black text-rose-600 leading-none">{{ totalTidakHadir }}</p>
              </div>

            </div>
          </section>

          <!-- ===== AKSI CEPAT ===== -->
          <section class="px-5 pt-8 space-y-4">
            <h3 class="text-xl font-bold">Aksi Cepat</h3>

            <!-- QR BUTTON -->
            <button @click="$router.push('/guru/qr')" class="group w-full flex items-center justify-between
                     bg-primary text-white p-5 rounded-2xl
                     shadow-lg shadow-primary/20 active:scale-95">

              <div class="flex items-center gap-4">
                <div class="size-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <span class="material-symbols-outlined text-3xl">qr_code_scanner</span>
                </div>

                <div class="text-left">
                  <p class="font-bold text-lg">Buat Kode QR</p>
                  <p class="text-sm opacity-70">Presensi Otomatis Siswa</p>
                </div>
              </div>

              <span class="material-symbols-outlined opacity-60">chevron_right</span>
            </button>

            <!-- SMALL BUTTONS -->
            <div class="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6">

              <button @click="$router.push('/guru/manual')"
                class="bg-white border border-slate-100 rounded-2xl p-3 shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center active:scale-95 transition-all">
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <span class="material-symbols-outlined text-primary text-2xl">
                    edit_document
                  </span>
                </div>
                <p class="font-bold text-[11px] leading-tight text-slate-700">Absensi<br>Manual</p>
              </button>

              <button @click="$router.push('/guru/rekap')"
                class="bg-white border border-slate-100 rounded-2xl p-3 shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center active:scale-95 transition-all">
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <span class="material-symbols-outlined text-primary text-2xl">
                    summarize
                  </span>
                </div>
                <p class="font-bold text-[11px] leading-tight text-slate-700">Rekap<br>Kelas</p>
              </button>

              <button @click="$router.push('/guru/penilaian')"
                class="bg-white border border-slate-100 rounded-2xl p-3 shadow-md shadow-slate-200/50 flex flex-col items-center justify-center text-center active:scale-95 transition-all">
                <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <span class="material-symbols-outlined text-primary text-2xl">
                    fact_check
                  </span>
                </div>
                <p class="font-bold text-[11px] leading-tight text-slate-700">Penilaian</p>
              </button>

            </div>
          </section>

          <!-- ===== JADWAL ===== -->
          <section class="px-5 pt-8 space-y-4">

            <h3 class="text-xl font-bold">Jadwal Hari Ini</h3>

            <!-- JADWAL AKTIF -->
            <div v-if="jadwalAktif" class="bg-primary/[0.04] border border-primary/20 rounded-xl p-4">

              <p class="text-xs text-primary font-semibold">
                Sedang Berlangsung
              </p>

              <p class="font-bold text-lg">
                {{ jadwalAktif.mapel }} • {{ jadwalAktif.kelas }}
              </p>

              <p class="text-sm opacity-60">
                {{ jadwalAktif.jam_mulai }} - {{ jadwalAktif.jam_selesai }}
              </p>

              <p class="text-xs mt-2" :class="jadwalAktif.sesi_dibuka ? 'text-green-600' : 'text-red-500'">
                {{ jadwalAktif.sesi_dibuka ? 'Sesi sudah dibuka' : 'Belum ada sesi absen' }}
              </p>

            </div>

            <!-- LIST SEMUA JADWAL -->
            <div v-for="j in jadwalHariIni" :key="j.jadwal_id" class="bg-white border rounded-xl p-4">

              <p class="font-bold">
                {{ j.mapel }} • {{ j.kelas }}
              </p>

              <p class="text-sm opacity-60">
                {{ j.jam_mulai }} - {{ j.jam_selesai }}
              </p>

              <p class="text-xs mt-1" :class="j.sesi_dibuka ? 'text-green-600' : 'text-gray-400'">
                {{ j.sesi_dibuka ? 'Sesi dibuka' : 'Belum ada sesi' }}
              </p>

            </div>

          </section>

        </main>

      </ion-content>
    </LayoutGuru>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonRefresher, IonRefresherContent } from '@ionic/vue'
import LayoutGuru from '@/layouts/LayoutGuru.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import api from '@/services/api'

const guruName = ref('')
const guruRole = ref('')
const guruNip = ref('')

const totalSiswa = ref(0)
const totalHadir = ref(0)
const totalTidakHadir = ref(0)

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

const loadSummary = async () => {
  try {
    const sesiLocal = JSON.parse(localStorage.getItem('sesi') || '{}')
    if (!sesiLocal?.sesi_id) return

    const res = await api.get(`/sesi/${sesiLocal.sesi_id}/murid`)
    const muridData = res.data.data || []

    totalSiswa.value = muridData.length
    totalHadir.value = muridData.filter(m => m.status === 'hadir').length
    totalTidakHadir.value = muridData.filter(m =>
      ['izin', 'sakit', 'alpha'].includes(m.status)
    ).length
  } catch (err) {
    console.error(err)
  }
}

const loadJadwal = async () => {
  try {
    const res = await api.get('/jadwal/guru/hari-ini')
    jadwalHariIni.value = res.data.data || []

    const now = new Date()
    const current = now.toTimeString().slice(0, 5)

    jadwalAktif.value = jadwalHariIni.value.find(j =>
      current >= j.jam_mulai && current <= j.jam_selesai
    )
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  loadSummary()
  loadJadwal()



  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (user) {
    guruName.value = user.name
    guruRole.value = user.role
    guruNip.value = user.nip || user.nisn || ''
  }
})


const manualRefresh = async () => {
  if (isRefreshing.value) return

  isRefreshing.value = true
  try {
    await loadSummary()
    await loadJadwal()
  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(() => {
      isRefreshing.value = false
    }, 700)
  }
}
</script>
<template>
  <ion-page>
    <LayoutGuru>

      <!-- HEADER -->
      <header class="sticky top-0 z-50 flex items-center justify-between
             bg-white/95 backdrop-blur-md
             px-5 py-4 border-b border-primary/10">

        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-5xl">
            account_circle
          </span>

          <div>
            <p class="text-primary/70 text-xs font-semibold uppercase tracking-wider">
              Selamat Pagi
            </p>
            <h2 class="text-lg font-bold">{{ guruName }}</h2>
          </div>
        </div>
      </header>

      <!-- SCROLLABLE CONTENT + REFRESH -->
      <ion-content class="bg-gray-50">

        <!-- PULL TO REFRESH -->
        <ion-refresher slot="fixed" @ionRefresh="doRefresh">
          <ion-refresher-content pulling-text="Tarik untuk refresh..." refreshing-spinner="circles"
            refreshing-text="Menyegarkan...">
          </ion-refresher-content>
        </ion-refresher>

        <!-- MAIN DASHBOARD -->
        <main class="pb-28">

          <!-- ===== STATS ===== -->
          <section class="px-5 pt-6">
            <div class="grid grid-cols-3 gap-3">

              <div class="rounded-xl p-4 text-center bg-primary/5 border border-primary/10">
                <p class="text-xs mb-1 opacity-60">Total</p>
                <p class="text-2xl font-bold text-primary">{{ totalSiswa }}</p>
              </div>

              <div class="rounded-xl p-4 text-center bg-green-50 border border-green-100">
                <p class="text-xs mb-1 text-green-700/60">Hadir</p>
                <p class="text-2xl font-bold text-green-600">{{ totalHadir }}</p>
              </div>

              <div class="rounded-xl p-4 text-center bg-red-50 border border-red-100">
                <p class="text-xs mb-1 text-red-700/60">Absen</p>
                <p class="text-2xl font-bold text-red-500">{{ totalTidakHadir }}</p>
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
            <div class="grid grid-cols-3 gap-4">

              <button @click="$router.push('/guru/manual')"
                class="bg-white border-2 border-primary/10 rounded-2xl p-5 active:scale-95">

                <span class="material-symbols-outlined text-primary text-3xl mb-3 block">
                  edit_document
                </span>

                <p class="font-bold">Absensi Manual</p>
              </button>

              <button @click="$router.push('/guru/rekap')"
                class="bg-white border-2 border-primary/10 rounded-2xl p-5 active:scale-95">

                <span class="material-symbols-outlined text-primary text-3xl mb-3 block">
                  summarize
                </span>

                <p class="font-bold">Rekap Kelas</p>
              </button>

              <button @click="$router.push('/guru/penilaian')"
                class="bg-white border-2 border-primary/10 rounded-2xl p-5 active:scale-95">

                <span class="material-symbols-outlined text-primary text-3xl mb-3 block">
                  fact_check
                </span>

                <p class="font-bold text-sm">Penilaian</p>
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
let refreshInterval = null

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

  refreshInterval = setInterval(() => {
    loadJadwal()
  }, 300000)

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (user) {
    guruName.value = user.name
    guruRole.value = user.role
    guruNip.value = user.nip || user.nisn || ''
  }
})

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval)
})

const doRefresh = async (event) => {
  try {
    await loadSummary()
    await loadJadwal()
  } catch (err) {
    console.error(err)
  } finally {
    event.target.complete()
  }
}
</script>
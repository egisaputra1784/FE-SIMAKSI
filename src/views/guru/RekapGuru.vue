<template>
  <ion-page class="h-full">
    <LayoutMobile class="h-full">

      <div class="p-5 space-y-5 h-full overflow-y-auto">

        <!-- HEADER -->
        <div class="flex items-center gap-3">
          <button @click="goBack"
            class="size-10 bg-white rounded-full shadow flex items-center justify-center active:scale-95 transition">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>

          <div>
            <h1 class="text-xl font-bold">Rekap Siswa</h1>
            <p class="text-xs text-gray-400">Pantau kehadiran & performa</p>
          </div>
        </div>

        <!-- FILTER -->
        <div class="bg-white p-4 rounded-2xl shadow space-y-3">

          <select v-model="tahunAjar" @change="fetchKelas" class="w-full border rounded-xl px-3 py-2">
            <option v-for="t in tahunAjarOptions" :key="t.id" :value="t.id">
              {{ t.nama }}
            </option>
          </select>

          <select v-model="kelas" class="w-full border rounded-xl px-3 py-2">
            <option v-for="k in kelasOptions" :key="k.id" :value="k.id">
              {{ k.nama_kelas }}
            </option>
          </select>

          <div class="grid grid-cols-2 gap-2">
            <input type="date" v-model="startDate" class="border rounded-xl px-3 py-2" />
            <input type="date" v-model="endDate" class="border rounded-xl px-3 py-2" />
          </div>

          <button @click="fetchRekap"
            class="w-full bg-primary text-white py-2 rounded-xl font-semibold active:scale-95 transition">
            Tampilkan Rekap
          </button>

        </div>


        <!-- LIST SISWA -->
        <div class="space-y-3">
          <div v-for="s in students" :key="s.id" @click="openDetail(s)"
            class="bg-white p-4 rounded-xl shadow flex items-center justify-between cursor-pointer active:scale-95 transition">

            <div>
              <p class="font-semibold text-sm">{{ s.name }}</p>
              <p class="text-xs text-gray-400">
                Hadir {{ s.hadir }} / {{ s.total }}
              </p>
            </div>

            <div class="text-right">
              <p class="font-bold text-sm" :class="percentColor(s.percent)">
                {{ s.percent }}%
              </p>
              <p class="text-xs text-gray-400">{{ s.status }}</p>
            </div>
          </div>
        </div>

      </div>

      <!-- MODAL DETAIL -->
      <div v-if="selectedStudent" class="fixed inset-0 bg-black/40 flex items-end z-50">

        <div class="bg-white w-full rounded-t-3xl p-5 space-y-4 animate-slideUp">

          <div class="flex justify-between items-center">
            <h2 class="font-bold text-lg">
              {{ selectedStudent.name }}
            </h2>
            <button @click="selectedStudent = null">
              ✕
            </button>
          </div>

          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="bg-gray-100 p-3 rounded-xl">
              <p>Total Hadir</p>
              <p class="font-bold">{{ selectedStudent.hadir }}</p>
            </div>
            <div class="bg-gray-100 p-3 rounded-xl">
              <p>Total Pertemuan</p>
              <p class="font-bold">{{ selectedStudent.total }}</p>
            </div>
          </div>

          <div>
            <p class="text-sm font-semibold mb-2">Persentase</p>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div class="h-3 rounded-full" :class="percentColor(selectedStudent.percent)"
                :style="{ width: selectedStudent.percent + '%' }">
              </div>
            </div>
          </div>

          <div>
            <p class="text-sm font-semibold">Status</p>
            <p class="text-gray-500">{{ selectedStudent.status }}</p>
          </div>

        </div>
      </div>

    </LayoutMobile>
  </ion-page>
</template>

<script setup>
import { IonPage } from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LayoutMobile from '@/layouts/LayoutMobile.vue'
import api from '@/services/api.js'
import { showNotify } from "@/stores/notify"

const router = useRouter()
const goBack = () => router.back()

const tahunAjar = ref(null)
const kelas = ref(null)
const startDate = ref('')
const endDate = ref('')
const tahunAjarOptions = ref([])
const kelasOptions = ref([])

const students = ref([])
const summary = ref({ hadir: 0, izin: 0, sakit: 0, alpha: 0 })

const selectedStudent = ref(null)

const openDetail = (s) => {
  selectedStudent.value = s
}

const fetchTahunAjar = async () => {
  try {
    const res = await api.get('/tahun-ajar')
    tahunAjarOptions.value = res.data.data
    if (tahunAjarOptions.value.length) {
      tahunAjar.value = tahunAjarOptions.value[0].id
      fetchKelas()
    }
  } catch (err) {
    showNotify("Gagal ambil tahun ajar", "error")
  }
}

const fetchKelas = async () => {
  try {
    const res = await api.get('/kelas', {
      params: { tahun_ajar_id: tahunAjar.value }
    })
    kelasOptions.value = res.data.data
    if (kelasOptions.value.length) {
      kelas.value = kelasOptions.value[0].id
    }
  } catch {
    showNotify("Gagal ambil kelas", "error")
  }
}

const fetchRekap = async () => {
  try {
    const res = await api.get('/rekap/siswa', {
      params: {
        tahun_ajar_id: tahunAjar.value,
        kelas_id: kelas.value,
        start_date: startDate.value,
        end_date: endDate.value
      }
    })

    students.value = res.data.students
    hitungSummary()
  } catch {
    showNotify("Gagal ambil data", "error")
  }
}

const hitungSummary = () => {
  let hadir = 0, izin = 0, sakit = 0, alpha = 0

  students.value.forEach(s => {
    const st = s.status.toLowerCase()
    if (st === 'baik') hadir++
    else if (st === 'cukup') izin++
    else if (st === 'perlu perhatian') sakit++
    else if (st === 'alpha') alpha++
  })

  summary.value = { hadir, izin, sakit, alpha }
}

const percentColor = (p) => {
  if (p >= 85) return 'text-green-600 bg-green-500'
  if (p >= 70) return 'text-yellow-600 bg-yellow-500'
  return 'text-red-600 bg-red-500'
}

onMounted(fetchTahunAjar)
</script>

<style>
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.25s ease;
}
</style>
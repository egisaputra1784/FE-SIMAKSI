<template>
  <ion-page>
    <LayoutMobile>

      <div class="p-5 space-y-6">

        <!-- HEADER -->
        <div class="flex items-center gap-3">
          <button @click="goBack" class="size-9 bg-white rounded-full shadow flex items-center justify-center">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>

          <h1 class="text-xl font-bold">Rekap Siswa</h1>
        </div>

        <!-- FILTER -->
        <div class="bg-white p-4 rounded-xl shadow space-y-3">

          <!-- Tahun Ajar -->
          <select v-model="tahunAjar" @change="fetchKelas" class="w-full border rounded-lg px-3 py-2">
            <option v-for="t in tahunAjarOptions" :key="t.id" :value="t.id">
              {{ t.nama }}
            </option>
          </select>

          <!-- Kelas -->
          <select v-model="kelas" class="w-full border rounded-lg px-3 py-2">
            <option v-for="k in kelasOptions" :key="k.id" :value="k.id">
              {{ k.nama_kelas }}
            </option>
          </select>

          <!-- Periode -->
          <div class="grid grid-cols-2 gap-2">
            <input type="date" v-model="startDate" class="border rounded-lg px-3 py-2" />
            <input type="date" v-model="endDate" class="border rounded-lg px-3 py-2" />
          </div>

          <button @click="fetchRekap" class="w-full bg-primary text-white py-2 rounded-lg font-semibold">
            Tampilkan Rekap
          </button>

        </div>


        <!-- LIST SISWA -->
        <div class="max-h-[400px] overflow-y-auto space-y-3">
          <div v-for="s in students" :key="s.id"
            class="bg-white p-4 rounded-xl shadow flex items-center justify-between">
            <div>
              <p class="font-semibold text-sm">{{ s.name }}</p>
              <p class="text-xs text-slate-400">Hadir {{ s.hadir }} / {{ s.total }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-sm" :class="percentColor(s.percent)">{{ s.percent }}%</p>
              <p class="text-xs text-slate-400">{{ s.status }}</p>
            </div>
          </div>
        </div>

      </div>

    </LayoutMobile>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonSpinner } from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LayoutMobile from '@/layouts/LayoutMobile.vue'
import api from '@/services/api.js'
import { showNotify } from "@/stores/notify"


const router = useRouter()
const goBack = () => router.back()

/* ================= FILTER ================= */
const tahunAjar = ref(null)
const kelas = ref(null)
const startDate = ref('')
const endDate = ref('')
const tahunAjarOptions = ref([])
const kelasOptions = ref([])

/* ================= SUMMARY ================= */
const summary = ref({ hadir: 0, izin: 0, sakit: 0, alpha: 0 })

/* ================= STUDENTS ================= */
const students = ref([])

/* ================= FUNCTIONS ================= */
const fetchTahunAjar = async () => {
  try {
    const res = await api.get('/tahun-ajar')
    tahunAjarOptions.value = res.data.data
    if (tahunAjarOptions.value.length > 0) {
      tahunAjar.value = tahunAjarOptions.value[0].id
      fetchKelas()
    }
  } catch (err) {
    showNotify(
      err.response?.data?.message || "Gagal ambil tahun ajar",
      "error"
    )
  }
}

const fetchKelas = async () => {
  try {
    if (!tahunAjar.value) return
    const res = await api.get('/kelas', { params: { tahun_ajar_id: tahunAjar.value } })
    kelasOptions.value = res.data.data
    if (kelasOptions.value.length > 0) kelas.value = kelasOptions.value[0].id
  } catch (err) {
    showNotify(
      err.response?.data?.message || "gagal ambil kelas",
      "error"
    )
  }
}

const fetchRekap = async () => {
  try {
    if (!tahunAjar.value || !kelas.value) return
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
  } catch (err) {
    showNotify(
      err.response?.data?.message || "Gagal Ambil data siswa",
      "error"
    )
  }
}

const hitungSummary = () => {
  const total = students.value.length
  if (total === 0) return
  let hadir = 0, izin = 0, sakit = 0, alpha = 0
  students.value.forEach(s => {
    switch (s.status.toLowerCase()) {
      case 'baik': hadir++; break
      case 'cukup': izin++; break
      case 'perlu perhatian': sakit++; break
    }
    if (s.status.toLowerCase() === 'alpha') alpha++
  })
  summary.value = { hadir, izin, sakit, alpha }
}

const percentColor = (p) => {
  if (p >= 85) return 'text-green-600'
  if (p >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

/* ================= AUTO LOAD ================= */
onMounted(() => fetchTahunAjar())
</script>
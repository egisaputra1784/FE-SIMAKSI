<template>
  <ion-page>
    <LayoutMobile>
      <div class="flex flex-col h-full bg-background-light font-display">

        <!-- ================= HEADER ================= -->
        <header class="bg-white sticky top-0 z-20 shadow-sm px-4 pt-4 pb-3">

          <!-- top bar -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">

              <button @click="goBack" class="size-10 rounded-full flex items-center justify-center hover:bg-slate-100">
                <span class="material-symbols-outlined text-lg">
                  arrow_back_ios_new
                </span>
              </button>

              <div>
                <h2 class="text-lg font-bold">Manual Attendance</h2>
                <p class="text-xs text-primary font-semibold">
                  Class 10A • Mathematics
                </p>
              </div>
            </div>

            <button class="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span class="material-symbols-outlined">select_check_box</span>
            </button>
          </div>

          <!-- search -->
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              search
            </span>

            <input v-model="search" placeholder="Search student name..."
              class="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-100 outline-none text-sm" />
          </div>

          <!-- filters -->
          <div class="flex gap-3 mt-3 overflow-x-auto text-sm font-semibold">

            <button @click="activeFilter = 'all'" :class="activeFilter === 'all'
              ? 'px-4 h-9 rounded-xl bg-primary text-white shrink-0'
              : 'px-4 h-9 rounded-xl bg-slate-100 shrink-0'">
              All ({{ students.length }})
            </button>

            <button @click="activeFilter = 'hadir'" :class="activeFilter === 'hadir'
              ? 'px-4 h-9 rounded-xl bg-green-500 text-white shrink-0'
              : 'px-4 h-9 rounded-xl bg-slate-100 shrink-0'">
              Hadir ({{ countBy('hadir') }})
            </button>

            <button @click="activeFilter = 'absen'" :class="activeFilter === 'absen'
              ? 'px-4 h-9 rounded-xl bg-red-500 text-white shrink-0'
              : 'px-4 h-9 rounded-xl bg-slate-100 shrink-0'">
              Absen ({{ countAbsent }})
            </button>

          </div>
        </header>


        <!-- ================= LIST ================= -->
        <main class="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-28">

          <div v-for="s in filteredStudents" :key="s.id"
            class="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">

            <!-- kiri -->
            <div class="flex items-center gap-4">

              <div class="relative">
                <div class="size-12 rounded-full bg-slate-200 flex items-center justify-center">
                  <span class="material-symbols-outlined text-slate-500">
                    person
                  </span>
                </div>

                <div class="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white"
                  :class="dotColor(s.status)"></div>
              </div>

              <div>
                <p class="font-bold text-sm">{{ s.name }}</p>
                <p class="text-xs text-slate-400">ID: {{ s.id }}</p>
              </div>
            </div>


            <!-- STATUS BUTTONS -->
            <div class="flex gap-1 text-[11px] font-bold">

              <button v-for="opt in statusOptions" :key="opt.value" @click="setStatus(s, opt.value)"
                class="px-2 py-1 rounded-lg transition-all" :class="s.status === opt.value
                  ? opt.active
                  : 'bg-slate-100 text-slate-500'">
                {{ opt.label }}
              </button>

            </div>
          </div>

        </main>


        <!-- ================= FOOTER ================= -->
        <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px]
                 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100">

          <button @click="simpanAbsensi" class="w-full h-14 rounded-xl bg-primary text-white font-bold
                   shadow-lg active:scale-95 flex items-center justify-center gap-2">

            <span class="material-symbols-outlined">save</span>
            Simpan Kehadiran

          </button>

        </div>

      </div>
    </LayoutMobile>
  </ion-page>
</template>


<script setup>
import api from '@/services/api'
import { ref, computed, onMounted } from 'vue'
import { IonPage, IonRefresher, IonRefresherContent } from '@ionic/vue'
import { useRouter } from 'vue-router'
import LayoutMobile from '@/layouts/LayoutMobile.vue'
import { showNotify } from "@/stores/notify"

const router = useRouter()
const goBack = () => router.back()

/* ================= DATA ================= */

const search = ref('')
const students = ref([])
const sesi = ref(null)
const activeFilter = ref('all')

/* ================= LOAD STUDENTS ================= */

const handleRefresh = async (event) => {

  try {

    await loadStudents()

  } catch (e) {
    console.error(e)
  }

  event.target.complete()
}

const loadStudents = async () => {
  try {

    const sesiLocal = JSON.parse(localStorage.getItem('sesi'))

    if (!sesiLocal) {
      showNotify('Sesi tidak ditemukan', 'error')
      router.back()
      return
    }

    sesi.value = sesiLocal

    const res = await api.get(`/sesi/${sesiLocal.sesi_id}/murid`)

    students.value = (res.data.data || []).map(m => ({
      id: m.id,
      name: m.name,
      status: m.status || null
    }))

  } catch (err) {
    console.error(err)
    showNotify('Gagal memuat data murid', 'error')
  }
}

/* ================= OPTIONS ================= */

const statusOptions = [
  { value: 'hadir', label: 'H', active: 'bg-green-500 text-white' },
  { value: 'izin', label: 'I', active: 'bg-blue-500 text-white' },
  { value: 'sakit', label: 'S', active: 'bg-yellow-500 text-white' },
  { value: 'alpha', label: 'A', active: 'bg-red-500 text-white' }
]

/* ================= SET STATUS ================= */

const setStatus = (student, status) => {
  student.status = status
}

/* ================= SAVE ABSENSI ================= */

const simpanAbsensi = async () => {
  try {

    const payload = {
      sesi_id: sesi.value.sesi_id,
      data: students.value
        .filter(s => s.status !== null)
        .map(s => ({
          murid_id: s.id,
          status: s.status
        }))
    }

    await api.post('/absensi/manual', payload)

    showNotify('Absensi berhasil disimpan', 'success')

  } catch (err) {
    console.error(err)
    showNotify(
      err.response?.data?.message || 'Gagal menyimpan absensi',
      'error'
    )
  }
}

/* ================= COMPUTED ================= */

const filteredStudents = computed(() => {

  let list = students.value

  if (activeFilter.value === 'hadir') {
    list = list.filter(s => s.status === 'hadir')
  }

  if (activeFilter.value === 'absen') {
    list = list.filter(s =>
      ['izin', 'sakit', 'alpha'].includes(s.status)
    )
  }

  if (search.value) {
    list = list.filter(s =>
      s.name.toLowerCase().includes(search.value.toLowerCase())
    )
  }

  return list
})

const countBy = (type) =>
  students.value.filter(s => s.status === type).length

const countAbsent = computed(() =>
  countBy('izin') + countBy('sakit') + countBy('alpha')
)

/* ================= UI HELPERS ================= */

const dotColor = (status) => {
  const map = {
    hadir: 'bg-green-500',
    izin: 'bg-blue-500',
    sakit: 'bg-yellow-500',
    alpha: 'bg-red-500'
  }
  return map[status]
}

/* ================= INIT ================= */

onMounted(() => {
  loadStudents()
})
</script>
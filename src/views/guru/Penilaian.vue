<template>
    <ion-page>
        <LayoutMobile>

            <ion-content class="bg-gray-50">

                <!-- HEADER -->
                <div class="flex items-center gap-3 px-5 pt-6 pb-3">

                    <button @click="router.back()"
                        class="size-10 bg-white rounded-full shadow flex items-center justify-center active:scale-95 transition">
                        <span class="material-symbols-outlined text-gray-600">
                            arrow_back
                        </span>
                    </button>

                    <div>
                        <h1 class="text-lg font-bold">Penilaian Siswa</h1>
                        <p class="text-xs text-gray-400">Input nilai dengan cepat</p>
                    </div>

                </div>

                <div class="px-5 pb-10 space-y-5">

                    <!-- PILIH JADWAL -->
                    <div class="bg-white rounded-2xl shadow p-4 space-y-3">

                        <label class="text-xs text-gray-500">
                            Pilih Jadwal Hari Ini
                        </label>

                        <select v-model="jadwal"
                            class="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">

                            <option value="">
                                Pilih Jadwal
                            </option>

                            <option v-for="j in jadwalList" :key="j.jadwal_id" :value="j">
                                {{ j.mapel }} • {{ j.kelas }} ({{ j.jam_mulai }})
                            </option>

                        </select>

                    </div>

                    <!-- INFO JADWAL -->
                    <div v-if="jadwal"
                        class="bg-primary/10 text-primary rounded-xl p-3 text-sm flex items-center gap-2">

                        <span class="material-symbols-outlined text-base">
                            schedule
                        </span>

                        {{ jadwal.mapel }} - {{ jadwal.kelas }}

                    </div>


                    <!-- LIST SISWA -->
                    <div v-if="murid.length" class="space-y-3">

                        <div v-for="m in murid" :key="m.id"
                            class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">

                            <div class="flex items-center gap-3">

                                <div
                                    class="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {{ m.name.charAt(0).toUpperCase() }}
                                </div>

                                <div>
                                    <p class="font-semibold text-sm text-gray-700">
                                        {{ m.name }}
                                    </p>
                                    <p class="text-xs text-gray-400">
                                        Siswa aktif
                                    </p>
                                </div>

                            </div>

                            <button @click="nilai(m)"
                                class="bg-primary text-white text-xs px-4 py-2 rounded-xl active:scale-95 transition">
                                Nilai
                            </button>

                        </div>

                    </div>


                    <!-- EMPTY STATE -->
                    <div v-else class="flex flex-col items-center justify-center text-gray-400 py-20 space-y-3">

                        <span class="material-symbols-outlined text-5xl">
                            school
                        </span>

                        <p class="text-sm text-center">
                            {{ jadwal ? 'Belum ada siswa di kelas ini' : 'Pilih jadwal dulu biar gak kosong gini' }}
                        </p>

                    </div>

                </div>

            </ion-content>

        </LayoutMobile>
    </ion-page>
</template>

<script setup>

import { ref, onMounted, watch } from "vue"
import { IonPage, IonContent } from "@ionic/vue"
import { useRouter } from "vue-router"
import api from "@/services/api"
import LayoutMobile from "@/layouts/LayoutMobile.vue"

const router = useRouter()

const jadwalList = ref([])
const jadwal = ref(null)
const murid = ref([])


/*
LOAD JADWAL HARI INI
*/
onMounted(async () => {

    const res = await api.get("/jadwal/guru/hari-ini")

    jadwalList.value = res.data.data

})


/*
LOAD SISWA SAAT JADWAL DIPILIH
*/
watch(jadwal, async (val) => {

    if (!val) {
        murid.value = []
        return
    }

    const res = await api.get(`/kelas/${val.kelas_id}/murid`)

    murid.value = res.data.data

})


/*
PINDAH KE INPUT NILAI
*/
function nilai(m) {

    router.push({
        path: `/guru/input-nilai/${m.id}`,
        query: {
            jadwal: jadwal.value.jadwal_id
        }
    })

}

</script>
<template>
    <ion-page>
        <LayoutMobile>

            <ion-content class="bg-gray-50">

                <!-- HEADER -->
                <div class="flex items-center gap-3 px-6 pt-6 pb-4">

                    <button @click="router.back()" class="material-symbols-outlined text-2xl text-gray-600">
                        arrow_back
                    </button>

                    <h1 class="text-xl font-bold">
                        Penilaian Siswa
                    </h1>

                </div>

                <div class="px-6 pb-10 space-y-6">

                    <!-- PILIH JADWAL -->
                    <div class="bg-white rounded-2xl shadow-sm p-5 space-y-4">

                        <h2 class="font-semibold text-gray-700 text-sm">
                            Pilih Jadwal Hari Ini
                        </h2>

                        <select v-model="jadwal" class="border border-gray-200 rounded-xl px-3 py-2 text-sm w-full">

                            <option value="">
                                Pilih Jadwal
                            </option>

                            <option v-for="j in jadwalList" :key="j.jadwal_id" :value="j">

                                {{ j.mapel }} - {{ j.kelas }} ({{ j.jam_mulai }})

                            </option>

                        </select>

                    </div>


                    <!-- LIST SISWA -->

                    <div v-if="murid.length" class="space-y-3">

                        <div v-for="m in murid" :key="m.id"
                            class="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">

                            <div class="flex items-center gap-3">

                                <span class="material-symbols-outlined text-primary text-3xl">
                                    account_circle
                                </span>

                                <span class="font-medium text-gray-700">
                                    {{ m.name }}
                                </span>

                            </div>

                            <button @click="nilai(m)" class="text-primary font-semibold text-sm">

                                Nilai

                            </button>

                        </div>

                    </div>


                    <!-- EMPTY STATE -->

                    <div v-else class="flex flex-col items-center justify-center text-gray-400 py-20 space-y-2">

                        <span class="material-symbols-outlined text-5xl">
                            school
                        </span>

                        <p class="text-sm">

                            {{ jadwal ? 'Belum ada siswa' : 'Pilih jadwal untuk melihat siswa' }}

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
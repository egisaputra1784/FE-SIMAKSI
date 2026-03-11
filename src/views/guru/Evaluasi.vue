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
                        Evaluasi Siswa
                    </h1>

                </div>


                <div class="px-6 pb-10 space-y-6">

                    <!-- FILTER -->

                    <div class="bg-white rounded-2xl shadow-sm p-5 space-y-4">

                        <h2 class="font-semibold text-gray-700 text-sm">
                            Filter Data
                        </h2>

                        <div class="grid grid-cols-2 gap-3">

                            <select v-model="tahunAjar" class="border border-gray-200 rounded-xl px-3 py-2 text-sm">

                                <option value="">
                                    Tahun Ajar
                                </option>

                                <option v-for="t in tahunList" :key="t.id" :value="t.id">

                                    {{ t.nama }}

                                </option>

                            </select>


                            <select v-model="kelas" class="border border-gray-200 rounded-xl px-3 py-2 text-sm">

                                <option value="">
                                    Kelas
                                </option>

                                <option v-for="k in kelasList" :key="k.id" :value="k.id">

                                    {{ k.nama_kelas }}

                                </option>

                            </select>

                        </div>

                        <button @click="loadMurid"
                            class="w-full bg-primary text-white py-2.5 rounded-xl font-medium active:scale-95 transition">

                            Tampilkan

                        </button>

                    </div>


                    <!-- LIST SISWA -->

                    <div v-if="murid.length" class="space-y-3">

                        <div v-for="m in murid" :key="m.id" class="flex items-center justify-between
bg-white p-4 rounded-xl
shadow-sm border border-gray-100">

                            <div class="flex items-center gap-3">

                                <span class="material-symbols-outlined text-primary text-3xl">
                                    account_circle
                                </span>

                                <span class="font-medium text-gray-700">
                                    {{ m.name }}
                                </span>

                            </div>

                            <button @click="lihat(m)" class="text-primary font-semibold text-sm">

                                Lihat Evaluasi

                            </button>

                        </div>

                    </div>


                    <!-- EMPTY STATE -->

                    <div v-else class="flex flex-col items-center justify-center
text-gray-400 py-20 space-y-2">

                        <span class="material-symbols-outlined text-5xl">
                            analytics
                        </span>

                        <p class="text-sm">
                            Pilih filter untuk melihat siswa
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
import api from "@/services/api"
import { useRouter } from "vue-router"
import LayoutMobile from "@/layouts/LayoutMobile.vue"

const router = useRouter()

const tahunList = ref([])
const kelasList = ref([])
const murid = ref([])

const tahunAjar = ref("")
const kelas = ref("")

onMounted(loadTahunAjar)

async function loadTahunAjar() {

    const res = await api.get("/tahun-ajar")
    tahunList.value = res.data.data

}

/* LOAD KELAS SAAT TAHUN AJAR BERUBAH */

watch(tahunAjar, async (val) => {

    if (!val) {
        kelasList.value = []
        return
    }

    const res = await api.get("/kelas", {
        params: {
            tahun_ajar_id: val
        }
    })

    kelasList.value = res.data.data

})

/* LOAD MURID */

async function loadMurid() {

    if (!kelas.value) return

    const res = await api.get(`/kelas/${kelas.value}/murid`)

    murid.value = res.data.data

}

/* KE HALAMAN EVALUASI */

function lihat(m) {

    router.push({
        path: `/guru/hasil-evaluasi/${m.id}`,
        query: {
            kelas: kelas.value
        }
    })

}

</script>
<template>
    <ion-page>
        <LayoutMobile>

            <ion-content class="bg-gray-50">

                <div class="px-6 pt-6 pb-10 space-y-6">

                    <!-- HEADER -->

                    <div class="flex items-center gap-3">

                        <button @click="router.back()" class="material-symbols-outlined text-2xl text-gray-600">
                            arrow_back
                        </button>

                        <h1 class="text-xl font-bold">
                            Input Penilaian
                        </h1>

                    </div>


                    <!-- INFO MURID -->

                    <div v-if="murid" class="bg-white rounded-xl p-4 shadow-sm">

                        <div class="flex items-center gap-3">

                            <span class="material-symbols-outlined text-primary text-4xl">
                                account_circle
                            </span>

                            <div>

                                <div class="font-semibold text-gray-700">
                                    {{ murid.name }}
                                </div>

                                <div class="text-sm text-gray-400">
                                    ID Murid: {{ murid.id }}
                                </div>

                            </div>

                        </div>

                    </div>


                    <!-- KATEGORI NILAI -->

                    <div v-for="c in categories" :key="c.id" class="bg-white rounded-xl p-4 shadow-sm space-y-3">

                        <div class="font-medium text-gray-700">
                            {{ c.name }}
                        </div>

                        <div class="flex gap-2">

                            <button v-for="n in 5" :key="n" @click="setScore(c.id, n)" :class="btnClass(c.id, n)">

                                {{ n }}

                            </button>

                        </div>

                    </div>


                    <!-- CATATAN -->

                    <div class="bg-white rounded-xl p-4 shadow-sm">

                        <textarea v-model="catatan" placeholder="Catatan guru..."
                            class="w-full border border-gray-200 rounded-lg p-3 text-sm">
                        </textarea>

                    </div>


                    <!-- SUBMIT -->

                    <button @click="simpan" :disabled="loading"
                        class="w-full bg-primary text-white py-3 rounded-xl font-medium disabled:opacity-50">

                        <span v-if="loading">
                            Menyimpan...
                        </span>

                        <span v-else>
                            Simpan Penilaian
                        </span>

                    </button>

                </div>

            </ion-content>

        </LayoutMobile>
    </ion-page>
</template>


<script setup>

import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { IonPage, IonContent } from "@ionic/vue"
import api from "@/services/api"
import LayoutMobile from "@/layouts/LayoutMobile.vue"

const route = useRoute()
const router = useRouter()

const categories = ref([])
const scores = ref({})
const catatan = ref("")
const loading = ref(false)
const murid = ref(null)

const muridId = route.params.id
const jadwalId = route.query.jadwal


/*
LOAD DATA AWAL
*/

onMounted(async () => {

    try {

        const cat = await api.get("/assessment/categories")
        categories.value = cat.data.data

        // const m = await api.get(`/murid/${muridId}`)
        // murid.value = m.data.data

    }
    catch (err) {

        console.log(err)

    }

})


/*
SET NILAI
*/

function setScore(cat, val) {

    scores.value[cat] = val

}


/*
STYLE BUTTON NILAI
*/

function btnClass(cat, val) {

    return scores.value[cat] === val
        ? "flex-1 py-2 bg-primary text-white rounded-lg"
        : "flex-1 py-2 border border-gray-300 rounded-lg"

}


/*
SIMPAN PENILAIAN
*/

async function simpan() {

    if (!jadwalId) {
        alert("Jadwal tidak ditemukan")
        return
    }

    if (Object.keys(scores.value).length === 0) {
        alert("Isi nilai terlebih dahulu")
        return
    }

    loading.value = true

    try {

        const data = {

            jadwal_id: jadwalId,
            murid_id: muridId,

            scores: Object.keys(scores.value).map(id => ({

                category_id: Number(id),
                score: scores.value[id]

            })),

            catatan: catatan.value

        }

        await api.post("/assessment/simpan", data)

        alert("Penilaian tersimpan")

        router.back()

    }
    catch (err) {

        console.log(err)
        alert("Gagal menyimpan")

    }

    loading.value = false

}

</script>
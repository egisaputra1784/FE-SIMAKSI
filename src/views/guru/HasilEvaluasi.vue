<template>
    <ion-page>
        <LayoutMobile>

            <ion-content class="bg-gray-50">

                <div class="p-6 space-y-6">

                    <!-- HEADER -->

                    <div class="flex items-center gap-3 px-6 pt-6 pb-2">

                        <button @click="router.back()" class="material-symbols-outlined text-2xl text-gray-600">
                            arrow_back
                        </button>

                        <h1 class="text-xl font-bold">
                            Hasil Evaluasi
                        </h1>

                    </div>

                    <!-- FILTER TANGGAL -->

                    <div class="bg-white p-4 rounded-xl shadow space-y-3">

                        <h2 class="font-semibold">Periode</h2>

                        <div class="flex gap-2">

                            <input type="date" v-model="startDate" class="border rounded-xl px-3 py-2 text-sm w-full" />

                            <input type="date" v-model="endDate" class="border rounded-xl px-3 py-2 text-sm w-full" />

                        </div>

                        <button @click="loadData" class="bg-primary text-white px-4 py-2 rounded-xl text-sm w-full">
                            Tampilkan
                        </button>

                    </div>

                    <!-- TOTAL NILAI -->

                    <div class="bg-primary text-white p-5 rounded-2xl shadow">

                        <div class="text-sm opacity-80">
                            Rata-rata Sikap
                        </div>

                        <div class="text-3xl font-bold mt-1">
                            {{ rataTotal }}
                        </div>

                        <div class="text-xs opacity-80">
                            Dari semua kategori
                        </div>

                    </div>

                    <!-- CHART -->

                    <div class="bg-white p-4 rounded-xl shadow space-y-3">

                        <h2 class="font-semibold">
                            Statistik Sikap
                        </h2>

                        <canvas ref="chartRef"></canvas>

                    </div>

                    <!-- LIST RATA -->

                    <div class="bg-white p-4 rounded-xl shadow space-y-2">

                        <h2 class="font-semibold">
                            Rata-rata Sikap
                        </h2>

                        <div v-for="r in rataKategori" :key="r.name" class="flex justify-between border-b py-1">

                            <span>{{ r.name }}</span>
                            <span>{{ r.value }}</span>

                        </div>

                        <div class="flex justify-between font-bold pt-2">

                            <span>Total</span>
                            <span>{{ rataTotal }}</span>

                        </div>

                    </div>

                </div>

            </ion-content>

        </LayoutMobile>
    </ion-page>
</template>

<script setup>

import { ref, onMounted, nextTick } from "vue"
import Chart from "chart.js/auto"
import axios from "axios"
import { IonPage, IonContent } from "@ionic/vue"
import { useRouter, useRoute } from "vue-router"
import LayoutMobile from "@/layouts/LayoutMobile.vue"
import api from "@/services/api"

const router = useRouter()
const route = useRoute()

/*
=====================
STATE
=====================
*/

const startDate = ref("")
const endDate = ref("")

const rataKategori = ref([])
const rataTotal = ref(0)

const chartRef = ref(null)
let chartInstance = null

const muridId = route.params.id

/*
=====================
LOAD DATA API
=====================
*/

async function loadData() {

    try {

        const res = await api.get(`/assessment/murid/${muridId}`, {
            params: { start_date: startDate.value, end_date: endDate.value }
        })

        const data = res.data

        /*
        =====================
        RATA KATEGORI
        =====================
        */

        rataKategori.value = data.rata_per_kategori.map(i => ({
            name: i.name,
            value: i.rata_rata
        }))

        /*
        =====================
        RATA TOTAL
        =====================
        */

        rataTotal.value = data.rata_total ?? 0

        /*
        =====================
        CHART
        =====================
        */

        const labels = rataKategori.value.map(i => i.name)
        const values = rataKategori.value.map(i => i.value)

        renderChart(labels, values)

    } catch (err) {

        console.error(err)

    }

}

/*
=====================
CHART
=====================
*/

function renderChart(labels, values) {

    if (chartInstance) {
        chartInstance.destroy()
    }

    chartInstance = new Chart(chartRef.value, {
        type: "radar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Rata-rata",
                    data: values,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    })

}

/*
=====================
DEFAULT LOAD
=====================
*/

onMounted(async () => {

    await nextTick()

    const today = new Date()
    const past = new Date()

    past.setDate(today.getDate() - 30)

    startDate.value = past.toISOString().slice(0, 10)
    endDate.value = today.toISOString().slice(0, 10)

    loadData()

})

</script>
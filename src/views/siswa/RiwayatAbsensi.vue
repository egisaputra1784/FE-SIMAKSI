<template>
    <ion-page>
        <ion-content class="bg-slate-50 text-slate-800">

            <div class="min-h-screen max-w-md mx-auto flex flex-col pb-10">

                <!-- HEADER -->
                <div class="bg-primary pt-12 pb-24 px-6 rounded-b-[2.5rem] relative overflow-hidden shadow-xl">

                    <div class="absolute -top-10 -right-10 size-48 bg-white/10 blur-3xl rounded-full"></div>
                    <div class="absolute top-10 -left-10 size-32 bg-black/10 blur-2xl rounded-full"></div>

                    <div class="relative z-10 flex items-center justify-between text-white">
                        <button @click="router.back()"
                            class="size-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
                            <span class="material-symbols-outlined">arrow_back</span>
                        </button>

                        <h1 class="text-xs font-bold tracking-widest uppercase">
                            Riwayat Absensi
                        </h1>

                        <div class="w-10"></div>
                    </div>

                </div>

                <!-- FLOATING CARD -->
                <div class="px-6 -mt-16 relative z-20">

                    <div class="bg-white rounded-3xl p-5 shadow border">

                        <div class="flex items-center justify-between mb-4">
                            <h2 class="font-black text-lg">Histori Kehadiran</h2>
                            <span class="text-xs text-slate-400">{{ data.length }} data</span>
                        </div>

                        <!-- LOADING -->
                        <div v-if="loading" class="flex justify-center py-10">
                            <ion-spinner name="crescent"></ion-spinner>
                        </div>

                        <!-- EMPTY -->
                        <div v-else-if="data.length === 0" class="text-center text-slate-400 py-10">
                            Belum ada riwayat absensi.
                        </div>

                        <!-- LIST -->
                        <div v-else class="space-y-3">

                            <div v-for="item in data" :key="item.id" class="p-4 rounded-2xl border bg-slate-50">

                                <!-- TOP -->
                                <div class="flex justify-between items-start mb-2">
                                    <h3 class="font-bold text-slate-800 text-sm">
                                        {{ item.mapel }}
                                    </h3>

                                    <span class="text-[10px] px-2 py-1 rounded-lg font-bold"
                                        :class="statusClass(item.status)">
                                        {{ item.status }}
                                    </span>
                                </div>

                                <!-- MID -->
                                <p class="text-xs text-slate-500">
                                    {{ item.kelas }} • {{ formatDate(item.tanggal) }}
                                </p>

                                <!-- TIME -->
                                <p class="text-xs text-slate-400 mt-1">
                                    {{ item.jam_mulai }} - {{ item.jam_selesai }}
                                </p>

                                <!-- FOOT -->
                                <div class="mt-3 flex items-center gap-2 text-xs text-slate-600">
                                    <span class="material-symbols-outlined text-sm">schedule</span>
                                    Scan: {{ item.waktu_scan || '-' }}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonSpinner } from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const data = ref([])
const loading = ref(true)

const fetchData = async () => {
    try {
        const res = await api.get('/riwayat')
        data.value = res.data.data
    } catch (err) {
        console.error('Gagal ambil riwayat', err)
    } finally {
        loading.value = false
    }
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}

const statusClass = (status) => {
    switch (status) {
        case 'hadir':
            return 'bg-green-100 text-green-600'
        case 'izin':
            return 'bg-yellow-100 text-yellow-600'
        case 'alpha':
            return 'bg-red-100 text-red-600'
        default:
            return 'bg-slate-200 text-slate-600'
    }
}

onMounted(fetchData)
</script>
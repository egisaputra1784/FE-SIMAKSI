<template>
    <ion-page>
        <LayoutSiswa>
            <ion-content>

                <!-- HEADER -->
                <div class="px-6 pt-6 pb-4 flex items-center justify-between">
                    <h1 class="text-2xl font-bold">Leaderboard</h1>

                    <button @click="$router.back()" class="text-xs text-primary font-bold">
                        Kembali
                    </button>
                </div>

                <!-- LOADING -->
                <div v-if="loading" class="text-center mt-10 text-gray-400">
                    Loading leaderboard...
                </div>

                <!-- EMPTY -->
                <div v-else-if="sorted.length === 0" class="text-center mt-10 text-gray-400">
                    Belum ada data leaderboard
                </div>

                <!-- CONTENT -->
                <template v-else>

                    <!-- PODIUM -->
                    <section class="px-6 mb-6 flex items-end justify-center gap-3">

                        <!-- TOP 2 -->
                        <div v-if="top3[1]" class="flex flex-col items-center">
                            <div class="bg-white px-3 py-2 rounded-xl shadow text-center">
                                <p class="text-xs font-bold">{{ top3[1].name }}</p>
                                <p class="text-[10px] text-gray-500">{{ top3[1].point }} pts</p>
                            </div>
                            <div
                                class="bg-gray-300 w-16 h-20 mt-2 rounded-t-xl flex items-center justify-center font-bold">
                                2
                            </div>
                        </div>

                        <!-- TOP 1 -->
                        <div v-if="top3[0]" class="flex flex-col items-center">
                            <div class="bg-primary text-white px-4 py-2 rounded-xl shadow text-center">
                                <p class="text-xs font-bold">{{ top3[0].name }}</p>
                                <p class="text-[10px] opacity-80">{{ top3[0].point }} pts</p>
                            </div>
                            <div
                                class="bg-yellow-400 w-20 h-28 mt-2 rounded-t-xl flex items-center justify-center font-bold">
                                1
                            </div>
                        </div>

                        <!-- TOP 3 -->
                        <div v-if="top3[2]" class="flex flex-col items-center">
                            <div class="bg-white px-3 py-2 rounded-xl shadow text-center">
                                <p class="text-xs font-bold">{{ top3[2].name }}</p>
                                <p class="text-[10px] text-gray-500">{{ top3[2].point }} pts</p>
                            </div>
                            <div
                                class="bg-orange-300 w-16 h-16 mt-2 rounded-t-xl flex items-center justify-center font-bold">
                                3
                            </div>
                        </div>

                    </section>

                    <!-- LIST -->
                    <section class="px-6 space-y-3 pb-28">
                        <div v-for="u in others" :key="u.id"
                            class="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center"
                            :class="u.is_me ? 'border-primary bg-primary/5' : ''">

                            <div class="flex items-center gap-3">
                                <span class="text-sm font-bold w-5 text-center">
                                    {{ u.rank }}
                                </span>

                                <div>
                                    <p class="font-bold text-sm">
                                        {{ u.name }}
                                        <span v-if="u.is_me" class="text-primary text-xs">(Kamu)</span>
                                    </p>
                                    <p class="text-xs text-gray-500">
                                        {{ u.point }} pts
                                    </p>
                                </div>
                            </div>

                            <span class="text-xs text-gray-400">
                                Rank {{ u.rank }}
                            </span>
                        </div>
                    </section>

                </template>

            </ion-content>
        </LayoutSiswa>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue'
import LayoutSiswa from '@/layouts/LayoutSiswa.vue'
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'

// =====================
// STATE
// =====================
const users = ref([])
const myName = ref(null)
const loading = ref(true)

// =====================
// FETCH LEADERBOARD
// =====================
const fetchLeaderboard = async () => {
    try {
        const res = await api.get('/leaderboard')
        users.value = res.data.data
    } catch (err) {
        console.error('Gagal ambil leaderboard', err)
    }
}

// =====================
// FETCH USER LOGIN
// =====================
const fetchMe = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    myName.value = user?.name
}   

// =====================
// SORT + MARK
// =====================
const sorted = computed(() => {
    return [...users.value]
        .sort((a, b) => b.point - a.point)
        .map(u => ({
            ...u,
            is_me: u.name === myName.value
        }))
})

// =====================
// TOP 3
// =====================
const top3 = computed(() => sorted.value.slice(0, 3))

// =====================
// OTHERS
// =====================
const others = computed(() => sorted.value.slice(3))

// =====================
// INIT
// =====================
onMounted(async () => {
    await Promise.all([
        fetchLeaderboard(),
        fetchMe()
    ])

    loading.value = false

    // debug kalau masih kosong
    console.log('Leaderboard:', users.value)
})
</script>
<template>
    <ion-page>
        <LayoutSiswa>
            <ion-content @touchstart="handleTouchStart" @touchend="handleTouchEnd">

                <div v-if="isRefreshing" class="flex justify-center py-4">
                    <span class="material-symbols-outlined animate-spin text-primary text-3xl">
                        refresh
                    </span>
                </div>

                <!-- HEADER -->
                <div class="px-6 pt-6 pb-4 flex justify-between items-center">
                    <div>
                        <h1 class="text-2xl font-bold">Point Saya</h1>
                        <p class="text-sm text-gray-500">Pantau dosa & pahala digitalmu</p>
                    </div>

                    <button @click="$router.push('/leaderboard')"
                        class="bg-primary text-white px-3 py-2 rounded-xl text-xs font-bold shadow flex items-center gap-1 active:scale-95 transition">
                        <span class="material-symbols-outlined text-sm">leaderboard</span>
                        Rank
                    </button>
                </div>

                <!-- TOTAL POINT -->
                <section class="px-6 mb-6">
                    <div
                        class="bg-gradient-to-br from-primary to-indigo-500 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div class="absolute right-4 top-4 text-5xl opacity-10">💰</div>

                        <p class="text-sm opacity-80">Total Point</p>
                        <h2 class="text-4xl font-bold mt-2 tracking-wide">{{ point }}</h2>
                    </div>
                </section>

                <!-- TAB -->
                <section class="px-6 mb-4 flex gap-2">
                    <button @click="setTab('history')" :class="tabClass('history')">
                        Riwayat
                    </button>

                    <button @click="setTab('market')" :class="tabClass('market')">
                        Market
                    </button>
                </section>

                <!-- HISTORY -->
                <section v-if="activeTab === 'history'" class="px-6 space-y-3 pb-28">
                    <div v-for="(h, i) in history" :key="i"
                        class="bg-white p-4 rounded-xl border shadow-sm flex gap-3 items-start hover:shadow-md transition">
                        <div class="text-xl mt-1">
                            {{ getIcon(h) }}
                        </div>

                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-sm leading-snug">
                                {{ h.description }}
                            </p>

                            <p class="text-xs text-gray-500 mt-1" v-if="h.context?.mapel">
                                📚 {{ h.context.mapel }} • {{ h.context.kelas }}
                            </p>

                            <p class="text-xs text-gray-400 mt-1">
                                {{ h.date }}
                            </p>
                        </div>

                        <div class="font-bold text-sm" :class="h.amount > 0 ? 'text-green-600' : 'text-red-500'">
                            {{ h.amount > 0 ? '+' : '' }}{{ h.amount }}
                        </div>
                    </div>
                </section>

                <!-- MARKET -->
                <section v-if="activeTab === 'market'" class="px-6 space-y-3 pb-28">

                    <div v-for="item in items" :key="item.id"
                        class="bg-white p-4 rounded-2xl border shadow-sm flex items-center hover:shadow-md transition">
                        <div class="flex-1 min-w-0 pr-3">
                            <p class="font-semibold text-sm truncate">
                                {{ item.name }}
                            </p>

                            <p class="text-xs text-gray-500 truncate">
                                {{ item.desc }}
                            </p>

                            <p class="text-[10px] mt-1 text-primary font-bold uppercase tracking-wide">
                                {{ item.type }}
                            </p>

                            <p class="text-xs mt-2 font-semibold"
                                :class="(voucherMap[item.id] || 0) > 0 ? 'text-green-600' : 'text-gray-400'">
                                🎟️ Kamu punya: {{ voucherMap[item.id] || 0 }}
                            </p>
                        </div>

                        <button @click="buyItem(item.id)" :disabled="buying"
                            class="shrink-0 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow active:scale-95 transition disabled:opacity-50">
                            <span v-if="buying">...</span>
                            <span v-else>💰 {{ item.cost }}</span>
                        </button>
                    </div>

                </section>

            </ion-content>
        </LayoutSiswa>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue'
import LayoutSiswa from '@/layouts/LayoutSiswa.vue'
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import { showNotify } from "@/stores/notify"

const point = ref(0)
const activeTab = ref('history')

const history = ref([])
const items = ref([])
const myTokens = ref([])

const loading = ref(false)
const buying = ref(false)

const isRefreshing = ref(false)

let startY = 0

const handleTouchStart = (e) => {
    startY = e.touches[0].clientY
}

const handleTouchEnd = (e) => {
    const endY = e.changedTouches[0].clientY
    const diff = endY - startY

    if (diff > 80) {
        manualRefresh()
    }
}



const manualRefresh = async () => {
    if (isRefreshing.value) return

    isRefreshing.value = true

    try {
        await Promise.all([
            loadPoint(),
            loadHistory(),
            loadItems(),
            loadMyTokens()
        ])
    } catch (err) {
        console.error(err)
    } finally {
        setTimeout(() => {
            isRefreshing.value = false
        }, 600)
    }
}

/* ======================
   ICON
====================== */
const getIcon = (h) => {
    switch (h.context?.type) {
        case 'attendance': return '📚'
        case 'purchase': return '🛒'
        case 'voucher_used': return '🎟️'
        default: return '⚙️'
    }
}

/* ======================
   TAB
====================== */
const setTab = (tab) => {
    activeTab.value = tab
}

const tabClass = (tab) => [
    'flex-1 py-2 rounded-lg text-sm font-bold transition',
    activeTab.value === tab
        ? 'bg-primary text-white shadow'
        : 'bg-gray-100 text-gray-500'
]

/* ======================
   VOUCHER MAP (FIX INTI)
====================== */
const voucherMap = computed(() => {
    const map = {}

    myTokens.value.forEach(t => {
        map[t.item_id] = (map[t.item_id] || 0) + 1
    })

    return map
})

/* ======================
   API
====================== */
const loadMyTokens = async () => {
    const res = await api.get('/marketplace/tokens')
    myTokens.value = res.data.data
}

const loadPoint = async () => {
    const res = await api.get('/point/me')
    point.value = res.data.point
}

const loadHistory = async () => {
    const res = await api.get('/point/history')

    history.value = res.data.data.map(h => ({
        description: h.description,
        amount: h.amount,
        date: new Date(h.date).toLocaleString('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }),
        context: h.context
    }))
}

const loadItems = async () => {
    const res = await api.get('/marketplace/items')

    items.value = res.data.data.map(i => ({
        id: i.id,
        name: i.item_name,
        cost: i.point_cost,
        desc: i.description,
        type: i.type
    }))
}

/* ======================
   BUY
====================== */
const buyItem = async (itemId) => {
    if (buying.value) return
    buying.value = true

    try {
        await api.post('/marketplace/buy', { item_id: itemId })

        await Promise.all([
            loadPoint(),
            loadMyTokens()
        ])

        showNotify('Berhasil beli 😎', 'success')

    } catch (err) {
        showNotify(
            err.response?.data?.message || 'Gagal beli',
            'error'
        )
    } finally {
        buying.value = false
    }
}

/* ======================
   INIT
====================== */
onMounted(async () => {
    loading.value = true

    await Promise.all([
        loadPoint(),
        loadHistory(),
        loadItems(),
        loadMyTokens()
    ])

    loading.value = false
})
</script>
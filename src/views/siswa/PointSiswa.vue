<template>
    <ion-page>
        <LayoutSiswa>
            <ion-content>

                <!-- HEADER -->
                <div class="px-6 pt-6 pb-4 flex justify-between items-start">
                    <div>
                        <h1 class="text-2xl font-bold">Point Saya</h1>
                        <p class="text-sm text-gray-500">Pantau dosa & pahala digitalmu</p>
                    </div>

                    <button @click="$router.push('/leaderboard')"
                        class="bg-primary text-white px-3 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">leaderboard</span>
                        Rank
                    </button>
                </div>

                <!-- TOTAL POINT -->
                <section class="px-6 mb-6">
                    <div class="bg-primary text-white p-6 rounded-2xl shadow-lg">
                        <p class="text-sm opacity-80">Total Point</p>
                        <h2 class="text-4xl font-bold mt-2">{{ point }}</h2>
                    </div>
                </section>

                <!-- TAB -->
                <section class="px-6 mb-4 flex gap-2">
                    <button @click="activeTab = 'history'" :class="tabClass('history')">Riwayat</button>
                    <button @click="activeTab = 'market'" :class="tabClass('market')">Market</button>
                </section>

                <!-- HISTORY -->
                <section v-if="activeTab === 'history'" class="px-6 space-y-3 pb-28">
                    <div v-for="(h, i) in history" :key="i"
                        class="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center">
                        <div>
                            <p class="font-bold text-sm">{{ h.description }}</p>
                            <p class="text-xs text-gray-500">{{ h.date }}</p>
                        </div>

                        <span :class="h.amount > 0 ? 'text-green-600' : 'text-red-500'" class="font-bold text-sm">
                            {{ h.amount > 0 ? '+' : '' }}{{ h.amount }}
                        </span>
                    </div>
                </section>

                <!-- MARKET -->
                <section v-if="activeTab === 'market'" class="px-6 space-y-4 pb-28">
                    <div v-for="item in items" :key="item.id"
                        class="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center">
                        
                        <div>
                            <p class="font-bold">{{ item.name }}</p>
                            <p class="text-xs text-gray-500">{{ item.desc }}</p>
                        </div>

                        <!-- FIX DISINI NIH -->
                        <button 
                            @click="buyItem(item.id)"
                            :disabled="buying"
                            class="bg-primary text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50">
                            
                            <span v-if="buying">...</span>
                            <span v-else>{{ item.cost }} pts</span>
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
import { ref, onMounted } from 'vue'
import api from '@/services/api'

// =====================
// STATE
// =====================
const point = ref(0)
const activeTab = ref('history')
const history = ref([])
const items = ref([])
const loading = ref(false)
const buying = ref(false)

// =====================
// FETCH POINT
// =====================
const loadPoint = async () => {
    try {
        const res = await api.get('/point/me')
        point.value = res.data.point
    } catch (err) {
        console.error(err)
    }
}

// =====================
// FETCH HISTORY
// =====================
const loadHistory = async () => {
    try {
        const res = await api.get('/point/history')

        history.value = res.data.data.map(h => ({
            description: h.description,
            amount: h.amount,
            date: new Date(h.date).toLocaleDateString('id-ID')
        }))
    } catch (err) {
        console.error(err)
    }
}

// =====================
// FETCH ITEMS
// =====================
const loadItems = async () => {
    try {
        const res = await api.get('/marketplace/items')

        items.value = res.data.data.map(i => ({
            id: i.id,
            name: i.item_name,
            cost: i.point_cost,
            desc: i.description
        }))
    } catch (err) {
        console.error(err)
    }
}

// =====================
// BUY ITEM
// =====================
const buyItem = async (itemId) => {
    if (buying.value) return

    buying.value = true

    try {
        await api.post('/marketplace/buy', {   // ⚠️ SESUAIKAN ROUTE BACKEND LU
            item_id: itemId
        })

        await loadPoint()

        alert('Berhasil beli 😎')
    } catch (err) {
        alert(err.response?.data?.message || 'Gagal beli')
    } finally {
        buying.value = false
    }
}

// =====================
// TAB STYLE
// =====================
const tabClass = (tab) => {
    return [
        'flex-1 py-2 rounded-lg text-sm font-bold',
        activeTab.value === tab
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-500'
    ]
}

// =====================
// INIT
// =====================
onMounted(async () => {
    loading.value = true

    await Promise.all([
        loadPoint(),
        loadHistory(),
        loadItems()
    ])

    loading.value = false
})
</script>
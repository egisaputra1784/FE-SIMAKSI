<template>
    <ion-page>
        <LayoutGuru>
            <ion-content class="bg-background-light">
                <div class="flex flex-col font-display min-h-full">

                    <!-- ================= HEADER ================= -->
                    <header class="sticky top-0 z-20
                        bg-white
                        border-b border-primary/10
                        px-4 h-16
                        flex items-center justify-center">

                        <h1 class="text-lg font-bold text-primary">
                            Profil & Pengaturan
                        </h1>

                    </header>


                    <!-- ================= PROFILE INFO ================= -->
                    <section class="flex flex-col items-center
               px-6 py-8
               bg-gradient-to-b from-primary/5 to-transparent">

                        <!-- avatar -->
                        <div class="size-32 rounded-full 
                        bg-primary/10 
                        border-4 border-white 
                        shadow-lg
                        flex items-center justify-center">

                            <span class="material-symbols-outlined 
                            text-primary text-6xl">
                                account_circle
                            </span>
                        </div>

                        <!-- name -->
                        <div class="mt-5 text-center">
                            <p class="text-xl font-bold text-primary">
                                {{ guruName }}
                            </p>

                            <p class="text-sm text-slate-500 mt-1">
                                NIP: {{ guruNip }}
                            </p>

                            <span class="inline-block mt-3 px-3 py-1 rounded-full
                   bg-primary/10 text-primary text-xs font-semibold">
                                {{ guruEmail }}
                            </span>
                        </div>
                    </section>


                    <!-- ================= MENU LIST ================= -->
                    <main class="flex-1 px-4 space-y-3 pb-28">

                        <MenuItem icon="account_circle" title="Informasi Akun" subtitle="Detail data diri dan email" />

                        <MenuItem icon="bar_chart" title="Laporan Absen" subtitle="Rekap & statistik kehadiran siswa" />


                        <MenuItem icon="lock" title="Ubah Kata Sandi" subtitle="Perbarui keamanan akun" @click="$router.push('/guru/ganti-password')" />

                        <MenuItem icon="help_center" title="Pusat Bantuan" subtitle="Butuh bantuan? Hubungi kami" />

                        <!-- logout -->
                        <button @click="logout" :disabled="loggingOut" class="mt-6 w-full h-14 rounded-xl
                                bg-red-500 text-white font-bold
                                shadow-lg active:scale-95
                                flex items-center justify-center gap-2
                                disabled:opacity-70 disabled:cursor-not-allowed">
                            <template v-if="!loggingOut">
                                <span class="material-symbols-outlined">logout</span>
                                Keluar
                            </template>

                            <template v-else>
                                <ion-spinner name="crescent"></ion-spinner>
                                Logging out...
                            </template>
                        </button>


                        <p class="text-center text-xs text-slate-400 mt-6">
                            SIMAKSI Mobile v2.4.0
                        </p>
                    </main>

                </div>
            </ion-content>
        </LayoutGuru>
    </ion-page>
</template>


<script setup>
import { IonPage, IonContent } from '@ionic/vue'
import { useRouter } from 'vue-router'
import MenuItem from '@/components/MenuItem.vue'
import LayoutGuru from '../../layouts/LayoutGuru.vue';
import api from '@/services/api'
import { ref, onMounted } from 'vue'

const guruName = ref('')
const guruRole = ref('')
const guruNip = ref('')
const guruEmail = ref('')
const loggingOut = ref(false)

onMounted(() => {
    const stored = localStorage.getItem('user')

    if (!stored) return

    const user = JSON.parse(stored)

    guruName.value = user.name ?? ''
    guruRole.value = user.role ?? ''
    guruNip.value = user.nip ?? ''
    guruEmail.value = user.email ?? ''
})

const router = useRouter()

const logout = async () => {
    if (loggingOut.value) return

    loggingOut.value = true

    try {
        await api.post('/logout')
    } catch (err) {
        // kalau API logout gagal pun, tetap bersihin local
    } finally {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        router.push('/login')
        loggingOut.value = false
    }
}

</script>

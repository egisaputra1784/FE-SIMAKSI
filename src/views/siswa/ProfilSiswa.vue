<template>
    <ion-page>
        <LayoutSiswa>
            <ion-content :fullscreen="true" class="bg-background-light text-[#111318]">

                <div class="min-h-screen max-w-md mx-auto flex flex-col">

                    <!-- HEADER -->
                    <div class="sticky top-0 z-10 flex items-center
                 bg-white/80 backdrop-blur-md
                 px-4 py-3 border-b border-primary/10">

                        <h1 class="flex-1 text-center text-lg font-bold tracking-tight pr-10">
                            Profil
                        </h1>
                    </div>

                    <!-- PROFILE HEADER -->
                    <div class="flex flex-col items-center py-8 px-4 bg-white shadow-sm mb-6">

                        <div class="relative">
                            <div class="size-32 rounded-full border-4 border-primary/10 p-1">
                                <div class="h-full w-full rounded-full bg-cover bg-center shadow-inner"
                                    :style="{ backgroundImage: `url(${profilePhoto})` }">
                                </div>
                            </div>

                            <button
                                class="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white">
                                <span class="material-symbols-outlined text-[18px]">
                                    photo_camera
                                </span>
                            </button>
                        </div>

                        <div class="mt-4 text-center">
                            <h2 class="text-2xl font-bold">
                                {{ studentName }}
                            </h2>

                            <p class="text-primary font-medium mt-1">
                                NISN: {{ nisn }}
                            </p>

                            <span class="inline-block mt-2 px-3 py-1 bg-primary/10
                     text-primary text-xs font-semibold
                     rounded-full uppercase tracking-wider">
                                {{ kelas }}
                            </span>
                        </div>
                    </div>

                    <!-- SETTINGS -->
                    <div class="flex-1 px-4 space-y-4 pb-10">

                        <!-- AKUN -->
                        <p class="text-sm font-semibold text-primary/60 uppercase tracking-widest pl-1">
                            Akun & Keamanan
                        </p>

                        <div class="space-y-1 bg-white rounded-xl shadow-sm overflow-hidden border border-primary/5">

                            <button
                                class="w-full flex items-center gap-4 px-4 py-4 hover:bg-neutral-soft transition-colors group">
                                <div
                                    class="size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span class="material-symbols-outlined">person</span>
                                </div>
                                <span class="flex-1 text-left font-medium">Edit Profil</span>
                                <span
                                    class="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">
                                    chevron_right
                                </span>
                            </button>

                            <button @click="$router.push('/murid/ganti-password')"
                                class="w-full flex items-center gap-4 px-4 py-4 border-t border-primary/5 hover:bg-neutral-soft transition-colors group">
                                <div
                                    class="size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span class="material-symbols-outlined">lock</span>
                                </div>
                                <span class="flex-1 text-left font-medium">Ganti Password</span>
                                <span
                                    class="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">
                                    chevron_right
                                </span>
                            </button>

                        </div>

                        <!-- PREFERENSI -->
                        <p class="text-sm font-semibold text-primary/60 uppercase tracking-widest pl-1 pt-2">
                            Preferensi
                        </p>

                        <div class="space-y-1 bg-white rounded-xl shadow-sm overflow-hidden border border-primary/5">

                            <div class="flex items-center gap-4 px-4 py-4">
                                <div
                                    class="size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span class="material-symbols-outlined">notifications_active</span>
                                </div>

                                <div class="flex-1">
                                    <p class="font-medium">Notifikasi</p>
                                    <p class="text-xs text-gray-500">
                                        Aktifkan pengingat jadwal & tugas
                                    </p>
                                </div>

                                <input type="checkbox" v-model="notifications"
                                    class="toggle-checkbox w-5 h-5 accent-primary" />
                            </div>

                            <button
                                class="w-full flex items-center gap-4 px-4 py-4 border-t border-primary/5 hover:bg-neutral-soft transition-colors group">
                                <div
                                    class="size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span class="material-symbols-outlined">language</span>
                                </div>

                                <div class="flex-1 text-left">
                                    <p class="font-medium">Bahasa</p>
                                </div>

                                <span class="text-sm text-gray-500 mr-1 font-medium">
                                    Indonesia
                                </span>

                                <span class="material-symbols-outlined text-gray-400">
                                    chevron_right
                                </span>
                            </button>

                        </div>

                        <!-- LOGOUT -->
                        <div class="pt-6">
                            <button @click="logout" :disabled="loggingOut" class="w-full flex items-center justify-center gap-3 px-6 py-4
                                bg-danger/10 hover:bg-danger/20 text-danger
                                rounded-xl font-bold border border-danger/20
                                disabled:opacity-70 disabled:cursor-not-allowed">

                                <template v-if="!loggingOut">
                                    <span class="material-symbols-outlined">logout</span>
                                    Keluar dari SIMAKSI
                                </template>

                                <template v-else>
                                    <ion-spinner name="crescent"></ion-spinner>
                                    Logging out...
                                </template>
                            </button>

                            <p class="mt-6 text-center text-xs text-gray-400 font-medium">
                                Version 2.4.0
                            </p>
                        </div>

                    </div>

                </div>

            </ion-content>
        </LayoutSiswa>
    </ion-page>
</template>

<script setup>
import api from '@/services/api'
import LayoutSiswa from '@/layouts/LayoutSiswa.vue'
import { IonPage, IonContent, IonSpinner } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const studentName = ref('Budi Santoso')
const nisn = ref('0012345678')
const kelas = ref('Kelas XII - IPA 1')
const notifications = ref(true)

const profilePhoto =
    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400'



const loggingOut = ref(false)

const logout = async () => {
    if (loggingOut.value) return

    loggingOut.value = true

    try {
        await api.post('/logout')
    } catch (err) {
        // kalau API gagal, tetap lanjut bersihin local
    } finally {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        router.push('/login')
        loggingOut.value = false
    }
}
</script>
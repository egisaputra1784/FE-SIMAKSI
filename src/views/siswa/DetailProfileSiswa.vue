<template>
    <ion-page>
        <ion-content class="bg-slate-50 text-slate-800">

            <div class="min-h-screen max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col relative pb-10">

                <!-- HEADER -->
                <div class="bg-primary pt-12 pb-24 px-6 rounded-b-[2.5rem] relative overflow-hidden shadow-xl">
                    <div class="absolute -top-10 -right-10 size-48 bg-white/10 blur-3xl rounded-full"></div>
                    <div class="absolute top-10 -left-10 size-32 bg-black/10 blur-2xl rounded-full"></div>

                    <div class="relative z-10 flex items-center justify-between text-white">
                        <button @click="router.back()"
                            class="size-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
                            <span class="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 class="text-xs font-bold tracking-widest uppercase">Informasi Akun</h1>
                        <div class="w-10"></div>
                    </div>
                </div>

                <!-- PROFILE CARD -->
                <div class="px-6 -mt-16 relative z-20">
                    <div class="bg-white rounded-3xl p-6 shadow border flex flex-col items-center text-center">

                        <div class="size-24 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                            <span class="material-symbols-outlined text-5xl text-primary">account_circle</span>
                        </div>

                        <h2 class="text-2xl font-black">{{ name }}</h2>
                        <p class="text-primary text-sm font-bold">{{ role }}</p>

                        <div class="mt-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold">
                            Kelas {{ kelas || '-' }}
                        </div>
                    </div>
                </div>

                <!-- DETAIL -->
                <div class="px-6 mt-8 space-y-4">

                    <div class="bg-white p-4 rounded-2xl border flex items-center gap-4">
                        <span class="material-symbols-outlined text-blue-500">badge</span>
                        <div>
                            <p class="text-xs text-slate-400 font-bold">NISN</p>
                            <p class="font-bold text-lg">{{ nisn }}</p>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-2xl border flex items-center gap-4">
                        <span class="material-symbols-outlined text-indigo-500">mail</span>
                        <div>
                            <p class="text-xs text-slate-400 font-bold">Email</p>
                            <p class="font-bold">{{ email || 'Belum diatur' }}</p>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-2xl border flex items-center gap-4">
                        <span class="material-symbols-outlined text-purple-500">work</span>
                        <div>
                            <p class="text-xs text-slate-400 font-bold">Role</p>
                            <p class="font-bold capitalize">{{ role }}</p>
                        </div>
                    </div>

                </div>

            </div>

        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const name = ref('')
const nisn = ref('')
const email = ref('')
const role = ref('')
const kelas = ref('')

onMounted(async () => {
    const stored = localStorage.getItem('user')

    // tampil cepat dari local
    if (stored) {
        const user = JSON.parse(stored)

        name.value = user.name ?? ''
        nisn.value = user.nisn ?? '-'
        email.value = user.email ?? ''
        role.value = user.role ?? ''
        kelas.value = user.kelas?.nama ?? '-'
    }

    // fetch fresh
    try {
        const res = await api.get('/dataProfil')
        const user = res.data.data

        name.value = user.name ?? ''
        nisn.value = user.nisn ?? '-'
        email.value = user.email ?? ''
        role.value = user.role ?? ''
        kelas.value = user.kelas?.nama ?? '-'

        localStorage.setItem('user', JSON.stringify(user))

    } catch (err) {
        console.error('Gagal fetch detail profil siswa', err)
    }
})
</script>

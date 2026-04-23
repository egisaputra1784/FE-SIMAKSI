<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-slate-50 text-slate-800">

            <div class="min-h-screen max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col relative pb-10">

                <!-- ================= MODERN BLUE HEADER ================= -->
                <div
                    class="bg-primary pt-12 pb-24 px-6 rounded-b-[2.5rem] relative overflow-hidden shadow-xl shadow-primary/20">
                    <!-- Decor -->
                    <div class="absolute -top-10 -right-10 size-48 rounded-full bg-white/10 blur-3xl"></div>
                    <div class="absolute top-10 -left-10 size-32 rounded-full bg-black/10 blur-2xl"></div>

                    <div class="relative z-10 flex items-center justify-between text-white">
                        <button @click="$router.back()"
                            class="size-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center backdrop-blur-md active:scale-95 transition-all">
                            <span class="material-symbols-outlined">arrow_back</span>
                        </button>
                        <h1 class="text-xs font-bold tracking-widest uppercase opacity-90">Informasi Akun</h1>
                        <div class="w-10"></div> <!-- spacer pad -->
                    </div>
                </div>

                <!-- ================= OVERLAPPING AVATAR CARD ================= -->
                <div class="px-6 -mt-16 relative z-20">
                    <div
                        class="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 flex flex-col md:flex-row md:justify-between items-center gap-4 text-center md:text-left">

                        <div class="flex flex-col md:flex-row items-center gap-4">
                            <div
                                class="shrink-0 size-24 rounded-full bg-gradient-to-tr from-blue-100 to-white text-primary border-[6px] border-white shadow-md flex items-center justify-center">
                                <span class="material-symbols-outlined text-5xl">account_circle</span>
                            </div>
                            <div>
                                <h2 class="text-2xl font-black text-slate-800 tracking-tight">{{ name }}</h2>
                                <p class="text-primary font-bold text-sm tracking-wide">{{ role }}</p>
                            </div>
                        </div>

                        <!-- Status Badge -->
                        <div
                            class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-4 py-2 flex-shrink-0 rounded-xl text-xs uppercase font-bold tracking-widest shadow-sm border border-emerald-100">
                            <span class="material-symbols-outlined text-base">verified</span>
                            Akun Aktif
                        </div>

                    </div>
                </div>

                <!-- ================= DETAILS LIST ================= -->
                <div class="px-6 mt-8 space-y-4">
                    <h3 class="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-4 ml-2">Detail Data
                        Diri</h3>

                    <!-- Card Item -->
                    <div
                        class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div
                            class="size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined">badge</span>
                        </div>
                        <div class="flex-1">
                            <p class="text-xs text-slate-400 font-bold uppercase tracking-wide mb-0.5">NIP / ID Pegawai
                            </p>
                            <p class="font-black text-slate-700 text-lg">{{ nip }}</p>
                        </div>
                    </div>

                    <!-- Card Item -->
                    <div
                        class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div
                            class="size-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined">mail</span>
                        </div>
                        <div class="flex-1">
                            <p class="text-xs text-slate-400 font-bold uppercase tracking-wide mb-0.5">Alamat Email</p>
                            <p class="font-black text-slate-700">{{ email || 'Belum diatur' }}</p>
                        </div>
                    </div>

                    <!-- Card Item -->
                    <div
                        class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div
                            class="size-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined">work</span>
                        </div>
                        <div class="flex-1">
                            <p class="text-xs text-slate-400 font-bold uppercase tracking-wide mb-0.5">Posisi / Role</p>
                            <p class="font-black text-slate-700 capitalize">{{ role }}</p>
                        </div>
                    </div>

                </div>

            </div>
        </ion-content>
    </ion-page>
</template>


<script setup>
import { IonPage, IonContent } from '@ionic/vue'
import { ref, onMounted, computed } from 'vue'

const name = ref('')
const nip = ref('')
const email = ref('')
const role = ref('')

const avatarInitial = computed(() => {
    if (!name.value) return 'U'
    return name.value.charAt(0).toUpperCase()
})

onMounted(async () => {
    const stored = localStorage.getItem('user')

    if (stored) {
        const user = JSON.parse(stored)

        guruName.value = user.name ?? ''
        guruRole.value = user.role ?? ''
        guruNip.value = user.nip ?? ''
        guruEmail.value = user.email ?? ''
    }

    try {
        const res = await api.get('/dataProfil')
        const user = res.data.data

        guruName.value = user.name ?? ''
        guruRole.value = user.role ?? ''
        guruNip.value = user.nip ?? ''
        guruEmail.value = user.email ?? ''

        localStorage.setItem('user', JSON.stringify(user))

    } catch (err) {
        console.error('Gagal fetch profil', err)
    }
})
</script>
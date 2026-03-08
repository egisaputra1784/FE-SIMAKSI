<template>
    <ion-page>
        <ion-content :fullscreen="true" class="bg-background-light text-[#111318]">

            <div class="min-h-screen max-w-md mx-auto flex flex-col">

                <!-- ================= TOPBAR ================= -->
                <div class="sticky top-0 z-10 flex items-center
            bg-white/80 backdrop-blur-md
            px-4 py-3 border-b border-primary/10">

                    <button @click="$router.back()" class="p-2 rounded-full bg-primary/10 text-primary mr-3">
                        <span class="material-symbols-outlined">arrow_back</span>
                    </button>

                    <h1 class="flex-1 text-center text-lg font-bold tracking-tight pr-10">
                        Detail Profil
                    </h1>
                </div>


                <!-- ================= PROFILE CARD ================= -->
                <div class="flex-1 px-4 py-6">

                    <div class="bg-white rounded-xl shadow-sm p-5 border border-primary/5">

                        <!-- HEADER -->
                        <div class="flex items-center gap-4 mb-5">

                            <div class="size-16 rounded-full bg-primary/10 text-primary
                                flex items-center justify-center">

                                <span class="material-symbols-outlined text-3xl">
                                    person
                                </span>

                            </div>

                            <div>
                                <p class="text-lg font-bold">
                                    {{ name }}
                                </p>

                                <p class="text-sm text-gray-500">
                                    {{ role }}
                                </p>
                            </div>

                        </div>


                        <!-- INFO -->
                        <div class="space-y-3">

                            <div class="bg-slate-50 p-3 rounded-lg">
                                <p class="text-xs text-gray-500">Nama Lengkap</p>
                                <p class="font-semibold text-sm">{{ name }}</p>
                            </div>

                            <div class="bg-slate-50 p-3 rounded-lg">
                                <p class="text-xs text-gray-500">NIP</p>
                                <p class="font-semibold text-sm">{{ nip }}</p>
                            </div>

                            <div class="bg-slate-50 p-3 rounded-lg">
                                <p class="text-xs text-gray-500">Email</p>
                                <p class="font-semibold text-sm">{{ email }}</p>
                            </div>

                            <div class="bg-slate-50 p-3 rounded-lg">
                                <p class="text-xs text-gray-500">Role</p>
                                <p class="font-semibold text-sm">{{ role }}</p>
                            </div>

                            <div class="bg-slate-50 p-3 rounded-lg">
                                <p class="text-xs text-gray-500">Status Akun</p>
                                <p class="font-semibold text-sm text-green-600">
                                    Aktif
                                </p>
                            </div>

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

onMounted(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    name.value = user.name || ''
    nip.value = user.nip || user.nisn || '-'
    email.value = user.email || ''
    role.value = user.role || ''
})
</script>
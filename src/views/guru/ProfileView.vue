<template>
    <ion-page>
    <LayoutGuru>
        <div class="flex flex-col min-h-screen bg-background-light font-display">

            <!-- ================= HEADER ================= -->
            <header class="flex items-center justify-center
               bg-white sticky top-0 z-20
               border-b border-primary/10
               px-4 pt-6 pb-3">


                <h1 class="text-lg font-bold text-primary">
                    Profil & Pengaturan
                </h1>

                <!-- spacer biar title center -->
                <div class="w-11"></div>
            </header>


            <!-- ================= PROFILE INFO ================= -->
            <section class="flex flex-col items-center
               px-6 py-8
               bg-gradient-to-b from-primary/5 to-transparent">

                <!-- avatar -->
                <div class="relative">
                    <div class="size-32 rounded-full bg-slate-200
                   border-4 border-white shadow-lg">
                    </div>

                    <button class="absolute bottom-1 right-1
                   size-9 rounded-full
                   bg-primary text-white
                   flex items-center justify-center">

                        <span class="material-symbols-outlined text-sm">
                            edit
                        </span>
                    </button>
                </div>

                <!-- name -->
                <div class="mt-5 text-center">
                    <p class="text-xl font-bold text-primary">
                        {{ guruName }}
                    </p>

                    <p class="text-sm text-slate-500 mt-1">
                        {{ guruNip }}
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


                <MenuItem icon="lock" title="Ubah Kata Sandi" subtitle="Perbarui keamanan akun" />

                <MenuItem icon="help_center" title="Pusat Bantuan" subtitle="Butuh bantuan? Hubungi kami" />

                <!-- logout -->
                <button @click="logout" class="mt-6 w-full h-14 rounded-xl
                    bg-red-500 text-white font-bold
                    shadow-lg active:scale-95
                    flex items-center justify-center gap-2">

                    <span class="material-symbols-outlined">logout</span>
                    Keluar
                </button>


                <p class="text-center text-xs text-slate-400 mt-6">
                    SIMAKSI Mobile v2.4.0
                </p>
            </main>

        </div>
    </LayoutGuru>
    </ion-page>
</template>


<script setup>
import { useRouter } from 'vue-router'
import MenuItem from '@/components/MenuItem.vue'
import LayoutGuru from '../../layouts/LayoutGuru.vue';
import api from '@/services/api'
import { ref, onMounted } from 'vue'

const guruName = ref('')
const guruRole = ref('')
const guruNip = ref('')
const guruEmail = ref('')

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (user) {
    guruName.value = user.name
    guruRole.value = user.role
    guruNip.value = user.nip || user.nisn || ''
    guruEmail.value = user.email
  }
})

const router = useRouter()

const logout = async () => {
    await api.post('/logout')

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    router.push('/login')
}

</script>

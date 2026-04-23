<template>
    <ion-page>
        <LayoutSiswa>
            <ion-content class="bg-slate-50">
                <div class="min-h-screen max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col relative pb-32">

                    <!-- ================= MODERN BLUE HEADER ================= -->
                    <div
                        class="bg-primary pt-10 pb-20 px-6 rounded-b-[2.5rem] relative overflow-hidden shadow-xl shadow-primary/20">
                        <div class="absolute -top-10 -right-10 size-48 rounded-full bg-white/10 blur-3xl"></div>
                        <div class="absolute top-10 -left-10 size-32 rounded-full bg-black/10 blur-2xl"></div>
                    </div>

                    <!-- ================= OVERLAPPING AVATAR CARD ================= -->
                    <div class="px-6 -mt-14 relative z-20">
                        <div
                            class="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-5 flex flex-col items-center text-center">

                            <div
                                class="shrink-0 size-20 rounded-full bg-slate-50 text-primary border-[4px] border-white shadow-md flex items-center justify-center -mt-12 mb-3">
                                <span class="material-symbols-outlined text-5xl">account_circle</span>
                            </div>

                            <h2 class="text-xl font-black text-slate-800 tracking-tight">{{ studentName || 'Siswa' }}
                            </h2>
                            <p class="text-primary font-bold text-xs tracking-wide">NISN: {{ nisn || '-' }}</p>

                            <div
                                class="mt-3 inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest shadow-sm border border-blue-100/50">
                                <span class="material-symbols-outlined text-[15px]">class</span>
                                Kelas {{ kelas || 'Belum Diatur' }}
                            </div>

                        </div>
                    </div>

                    <!-- ================= MENU LIST ================= -->
                    <main class="flex-1 px-6 mt-8 space-y-4">
                        <h3 class="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-4 ml-2">Pengaturan
                            Umum</h3>

                        <div class="space-y-3">
                            <MenuItem icon="account_circle" title="Informasi Akun" subtitle="Detail data siswa"
                                @click="$router.push('/murid/detail')" />
                            <MenuItem icon="lock" title="Ubah Kata Sandi" subtitle="Perbarui keamanan akun"
                                @click="$router.push('/murid/ganti-password')" />
                            <MenuItem icon="history" title="Riwayat Absensi" subtitle="Lihat histori kehadiran"
                                @click="$router.push('/murid/riwayat')" />
                            <MenuItem icon="help_center" title="Pusat Bantuan" subtitle="Butuh bantuan? Hubungi kami"
                                @click="openWhatsApp" />
                        </div>

                        <!-- logout -->
                        <button @click="logout" :disabled="loggingOut" class="mt-8 w-full h-[3.5rem] rounded-2xl
                                bg-red-50 text-red-600 font-black tracking-wide
                                border border-red-100 shadow-sm active:scale-95 transition-all
                                flex items-center justify-center gap-2
                                disabled:opacity-50 disabled:cursor-not-allowed">
                            <template v-if="!loggingOut">
                                <span class="material-symbols-outlined">logout</span>
                                KELUAR AKUN
                            </template>

                            <template v-else>
                                <ion-spinner name="crescent"></ion-spinner>
                                Processing...
                            </template>
                        </button>

                        <p class="text-center text-xs text-slate-400 mt-8 font-semibold">
                            SIMAKSI Mobile v2.4.0
                        </p>
                    </main>

                </div>
            </ion-content>
        </LayoutSiswa>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonSpinner } from '@ionic/vue'
import LayoutSiswa from '@/layouts/LayoutSiswa.vue'
import MenuItem from '@/components/MenuItem.vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { ref, onMounted } from 'vue'

const router = useRouter()

const studentName = ref('')
const nisn = ref('')
const kelas = ref('')
const loggingOut = ref(false)

onMounted(async () => {
    const stored = localStorage.getItem('user')

    if (stored) {
        const user = JSON.parse(stored)

        studentName.value = user.name ?? ''
        nisn.value = user.nisn ?? ''
        kelas.value = user.kelas?.nama ?? '-'
    }

    try {
        const res = await api.get('/dataProfil')
        const user = res.data.data

        studentName.value = user.name ?? ''
        nisn.value = user.nisn ?? ''
        kelas.value = user.kelas?.nama ?? '-'

        localStorage.setItem('user', JSON.stringify(user))

    } catch (err) {
        console.error('Gagal fetch profil', err)
    }
})

const logout = async () => {

    if (loggingOut.value) return
    loggingOut.value = true

    try {
        await api.post('/logout')
    } catch (err) {
    } finally {

        localStorage.removeItem('token')
        localStorage.removeItem('user')

        router.push('/login')

        loggingOut.value = false
    }
}

const openWhatsApp = () => {
    const phone = '6285795847276' // 🔥 ganti nomor kamu (format internasional, tanpa +)

    const message = encodeURIComponent(
        `Halo admin, saya butuh bantuan aplikasi SIMAKSI.`
    )

    const url = `https://wa.me/${phone}?text=${message}`

    window.open(url, '_blank')
}
</script>
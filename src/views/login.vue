<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-slate-50 text-slate-800">

      <div class="min-h-screen w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex flex-col relative pb-10">

        <!-- ================= MODERN BLUE HEADER (LOGO & BRAND) ================= -->
        <div
          class="bg-primary pt-20 pb-32 px-6 rounded-b-[3rem] relative overflow-hidden shadow-2xl shadow-primary/30 flex flex-col items-center">
          <!-- Decorative Blurs -->
          <div class="absolute -top-10 -right-10 size-64 rounded-full bg-white/10 blur-3xl"></div>
          <div class="absolute top-20 -left-10 size-48 rounded-full bg-black/10 blur-3xl"></div>

          <div class="relative z-10 flex flex-col items-center text-center">
            <!-- School Icon (Preserved) -->
            <div
              class="size-24 bg-white border-[6px] border-white/20 rounded-3xl flex items-center justify-center shadow-xl mb-6">
              <span class="material-symbols-outlined text-primary text-5xl">school</span>
            </div>

            <!-- SIMAKSI Text (Preserved) -->
            <h1 class="text-white text-[2.5rem] font-black tracking-tight drop-shadow-md leading-none">SIMAKSI</h1>
            <p class="text-white/80 text-sm mt-3 font-bold tracking-wide px-4 drop-shadow-sm">
              Sistem Monitoring Absensi Kelas Siswa
            </p>
          </div>
        </div>

        <!-- ================= LOGIN CARD OVERLAP ================= -->
        <div class="px-6 -mt-16 relative z-20 flex-1 flex flex-col mb-8">
          <div class="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100 p-8">

            <!-- Card Greetings -->
            <div class="mb-8 text-center">
              <h2 class="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
              <p class="text-slate-400 text-sm font-semibold mt-1">Please login to access your dashboard</p>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="space-y-6">

              <!-- ID Field -->
              <div class="space-y-2">
                <label class="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">ID Number
                  (NISN/NIP)</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <span
                      class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                  </div>
                  <input v-model="login" type="text" placeholder="Enter your ID" required
                    class="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-700 font-bold outline-none focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm" />
                </div>
              </div>

              <!-- Password Field -->
              <div class="space-y-2">
                <label class="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <span
                      class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                  </div>
                  <input :type="showPass ? 'text' : 'password'" v-model="password" placeholder="••••••••" required
                    class="w-full pl-14 pr-14 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-700 font-bold outline-none focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm" />

                  <button type="button" @click="showPass = !showPass" tabindex="-1"
                    class="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-primary transition-colors active:scale-95">
                    <span class="material-symbols-outlined">{{ showPass ? 'visibility_off' : 'visibility' }}</span>
                  </button>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="pt-3">
                <button type="submit" :disabled="loading"
                  class="w-full bg-primary hover:bg-primary/90 text-white font-black tracking-widest uppercase py-4 rounded-2xl shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span v-if="!loading" class="flex items-center gap-2">
                    Log In
                    <span class="material-symbols-outlined text-xl">arrow_forward</span>
                  </span>
                  <span v-else class="flex items-center gap-2">
                    <ion-spinner name="crescent"></ion-spinner>
                    <span class="normal-case tracking-normal font-bold">Processing...</span>
                  </span>
                </button>
              </div>

            </form>
          </div>
        </div>

        <!-- ================= FOOTER ================= -->
        <div class="mt-auto pb-4 text-center">
          <p class="text-slate-500 text-sm font-semibold">
            Don't have an account?
            <span @click="contactAdmin"
              class="text-primary font-black ml-1 active:opacity-70 transition-opacity cursor-pointer">
              Contact Admin
            </span>
          </p>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { IonPage, IonContent, IonSpinner } from '@ionic/vue'
import api from '@/services/api'
import { showNotify } from "@/stores/notify"
import { useRouter } from 'vue-router'

const router = useRouter()

const login = ref('')
const password = ref('')
const showPass = ref(false)
const loading = ref(false)


const adminNumber = '6285795847276' // ganti sama nomor kamu (format internasional tanpa +)

const contactAdmin = () => {
  const message = encodeURIComponent('Halo admin, saya butuh bantuan login SIMAKSI.')
  window.open(`https://wa.me/${adminNumber}?text=${message}`, '_blank')
}

const handleLogin = async () => {
  if (loading.value) return

  loading.value = true

  try {
    const res = await api.post('/login', {
      login: login.value,
      password: password.value
    })

    const token = res.data.token
    const user = res.data.user



    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    showNotify("Login berhasil", "success")

    if (user.role === 'guru') {
      router.push('/guru')
    } else if (user.role === 'murid') {
      router.push('/murid')
    }

  } catch (err) {

    showNotify(
      err.response?.data?.message || "Login gagal",
      "error"
    )

  } finally {
    loading.value = false
  }
}




</script>
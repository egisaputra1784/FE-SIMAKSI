<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-background-light flex flex-col items-center">

      <!-- iOS Status Spacer -->
      <div class="h-11 w-full"></div>

      <div class="w-full max-w-[430px] px-6 flex flex-col min-h-[calc(100vh-44px)]">

        <!-- Header -->
        <div class="flex flex-col items-center pt-12 pb-10">
          <div class="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <span class="material-symbols-outlined text-primary text-5xl">school</span>
          </div>

          <h1 class="text-primary text-3xl font-bold tracking-tight">SIMAKSI</h1>
          <p class="text-slate-500 text-sm mt-2 font-medium text-center">
            Sistem Monitoring Absensi Kelas Siswa
          </p>
        </div>

        <!-- Login Card -->
        <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">

          <h2 class="text-xl font-bold text-slate-900 mb-1">
            Welcome Back
          </h2>
          <p class="text-slate-500 text-sm mb-8">
            Please login to access your dashboard
          </p>

          <form @submit.prevent="handleLogin" class="space-y-5">

            <!-- ID -->
            <div class="space-y-2">
              <label class="text-sm font-semibold ml-1">ID Number (NISN/NIP)</label>

              <div class="relative">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  person
                </span>

                <input v-model="login" type="text" placeholder="Enter your ID"
                  class="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
              </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label class="text-sm font-semibold ml-1">Password</label>

              <div class="relative">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  lock
                </span>

                <input :type="showPass ? 'text' : 'password'" v-model="password" placeholder="••••••••"
                  class="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />

                <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  @click="showPass = !showPass">
                  <span class="material-symbols-outlined">
                    {{ showPass ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Login Button -->
            <button type="submit" :disabled="loading"
              class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
              <span v-if="!loading" class="flex items-center gap-2">
                Log In
                <span class="material-symbols-outlined text-lg">arrow_forward</span>
              </span>

              <span v-else class="flex items-center gap-2">
                <ion-spinner name="crescent"></ion-spinner>
                Processing...
              </span>
            </button>

          </form>
        </div>

        <!-- Footer -->
        <div class="mt-auto pb-10 pt-8 text-center">
          <p class="text-slate-500 text-sm">
            Don't have an account?
            <span class="text-primary font-bold ml-1">Contact Admin</span>
          </p>
        </div>

        <!-- Subtle gradient -->
        <div class="fixed bottom-0 left-0 w-full h-1/4 -z-10 opacity-5">
          <div class="w-full h-full bg-gradient-to-t from-primary to-transparent"></div>
        </div>

      </div>

      <!-- Fake Home Indicator -->
      <div class="w-32 h-1.5 bg-slate-300 rounded-full mb-2 mt-auto"></div>

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
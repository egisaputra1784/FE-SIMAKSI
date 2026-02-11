<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center">

    <!-- iOS Spacer -->
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
      <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-800 p-6">

        <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-1">
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
                class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none" />
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
                class="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none" />

              <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                @click="showPass = !showPass">
                <span class="material-symbols-outlined">
                  {{ showPass ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Dummy button -->
          <button type="submit"
            class="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20">
            Log In
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

    <!-- fake home indicator -->
    <div class="w-32 h-1.5 bg-slate-300 rounded-full mb-2 mt-auto"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const login = ref('12345678')
const password = ref('password')
const showPass = ref(false)

const handleLogin = async () => {
  try {
    const res = await api.post('/login', {
      login: login.value,
      password: password.value
    })

    const token = res.data.token
    const user = res.data.user

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    if (user.role === 'guru') {
      router.push('/guru')
    } else if (user.role === 'siswa') {
      router.push('/siswa')
    }

  } catch (err) {
    alert(err.response?.data?.message || 'Login gagal bro')
  }
}

</script>

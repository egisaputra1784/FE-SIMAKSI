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
              Ganti Password
            </h1>

          </div>

          <!-- FORM GANTI PASSWORD -->
          <div class="flex-1 px-4 py-8 space-y-6">

            <div class="bg-white rounded-xl shadow-sm p-6 space-y-4 border border-primary/5">

              <div>
                <label class="block mb-1 font-medium text-gray-700">Password Sekarang</label>
                <input v-model="current_password" type="password" placeholder="Masukkan password lama"
                  class="w-full px-3 py-2 border rounded-lg focus:border-primary focus:outline-none" />
              </div>

              <div>
                <label class="block mb-1 font-medium text-gray-700">Password Baru</label>
                <input v-model="new_password" type="password" placeholder="Masukkan password baru"
                  class="w-full px-3 py-2 border rounded-lg focus:border-primary focus:outline-none" />
              </div>

              <div>
                <label class="block mb-1 font-medium text-gray-700">Konfirmasi Password Baru</label>
                <input v-model="new_password_confirmation" type="password" placeholder="Ulangi password baru"
                  class="w-full px-3 py-2 border rounded-lg focus:border-primary focus:outline-none" />
              </div>

              <button @click="submitChangePassword" :disabled="loading"
                class="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-70">
                <template v-if="!loading">Simpan</template>
                <template v-else>Loading...</template>
              </button>

              <p v-if="message" :class="{'text-green-600': success, 'text-red-600': !success}" class="text-center text-sm">
                {{ message }}
              </p>

            </div>

          </div>

        </div>

      </ion-content>
    </LayoutSiswa>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import LayoutSiswa from '@/layouts/LayoutSiswa.vue'
import api from '@/services/api'

const current_password = ref('')
const new_password = ref('')
const new_password_confirmation = ref('')

const message = ref('')
const success = ref(false)
const loading = ref(false)

const submitChangePassword = async () => {
  if (!current_password.value || !new_password.value || !new_password_confirmation.value) {
    message.value = 'Semua field harus diisi'
    success.value = false
    return
  }

  loading.value = true
  message.value = ''

  try {
    const res = await api.post('/change-password', {
      current_password: current_password.value,
      new_password: new_password.value,
      new_password_confirmation: new_password_confirmation.value
    })

    message.value = res.data.message
    success.value = true

    // reset form
    current_password.value = ''
    new_password.value = ''
    new_password_confirmation.value = ''

  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      message.value = err.response.data.message
    } else {
      message.value = 'Terjadi kesalahan, coba lagi'
    }
    success.value = false
  } finally {
    loading.value = false
  }
}
</script>
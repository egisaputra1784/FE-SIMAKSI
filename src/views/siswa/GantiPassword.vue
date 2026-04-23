<template>
  <ion-page>
    <LayoutSiswa>
      <ion-content :fullscreen="true" class="bg-background-light text-[#111318]">

        <div class="min-h-screen max-w-md mx-auto flex flex-col">

          <!-- HEADER -->
          <div class="sticky top-0 z-10 flex items-center
              bg-white/80 backdrop-blur-md
              px-4 py-3 border-b border-primary/10">

            <button @click="$router.back()" class="p-2 rounded-full bg-primary/10 text-primary mr-3">
              <span class="material-symbols-outlined">arrow_back</span>
            </button>

            <h1 class="flex-1 text-center text-lg font-bold tracking-tight pr-10">
              Ganti Password
            </h1>

          </div>

          <!-- FORM -->
          <div class="flex-1 px-4 py-8 space-y-6">

            <div class="bg-white rounded-xl shadow-sm p-6 space-y-4 border border-primary/5">

              <!-- Password Lama -->
              <div>
                <label class="block mb-1 font-medium text-gray-700">Password Sekarang</label>
                <input v-model="current_password" type="password" placeholder="Masukkan password lama"
                  class="w-full px-3 py-2 border rounded-lg focus:border-primary focus:outline-none" />
              </div>

              <!-- Password Baru -->
              <div>
                <label class="block mb-1 font-medium text-gray-700">Password Baru</label>
                <input v-model="new_password" type="password" placeholder="Masukkan password baru"
                  class="w-full px-3 py-2 border rounded-lg focus:border-primary focus:outline-none" />
              </div>

              <!-- Konfirmasi -->
              <div>
                <label class="block mb-1 font-medium text-gray-700">Konfirmasi Password Baru</label>
                <input v-model="new_password_confirmation" type="password" placeholder="Ulangi password baru"
                  class="w-full px-3 py-2 border rounded-lg focus:border-primary focus:outline-none" />
              </div>

              <!-- BUTTON -->
              <button @click="submitChangePassword" :disabled="loading" class="w-full py-3 bg-primary text-white font-semibold rounded-lg
                       hover:bg-primary/90 disabled:opacity-70 flex items-center justify-center gap-2">
                <template v-if="!loading">
                  <span class="material-symbols-outlined">lock_reset</span>
                  Simpan
                </template>

                <template v-else>
                  <ion-spinner name="crescent"></ion-spinner>
                  Processing...
                </template>
              </button>

            </div>

          </div>

        </div>

      </ion-content>
    </LayoutSiswa>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonSpinner } from '@ionic/vue'
import LayoutSiswa from '@/layouts/LayoutSiswa.vue'
import { ref } from 'vue'
import api from '@/services/api'
import { showNotify } from "@/stores/notify"

const current_password = ref('')
const new_password = ref('')
const new_password_confirmation = ref('')
const loading = ref(false)

const submitChangePassword = async () => {

  if (!current_password.value || !new_password.value || !new_password_confirmation.value) {
    showNotify("Semua field harus diisi", "error")
    return
  }

  if (new_password.value !== new_password_confirmation.value) {
    showNotify("Konfirmasi password tidak cocok", "error")
    return
  }

  loading.value = true

  try {

    const res = await api.post('/change-password', {
      current_password: current_password.value,
      new_password: new_password.value,
      new_password_confirmation: new_password_confirmation.value
    })

    showNotify(res.data.message || "Password berhasil diganti", "success")

    // reset form
    current_password.value = ''
    new_password.value = ''
    new_password_confirmation.value = ''

  } catch (err) {

    showNotify(
      err.response?.data?.message || "Terjadi kesalahan, coba lagi",
      "error"
    )

  } finally {
    loading.value = false
  }
}
</script>
<template>
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md md:max-w-2xl lg:max-w-4xl
              grid grid-cols-3 items-center text-center
              bg-white rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.06)] px-4 py-3 pb-5">

    <!-- kiri -->
    <NavItem to="/guru" icon="home" label="Beranda" />

    <!-- Tengah / FAB -->
    <div class="flex justify-center relative">
      <button @click="showModal = true" class="
        size-[64px] rounded-full bg-[#11245c] text-white shadow-xl shadow-[#11245c]/30
        flex items-center justify-center active:scale-95 transition-all
        absolute -top-[45px] left-1/2 -translate-x-1/2 border-[6px] border-white">
        <span class="material-symbols-outlined text-3xl font-light">
          add
        </span>
      </button>
    </div>

    <!-- kanan -->
    <NavItem to="/guru/profil" icon="person" label="Profil" />

    <!-- MODAL -->
    <div v-if="showModal" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-end justify-center z-[100]">
      <div class="bg-white rounded-t-[2.5rem] w-full max-w-md md:max-w-2xl lg:max-w-4xl p-8 space-y-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-slide-up">

        <h2 class="text-xl font-black text-center text-slate-800">
          Buka Sesi Absensi
        </h2>

        <div class="space-y-3">
          <button @click="bukaSesi" class="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all">
            Buka Sesi
          </button>

          <button @click="showModal = false" class="w-full py-4 bg-slate-50 text-slate-500 font-bold rounded-2xl active:scale-95 transition-all">
            Batal
          </button>
        </div>

      </div>
    </div>

  </nav>
</template>

<script setup>
import { ref } from 'vue'
import NavItem from './NavItem.vue'
import api from '@/services/api'
import { showNotify } from "@/stores/notify"

const showModal = ref(false)

const bukaSesi = async () => {
  try {

    const res = await api.post('/buka-absen')

    const sesiData = res.data

    localStorage.setItem('sesi', JSON.stringify(sesiData))

    showNotify(`Sesi ${sesiData.tipe} dibuka`, "success")

    showModal.value = false

  } catch (err) {

    console.error(err)

    showNotify(
      err.response?.data?.message || "Gagal buka sesi",
      "error"
    )
  }
}
</script>

<style>
@keyframes slide-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
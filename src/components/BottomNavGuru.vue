<template>
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px]
              grid grid-cols-3 items-center text-center
              border-t border-primary/10
              bg-white/95 backdrop-blur-lg px-4 py-3 pb-8">

    <!-- kiri -->
    <NavItem to="/guru" icon="home" label="Beranda" />

    <!-- tengah kosong (buat ruang FAB) -->
    <div></div>

    <!-- kanan -->
    <NavItem to="/guru/profil" icon="person" label="Profil" />

    <!-- FAB -->
    <button @click="showModal = true" class="absolute left-1/2 -translate-x-1/2 -top-7
       size-16 rounded-full
       bg-primary text-white
       flex items-center justify-center
       active:scale-95">
      <span class="material-symbols-outlined text-3xl">
        assignment_turned_in
      </span>
    </button>

    <!-- MODAL -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-end justify-center">
      <div class="bg-white rounded-t-2xl w-full max-w-[430px] p-5 space-y-4 shadow-lg animate-slide-up">
        <h2 class="text-lg font-bold text-center">Pilih tipe sesi</h2>

        <button @click="bukaSesi(2,'masuk')" class="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600">Jam Masuk</button>
        <button @click="bukaSesi(2,'mapel')" class="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">Mapel</button>
        <button @click="bukaSesi(2,'pulang')" class="w-full py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600">Jam Pulang</button>

        <button @click="showModal = false" class="w-full py-3 border border-gray-300 rounded-lg">Batal</button>
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

const bukaSesi = async (jadwalId, tipe) => {
  try {
    const res = await api.post(`/jadwal/${jadwalId}/buka-absen`, { tipe });

    const sesiData = res.data
    localStorage.setItem('sesi', JSON.stringify(sesiData))
    showNotify(`Sesi absen (${tipe}) dibuka`, "success")

    showModal.value = false
  } catch (err) {
    console.error(err)
    showNotify(err.response?.data?.message || "Gagal buka sesi absen", "error")
  }
}
</script>

<style>
@keyframes slide-up {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
</style>
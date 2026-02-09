<template>
  <LayoutMobile>

    <!-- TOP BAR -->
    <div class="flex items-center justify-between px-6 pt-6 pb-2 sticky top-0
                bg-background-light/80 backdrop-blur-md z-10">

      <div class="flex items-center gap-3">
        <div class="size-10 rounded-full bg-primary/10 border-2 border-white overflow-hidden"></div>

        <div>
          <p class="text-[10px] uppercase tracking-wider text-primary font-bold">Siswa</p>
          <h1 class="text-sm font-bold">SIMAKSI</h1>
        </div>
      </div>

      <button class="size-10 rounded-full bg-white shadow-sm flex items-center justify-center">
        <span class="material-symbols-outlined">notifications</span>
      </button>
    </div>


    <!-- GREETING -->
    <section class="px-6 pt-6 pb-4">
      <h2 class="text-3xl font-bold tracking-tight">
        Halo, {{ studentName }}
      </h2>
      <p class="text-gray-500 text-sm mt-1">
        {{ today }}
      </p>
    </section>


    <!-- SUMMARY -->
    <section class="px-6 mb-8">
      <div class="grid grid-cols-3 gap-3">

        <div class="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center">
          <span class="text-primary font-bold text-xl">2</span>
          <span class="text-[10px] uppercase text-gray-500 mt-1">Izin</span>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center">
          <span class="text-yellow-500 font-bold text-xl">1</span>
          <span class="text-[10px] uppercase text-gray-500 mt-1">Sakit</span>
        </div>

        <div class="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center">
          <span class="text-red-500 font-bold text-xl">0</span>
          <span class="text-[10px] uppercase text-gray-500 mt-1">Alpha</span>
        </div>

      </div>
    </section>


    <!-- SCAN BUTTON -->
    <section class="px-6 mb-8">
      <button
        class="w-full bg-primary py-8 rounded-2xl shadow-xl shadow-primary/20
               flex flex-col items-center gap-3 text-white active:scale-[0.98]">

        <div class="size-16 bg-white/20 rounded-full flex items-center justify-center">
          <span class="material-symbols-outlined text-4xl"
            style="font-variation-settings: 'FILL' 1">qr_code_scanner</span>
        </div>

        <div class="text-center">
          <p class="text-lg font-bold">Scan QR Absensi</p>
          <p class="text-xs text-white/70">Ketuk untuk mulai memindai</p>
        </div>
      </button>
    </section>


    <!-- SCHEDULE -->
    <section class="px-6 space-y-4 pb-28">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-bold">Jadwal Hari Ini</h3>
        <button class="text-xs font-bold text-primary">Lihat Semua</button>
      </div>


      <!-- Card aktif -->
      <div class="flex gap-4 rounded-xl bg-white p-4 shadow-sm border">
        <div class="flex-1 space-y-1">
          <span class="text-[10px] font-bold text-green-600 uppercase">
            Sedang Berlangsung
          </span>

          <p class="font-bold">Matematika Diskrit</p>
          <p class="text-xs text-gray-500">08:00 - 09:30 • Lab Komputer A</p>
        </div>
      </div>


      <!-- Card next -->
      <div class="flex gap-4 rounded-xl bg-white p-4 shadow-sm border opacity-70">
        <div class="flex-1 space-y-1">
          <span class="text-[10px] font-bold text-gray-400 uppercase">
            Selanjutnya
          </span>

          <p class="font-bold">Bahasa Inggris Teknik</p>
          <p class="text-xs text-gray-500">10:00 - 11:30 • Gedung B</p>
        </div>
      </div>

    </section>


    <!-- BOTTOM NAV -->
    <nav
      class="fixed bottom-0 left-0 right-0
       bg-white/90 backdrop-blur-lg border-t px-8 py-3
       flex justify-between">


      <button class="flex flex-col items-center text-primary text-[10px] font-bold">
        <span class="material-symbols-outlined"
          style="font-variation-settings:'FILL'1">home</span>
        Beranda
      </button>

      <button class="flex flex-col items-center text-gray-400 text-[10px]">
        <span class="material-symbols-outlined">calendar_today</span>
        Jadwal
      </button>

      <button class="flex flex-col items-center text-gray-400 text-[10px]">
        <span class="material-symbols-outlined">history</span>
        Riwayat
      </button>

      <button class="flex flex-col items-center text-gray-400 text-[10px]">
        <span class="material-symbols-outlined">person</span>
        Profil
      </button>
    </nav>

  </LayoutMobile>
</template>


<script setup>
import LayoutMobile from '@/layouts/LayoutMobile.vue'

const studentName = 'Budi'
const today = new Date().toLocaleDateString('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
</script>

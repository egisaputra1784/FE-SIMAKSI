<template>
  <LayoutMobile>
    <!-- HEADER -->
    <header
      class="sticky top-0 z-50 flex items-center justify-between
             bg-white/95 backdrop-blur-md
             px-5 py-4 border-b border-primary/10">

      <div class="flex items-center gap-3">
        <!-- avatar -->
        <div class="size-12 rounded-full overflow-hidden border-2 border-primary/20">
          <img
            src="https://i.pravatar.cc/100?img=47"
            class="w-full h-full object-cover"
          />
        </div>

        <div>
          <p class="text-primary/70 text-xs font-semibold uppercase tracking-wider">
            Selamat Pagi
          </p>
          <h2 class="text-lg font-bold">{{ guruName }}</h2>
        </div>
      </div>

      <!-- notif -->
      <button
        class="relative size-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
        <span class="material-symbols-outlined text-2xl">notifications</span>
        <span class="absolute top-3 right-3 size-2.5 rounded-full bg-red-500"></span>
      </button>
    </header>

    <!-- MAIN -->
    <main class="pb-28">

      <!-- ===== STATS ===== -->
      <section class="px-5 pt-6">
        <div class="grid grid-cols-3 gap-3">

          <div class="rounded-xl p-4 text-center bg-primary/5 border border-primary/10">
            <p class="text-xs mb-1 opacity-60">Total</p>
            <p class="text-2xl font-bold text-primary">32</p>
          </div>

          <div class="rounded-xl p-4 text-center bg-green-50 border border-green-100">
            <p class="text-xs mb-1 text-green-700/60">Hadir</p>
            <p class="text-2xl font-bold text-green-600">28</p>
          </div>

          <div class="rounded-xl p-4 text-center bg-red-50 border border-red-100">
            <p class="text-xs mb-1 text-red-700/60">Absen</p>
            <p class="text-2xl font-bold text-red-500">4</p>
          </div>

        </div>
      </section>

      <!-- ===== AKSI CEPAT ===== -->
      <section class="px-5 pt-8 space-y-4">
        <h3 class="text-xl font-bold">Aksi Cepat</h3>

        <!-- QR BIG BUTTON -->
        <button
          @click="$router.push('/guru/qr')"
          class="group w-full flex items-center justify-between
                 bg-primary text-white p-5 rounded-2xl
                 shadow-lg shadow-primary/20 active:scale-95">

          <div class="flex items-center gap-4">
            <div class="size-14 bg-white/20 rounded-xl flex items-center justify-center">
              <span class="material-symbols-outlined text-3xl">qr_code_scanner</span>
            </div>

            <div class="text-left">
              <p class="font-bold text-lg">Buat Kode QR</p>
              <p class="text-sm opacity-70">Presensi Otomatis Siswa</p>
            </div>
          </div>

          <span class="material-symbols-outlined opacity-60">chevron_right</span>
        </button>

        <!-- 2 small buttons -->
        <div class="grid grid-cols-2 gap-4">

          <button
            @click="$router.push('/guru/manual')"
            class="bg-white border-2 border-primary/10 rounded-2xl p-5 active:scale-95">

            <span class="material-symbols-outlined text-primary text-3xl mb-3 block">
              edit_document
            </span>
            <p class="font-bold">Absensi Manual</p>
          </button>

          <button
            @click="$router.push('/guru/rekap')"
            class="bg-white border-2 border-primary/10 rounded-2xl p-5 active:scale-95">

            <span class="material-symbols-outlined text-primary text-3xl mb-3 block">
              summarize
            </span>
            <p class="font-bold">Rekap Kelas</p>
          </button>

        </div>
      </section>

      <!-- ===== JADWAL ===== -->
      <section class="px-5 pt-8 space-y-4">
        <h3 class="text-xl font-bold">Jadwal Hari Ini</h3>

        <div class="bg-primary/[0.04] border border-primary/20 rounded-xl p-4">
          <p class="text-xs text-primary font-semibold">Sedang Berlangsung</p>
          <p class="font-bold text-lg">Matematika • 10A</p>
          <p class="text-sm opacity-60">08:00 - 09:30</p>
        </div>

        <div class="bg-white border rounded-xl p-4">
          <p class="font-bold">Fisika • 11B</p>
          <p class="text-sm opacity-60">10:00 - 11:30</p>
        </div>
      </section>

    </main>
  </LayoutMobile>
</template>

<script setup>
import LayoutMobile from '@/layouts/LayoutMobile.vue'
const guruName = 'Ibu Sarah, M.Pd.'
</script>

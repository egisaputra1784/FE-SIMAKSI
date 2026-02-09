<template>
  <LayoutMobile>
    <div class="p-6 space-y-6">

      <h1 class="text-xl font-bold">Kode QR Absensi</h1>

      <div class="bg-white rounded-2xl p-8 flex justify-center shadow">
        <div class="size-48 bg-slate-200 rounded-xl flex items-center justify-center">
          QR HERE
        </div>
      </div>

      <button class="w-full bg-primary text-white p-4 rounded-xl">
        Generate Ulang
      </button>

    </div>
  </LayoutMobile>
</template>

<script setup>
import LayoutMobile from '@/layouts/LayoutMobile.vue'
</script>

<template>
  <LayoutMobile>
    <div class="p-6 space-y-6">

      <div class="flex items-center gap-3">
        <button @click="goBack" class="size-9 bg-white rounded-full shadow flex items-center justify-center">

          <span class="material-symbols-outlined">arrow_back</span>
        </button>

        <h1 class="text-xl font-bold">Rekap Absen</h1>
      </div>

      <div class="grid grid-cols-3 gap-3">

        <div class="bg-green-50 p-4 rounded-xl text-center">
          <p class="text-sm">Hadir</p>
          <p class="text-xl font-bold text-green-600">80%</p>
        </div>

        <div class="bg-yellow-50 p-4 rounded-xl text-center">
          <p class="text-sm">Izin</p>
          <p class="text-xl font-bold text-yellow-600">10%</p>
        </div>

        <div class="bg-red-50 p-4 rounded-xl text-center">
          <p class="text-sm">Alpha</p>
          <p class="text-xl font-bold text-red-600">10%</p>
        </div>

      </div>

      <div class="space-y-3">
        <div class="bg-white p-4 rounded-xl shadow">
          10A • 28 hadir • 4 absen
        </div>
        <div class="bg-white p-4 rounded-xl shadow">
          10B • 30 hadir • 2 absen
        </div>
      </div>

    </div>
  </LayoutMobile>
</template>

<script setup>
import { useRouter } from 'vue-router'
import LayoutMobile from '@/layouts/LayoutMobile.vue'

const router = useRouter()

const goBack = () => router.back()
</script>

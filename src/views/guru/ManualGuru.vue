<template>
  <LayoutMobile>
    <div class="p-6 space-y-4">

      <h1 class="text-xl font-bold">Absensi Manual</h1>

      <div
        v-for="s in students"
        :key="s.id"
        class="flex justify-between items-center bg-white p-4 rounded-xl shadow">

        <span>{{ s.name }}</span>

        <select class="border rounded-lg p-2">
          <option>Hadir</option>
          <option>Izin</option>
          <option>Sakit</option>
          <option>Alpha</option>
        </select>
      </div>

      <button class="w-full bg-primary text-white p-4 rounded-xl">
        Simpan
      </button>

    </div>
  </LayoutMobile>
</template>

<script setup>
import LayoutMobile from '@/layouts/LayoutMobile.vue'

const students = [
  { id: 1, name: 'Budi' },
  { id: 2, name: 'Andi' },
  { id: 3, name: 'Siti' }
]
</script>

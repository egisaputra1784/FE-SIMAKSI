<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen flex justify-center">
    <div class="relative w-full max-w-[430px] min-h-screen bg-white dark:bg-background-dark shadow-2xl overflow-x-hidden">
      <slot />
      <BottomNav />
    </div>
  </div>
</template>

<script setup>
import BottomNav from '@/components/BottomNav.vue'
</script>

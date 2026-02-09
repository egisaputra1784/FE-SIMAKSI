<template>
  <div class="min-h-screen w-full bg-background-light flex justify-center">
    <div class="w-full max-w-[430px] min-h-screen relative">
      <slot />
    </div>
  </div>
</template>


<script setup>
import BottomNav from '@/components/BottomNav.vue'
</script>

<template>
  <LayoutMobile>
    <slot />
    <BottomNavSiswa />
  </LayoutMobile>
</template>

<script setup>
import LayoutMobile from './LayoutMobile.vue'
import BottomNavSiswa from '@/components/BottomNavSiswa.vue'
</script>

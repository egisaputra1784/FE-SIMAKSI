<template>
  <LayoutMobile>
    <slot />
    <BottomNavGuru />
  </LayoutMobile>
</template>

<script setup>
import LayoutMobile from './LayoutMobile.vue'
import BottomNavGuru from '@/components/BottomNavGuru.vue'
</script>

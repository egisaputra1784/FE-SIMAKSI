<template>
  <ion-page>
  <LayoutMobile>
    <slot />
    <BottomNavGuru />
  </LayoutMobile>
  </ion-page>
</template>

<script setup>
import LayoutMobile from './LayoutMobile.vue'
import BottomNavGuru from '@/components/BottomNavGuru.vue'
</script>

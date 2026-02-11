<template>
  <ion-page>
  <LayoutMobile>
    <slot />
    <BottomNavSiswa />
  </LayoutMobile>
  </ion-page>
</template>

<script setup>
import LayoutMobile from './LayoutMobile.vue'
import BottomNavSiswa from '@/components/BottomNavSiswa.vue'
</script>

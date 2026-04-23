<template>
  <ion-page>
  <div class="min-h-screen w-full bg-background-light flex justify-center">
    <div class="w-full max-w-md md:max-w-2xl lg:max-w-4xl min-h-screen relative md:border-x md:border-primary/10 bg-white">
      <slot />
    </div>
  </div>
  </ion-page>
</template>


<script setup>
import { IonPage } from '@ionic/vue'
</script>

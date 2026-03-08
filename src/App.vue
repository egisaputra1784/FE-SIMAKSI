<template>
  <ion-app>

    <ion-router-outlet />

    <AppNotification />

  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import AppNotification from '@/components/AppNotification.vue'
</script>
<template>
  <ion-page>
  <nav
    class="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px]
           flex justify-around border-t border-primary/10
           bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg px-2 py-3 pb-8">

    <NavItem to="/guru" icon="home" label="Beranda" />
    <NavItem to="/guru/riwayat" icon="history" label="Riwayat" />
    <NavItem to="/guru/laporan" icon="analytics" label="Laporan" />
    <NavItem to="/guru/profil" icon="person" label="Profil" />
  </nav>
  </ion-page>
</template>


<script setup>
import NavItem from './NavItem.vue'
</script>

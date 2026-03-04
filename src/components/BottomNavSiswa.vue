<template>
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px]
              grid grid-cols-4 items-center text-center
              border-t border-primary/10
              bg-white/95 backdrop-blur-lg px-4 py-3 pb-8">

    <NavItem to="/murid" icon="home" label="Beranda" />
    <NavItem to="/murid/jadwal" icon="analytics" label="Jadwal" />
    <NavItem to="/murid/riwayat" icon="history" label="Riwayat" />
    <NavItem to="/murid/profil" icon="person" label="Profil" />
  </nav>
</template>


<script setup>
import NavItem from './NavItem.vue'
</script>

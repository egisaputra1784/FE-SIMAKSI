<template>
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md md:max-w-2xl lg:max-w-4xl
              grid grid-cols-4 items-center text-center
              bg-white rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.06)] px-4 py-3 pb-5">

    <NavItem to="/murid" icon="home" label="Beranda" />
    <NavItem to="/murid/jadwal" icon="analytics" label="Jadwal" />
    <NavItem to="/murid/point" icon="stars" label="Point" />
    <NavItem to="/murid/profil" icon="person" label="Profil" />

  </nav>
</template>

<script setup>
import NavItem from './NavItem.vue'
</script>
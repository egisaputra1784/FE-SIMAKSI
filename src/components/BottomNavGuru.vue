<template>
  <nav
    class="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px]
           grid grid-cols-3 items-center text-center
           border-t border-primary/10
           bg-white/95 backdrop-blur-lg px-4 py-3 pb-8">

    <!-- kiri -->
    <NavItem to="/guru" icon="home" label="Beranda" />

    <!-- tengah kosong (buat ruang FAB) -->
    <div></div>

    <!-- kanan -->
    <NavItem to="/guru/profil" icon="person" label="Profil" />

    <!-- FAB -->
    <button
      @click="$router.push('/guru/sesi')"
      class="absolute left-1/2 -translate-x-1/2 -top-7
             size-16 rounded-full
             bg-primary text-white
             flex items-center justify-center
             active:scale-95">

      <span class="material-symbols-outlined text-3xl">
        assignment_turned_in
      </span>
    </button>

  </nav>
</template>

<script setup>
import NavItem from './NavItem.vue'
</script>

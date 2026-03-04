<template>
  <router-link
    :to="to"
    class="flex flex-col items-center gap-1 text-slate-400"
    active-class="text-primary">

    <span class="material-symbols-outlined">{{ icon }}</span>
    <span class="text-[10px] font-bold uppercase tracking-widest">{{ label }}</span>
  </router-link>
</template>

<script setup>
defineProps(['to', 'icon', 'label'])
</script>

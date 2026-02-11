<template>
  <ion-page>
  <button
    class="w-full flex items-center gap-4
           bg-white p-4 rounded-xl
           border border-primary/10 shadow-sm
           active:scale-95 transition">

    <div
      class="size-12 rounded-lg bg-primary/10
             text-primary flex items-center justify-center">

      <span class="material-symbols-outlined">
        {{ icon }}
      </span>
    </div>

    <div class="flex-1 text-left">
      <p class="font-bold text-sm text-primary">{{ title }}</p>
      <p class="text-xs text-slate-400">{{ subtitle }}</p>
    </div>

    <span class="material-symbols-outlined text-slate-400">
      chevron_right
    </span>
  </button>
</ion-page>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  subtitle: String
})
</script>

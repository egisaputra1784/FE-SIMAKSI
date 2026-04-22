<template>

  <div v-if="notify.show" class="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">

    <div class="px-6 py-3 rounded-xl shadow-xl text-white text-sm font-semibold animate-fade-in" :class="color">

      {{ notify.message }}

    </div>

  </div>

</template>

<script setup>

import { computed } from "vue"
import { notifyState as notify } from "@/stores/notify"

const color = computed(() => {

  if (notify.type === "success") return "bg-green-500"
  if (notify.type === "error") return "bg-red-500"
  if (notify.type === "warning") return "bg-yellow-500"
  return "bg-blue-500"

})

</script>
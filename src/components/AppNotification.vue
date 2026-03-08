<template>

  <div v-if="notify.show"
       class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">

    <div
      class="px-6 py-4 rounded-xl shadow-xl text-white text-sm font-semibold
             animate-bounce"
      :class="color">

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
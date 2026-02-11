<template>
  <ion-page>
  <div class="rounded-xl p-4 text-center border" :class="styleClass">
    <p class="text-xs mb-1">{{ title }}</p>
    <p class="text-2xl font-bold">{{ value }}</p>
  </div>
  </ion-page>
</template>

<script setup>
const props = defineProps(['title', 'value', 'color'])

const styleClass = {
  green: 'bg-green-50 border-green-100 text-green-600',
  red: 'bg-red-50 border-red-100 text-red-500'
}[props.color] || 'bg-primary/5 border-primary/10 text-primary'
</script>

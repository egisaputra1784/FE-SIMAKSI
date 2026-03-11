<template>
  <ion-page>
    <ion-content :fullscreen="true" class="bg-black text-white">

      <!-- CAMERA BACKGROUND SIMULATION -->
      <div class="fixed inset-0 z-0">
        <div class="absolute inset-0 bg-neutral-900"></div>
        <div class="absolute inset-0 bg-black/40"></div>
      </div>

      <!-- UI OVERLAY -->
      <div class="relative z-10 flex flex-col h-screen">

        <!-- TOP BAR -->
        <div class="flex items-center justify-between p-6 pt-12 backdrop-blur-md bg-white/10">
          <button
            @click="goBack"
            class="size-10 flex items-center justify-center rounded-full bg-black/40 active:scale-95">
            <span class="material-symbols-outlined" style="color: white">arrow_back_ios_new</span>
          </button>

          <h1 class="text-lg font-semibold tracking-tight" style="color: white">
            Absensi QR
          </h1>

          <div class="size-10"></div> <!-- placeholder supaya tengah tetap centered -->
        </div>

        <!-- CENTER -->
        <div class="flex-1 flex flex-col items-center justify-center -translate-y-10 px-6">

          <div class="mb-8 text-center space-y-2 text-white/70">
            <h2 class="text-xl font-bold">
              Arahkan kamera ke QR Code
            </h2>
            <p class="text-sm text-white/70">
              Posisikan kode di dalam kotak
            </p>
          </div>

          <!-- SCANNER FRAME -->
          <div id="qr-reader" class="relative w-[260px] h-[270px] mb-12">

            <!-- Corners -->
            <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
            <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
            <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
            <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl"></div>

            <!-- Animated Scan Line -->
            <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan"></div>

            <!-- Inner border -->
            <div class="w-full h-full border border-white/20 rounded-xl"></div>
          </div>

        </div>

        <!-- SAFE AREA -->
        <div class="h-6"></div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue'
import { useRouter } from 'vue-router' 
import { Html5Qrcode } from "html5-qrcode"
import api from "@/services/api"
import { onMounted, onBeforeUnmount, ref } from "vue"
import { showNotify } from "@/stores/notify"

const router = useRouter()
const goBack = () => router.back()

const scanner = ref(null)
const scanning = ref(false)

const startScanner = async () => {
  const qrRegionId = "qr-reader"
  scanner.value = new Html5Qrcode(qrRegionId)
  try {
    await scanner.value.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      async (decodedText) => {
        if (scanning.value) return
        scanning.value = true
        await handleScan(decodedText)
      }
    )
  } catch (err) {
    showNotify("Tidak Bisa Akses Kamera", "error")
  }
}

const handleScan = async (token) => {
  try {
    const res = await api.post("/absensi/scan", { token })
    alert(res.data.message)
    showNotify("berhasil scan", "success")
  } catch (err) {
    showNotify(
      err.response?.data?.message || "scan gagal",
      "error"
    )
  } finally {
    stopScanner()
  }
}

const stopScanner = async () => {
  if (scanner.value) {
    await scanner.value.stop()
    await scanner.value.clear()
    scanner.value = null
  }
}

onMounted(() => startScanner())
onBeforeUnmount(() => stopScanner())
</script>

<style scoped>
@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

.animate-scan {
  animation: scan 3s linear infinite;
}

#qr-reader video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  border-radius: 12px;
}
</style>
<template>
  <ion-page class="bg-gray-50 min-h-screen">
    <LayoutSiswa>
      <ion-content>
        <div class="p-6 space-y-6">
          <h1 class="text-2xl font-bold">Jadwal Minggu Ini</h1>

          <div v-if="loading" class="text-center py-10">Loading jadwal...</div>

          <div v-else>
            <div v-for="hariItem in jadwalMinggu" :key="hariItem.tanggal" class="bg-white rounded-lg p-4 shadow-sm">
              <div class="flex justify-between items-center mb-3">
                <h2 class="font-semibold text-lg">
                  {{ capitalize(hariItem.hari) }} - {{ hariItem.tanggal }}
                </h2>
                <span v-if="hariItem.jadwal.length === 0" class="text-sm text-gray-400">Libur / Tidak ada jadwal</span>
              </div>

              <div v-if="hariItem.jadwal.length > 0" class="space-y-2">
                <div v-for="j in hariItem.jadwal" :key="j.jadwal_id"
                  class="p-3 rounded-md border border-gray-200 hover:bg-gray-50 flex justify-between items-center">
                  <div>
                    <p class="font-medium">{{ j.mapel }} - {{ j.kelas }}</p>
                    <p class="text-sm text-gray-500">Guru: {{ j.guru }}</p>
                    <p class="text-sm text-gray-500">
                      {{ j.jam_mulai }} - {{ j.jam_selesai }}
                    </p>
                  </div>
                  <div>
                    <span v-if="j.sudah_absen" :class="{
                      'bg-green-100 text-green-700': j.status_absen === 'hadir',
                      'bg-yellow-100 text-yellow-700': j.status_absen === 'izin' || j.status_absen === 'sakit',
                      'bg-red-100 text-red-700': j.status_absen === 'alpha'
                    }" class="px-2 py-1 rounded-full text-xs font-semibold">
                      {{ j.status_absen || "Absen" }}
                    </span>

                    <span v-else class="px-2 py-1 rounded-full bg-gray-200 text-gray-600 text-xs font-semibold">
                      Belum absen
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ion-content>
    </LayoutSiswa>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { IonPage, IonContent } from '@ionic/vue'
import api from "@/services/api"; // pake api.js lo biar otomatis pake baseURL + token
import LayoutSiswa from "@/layouts/LayoutSiswa.vue";

const jadwalMinggu = ref([]);
const loading = ref(true);

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function fetchJadwal() {
  loading.value = true;
  try {
    const res = await api.get("/murid/jadwal-minggu"); // endpoint sesuai api.js
    jadwalMinggu.value = res.data.data;
  } catch (err) {
    console.error(err);
    jadwalMinggu.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchJadwal();
});
</script>
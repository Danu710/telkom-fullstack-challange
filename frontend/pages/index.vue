<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';

const route = useRoute();
const router = useRouter();

const page = computed(() => Number(route.query.page) || 1);
const searchQuery = ref(route.query.propinsi || '', 500);
const kabKota = ref(route.query.kab_kota || '');
const kecamatan = ref(route.query.kecamatan || '');
const kelurahan = ref(route.query.kelurahan || '');
const nama = ref(route.query.nama || '');

const debouncedUpdateSearch = useDebounceFn(() => {
  router.push({
    path: '/regions',
    query: {
      propinsi: searchQuery.value,
      kab_kota: kabKota.value,
      kecamatan: kecamatan.value,
      kelurahan: kelurahan.value,
      nama: nama.value,
      page: 1,
    },
  });
}, 500);

watchEffect(() => {
  debouncedUpdateSearch(searchQuery.value);
});

const url = computed(() => {
  const queryParams = new URLSearchParams({
    page: page.value,
    limit: 5,
  });

  if (searchQuery.value) queryParams.append('propinsi', searchQuery.value);
  if (kabKota.value) queryParams.append('kab_kota', kabKota.value);
  if (kecamatan.value) queryParams.append('kecamatan', kecamatan.value);
  if (kelurahan.value) queryParams.append('kelurahan', kelurahan.value);
  if (nama.value) queryParams.append('nama', nama.value);

  return `http://localhost:4501/api/regions?${queryParams.toString()}`;
});

const { data, error, pending, refresh } = useFetch(url);

watchEffect(() => {
  refresh();
});

const changePage = (newPage) => {
  router.push({
    path: '/regions',
    query: {
      propinsi: searchQuery.value,
      kab_kota: kabKota.value,
      kecamatan: kecamatan.value,
      kelurahan: kelurahan.value,
      nama: nama.value,
      page: newPage,
    },
  });
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6" md="8">
        <img
          src="https://s3.oss.go.id/oss/cms/OSS-LOGO-NEW-2024-ID-c39d5a64d376bdcb60bae5f61ce15848.svg"
          alt="OSS Logo"
          width="200"
          height="auto" />
      </v-col>
      <v-col cols="6" md="8">
        <v-card class="pa-4">
          <v-card-title class="text-h5">Region</v-card-title>

          <v-text-field v-model="searchQuery" label="Provinsi" clearable />

          <v-text-field v-model="kabKota" label="Kab/Kota" clearable />

          <v-text-field v-model="kecamatan" label="Kecamatan" clearable />

          <v-text-field v-model="kelurahan" label="Kelurahan" clearable />

          <v-text-field v-model="nama" label="Nama" clearable />

          <v-alert v-if="pending" type="info" variant="outlined">
            Loading data...
          </v-alert>

          <v-alert v-else-if="error" type="error" variant="outlined">
            Error fetching data...
          </v-alert>

          <v-list v-else>
            <AgencyList :users="data?.data || []" />
          </v-list>

          <Pagination
            :currentPage="data?.pagination?.currentPage || 1"
            :totalPages="data?.pagination?.totalPages || 1"
            @changePage="changePage" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

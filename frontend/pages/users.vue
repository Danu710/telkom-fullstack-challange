<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';

const router = useRouter();
const route = useRoute();

const page = computed(() => Number(route.query.page) || 1);
const searchQuery = ref(route.query.q || '');

// Debounce function (runs after 500ms delay)
const debouncedUpdateSearch = useDebounceFn((query) => {
  router.push({ path: '/users', query: { q: query, page: 1 } });
}, 500);

// Watch search input changes and debounce API calls
watchEffect(() => {
  debouncedUpdateSearch(searchQuery.value);
});

// API URL with search & pagination
const url = computed(
  () =>
    `http://localhost:4501/api/users?q=${searchQuery.value}&page=${page.value}&limit=5`
);

const { data, error, pending, refresh } = useFetch(url);

watchEffect(() => {
  refresh();
});

// Change page function
const changePage = (newPage) => {
  router.push({
    path: '/users',
    query: { q: searchQuery.value, page: newPage },
  });
};
</script>

<template>
  <v-container>
    <!-- Search Input -->
    <v-col cols="6" md="8">
      <img
        src="https://s3.oss.go.id/oss/cms/OSS-LOGO-NEW-2024-ID-c39d5a64d376bdcb60bae5f61ce15848.svg"
        alt="OSS Logo"
        width="200"
        height="auto" />
    </v-col>
    <v-card-title class="text-h5">Region</v-card-title>
    <v-text-field v-model="searchQuery" label="Search users" clearable />

    <!-- Display Users -->
    <v-table v-if="data">
      <AgencyList :users="data.data || []" />
    </v-table>

    <!-- Pagination Component -->
    <Pagination
      :currentPage="data?.pagination?.currentPage || 1"
      :totalPages="data?.pagination?.totalPages || 1"
      @changePage="changePage" />
  </v-container>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const page = ref(props.currentPage);

watchEffect(() => {
  page.value = props.currentPage;
});

const changePage = (newPage) => {
  router.push({ path: '/regions', query: { page: newPage } });
};
</script>

<template>
  <v-container>
    <v-row justify="center" class="mt-4">
      <v-pagination
        v-model="page"
        :length="totalPages"
        :total-visible="5"
        color="primary"
        @update:modelValue="changePage" />
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  users: Array,
});
</script>

<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Nama</th>
          <th class="text-left">Provinsi</th>
          <th class="text-left">Kab/Kota</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.region_id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.nama }}</td>
          <td>{{ user.propinsi }}</td>
          <td>{{ user.kab_kota }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

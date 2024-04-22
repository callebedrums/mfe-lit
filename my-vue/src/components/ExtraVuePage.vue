<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
</script>

<template>
  <h1>Extra Vue page</h1>

  <div class="card">
    <label for="name">
      Type your name:
      <input id="name" name="name" type="text" v-model="name" />
    </label>
  </div>

  <p>Hello {{ name }}!</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

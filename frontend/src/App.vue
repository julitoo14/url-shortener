<script setup>
import Navbar from './components/Navbar.vue';

</script>
<template>
  <div class="bg-main min-h-screen">
    <Navbar />
    <RouterView class='overflow-auto'/>
  </div>
</template>
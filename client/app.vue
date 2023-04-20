<template>
    <div class="min-h-screen bg-gray-50 text-gray-950">
        <Navbar />
        <NuxtPage />
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

import Navbar from "./components/Navbar.vue";

onMounted(() => initFlowbite())
</script>
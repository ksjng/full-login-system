<template>
    <main class="min-h-screen bg-gray-50 text-gray-950">
        <NuxtPage />
    </main>
</template>

<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => initFlowbite())
</script>
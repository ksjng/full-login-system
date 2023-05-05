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

const authRoutes = ["/login", "/register", "/recover"];

const router = useRouter();

// https://www.30secondsofcode.org/js/s/parse-cookie/
const parseCookie = str =>
    str
        .split(";")
        .map(v => v.split("="))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
    }, {});

const redirectToDashboard = async (path) => {

    if(!authRoutes.includes(path)) return;

    const cookies = parseCookie(document.cookie);
    if(cookies["authorization"]) return await navigateTo("/dashboard");

}

onMounted(() => {

    initFlowbite();

    redirectToDashboard(router.currentRoute.value.path);

    router.beforeEach(async (to, from) => {
        if(to.path == from.path) return;
        redirectToDashboard(to.path);
    });

});


</script>
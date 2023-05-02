<template>

    <div class="pt-20 container max-w-screen-xl mx-auto px-5">
        
        <section>
            <p class="mt-5 text-center text-xl text-gray-800">Hello, <span class="text-4xl font-medium underline decoration-6 decoration-blue-600">{{ user.username }}</span></p>
        </section>

        <section class="text-center mt-8 flex">

            <ChangePassword />

            <div class="flex-1">test</div>

        </section>

    </div>

</template>


<script setup>

import { ref, onMounted } from "vue";

import ChangePassword from "../components/dashboard/ChangePassword.vue";

const user = ref({});

onMounted(async () => {

    try {
        const res = await fetch("/api/user/me");

        if(res.status == 401) return await navigateTo("/login");

        if(!res.ok) throw new Error("Failed to connect with API server");
        const body = await res.json();
        
        user.value = body.data;

    } catch(err) {
        console.error(err);
    }

});

</script>
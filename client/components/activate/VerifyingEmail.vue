<template>

    <div class="text-center">

        <h1 class="font-medium text-4xl my-5">{{ status }}</h1>

        <p>{{ message }}</p>

        <button v-if="status == 'Email verified'" @click="navigateTo('/login')" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log in</button> 

    </div>

</template>


<script setup>

import { ref, onMounted } from "vue";

const status = ref("Verifying...");
const message = ref("");

const route = useRoute();

onMounted(async () => {

    if(!route.query.token) return;

    try {

        const res = await fetch(`/api/user/auth/activate-email?token=${route.query.token}`);
        if(!res.ok) throw new Error("Failed to connect with API server");

        const body = await res.json();
        if(!body.success) throw new Error(body.error);

        status.value = "Email verified";
        message.value = "Now you can log in to your account";

    } catch(err) {
        console.error(err);
        status.value = "Error";
        message.value = err.message;
    }

});

</script>
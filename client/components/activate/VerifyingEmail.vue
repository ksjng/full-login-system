<template>

    <div>

        <h1 class="font-medium text-4xl my-5">{{ status }}</h1>

        <p>{{ error }}</p>

        <!--<button data-modal-target="resend-activation-modal" data-modal-toggle="resend-activation-modal" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Resend activation link</button> 
-->
    </div>

</template>


<script setup>

import { ref, onMounted } from "vue";

const status = ref("Verifying...");
const error = ref("");

onMounted(async () => {

    if(!route.query.token) return;

    try {

        const res = await fetch(`/api/auth/activate-email?token=${route.query.token}`);
        if(!res.ok) throw new Error("Failed to connect with API server");

        const body = await res.json();
        if(!body.success) throw new Error(body.error);

        return status.value = "Email verified";

    } catch(err) {
        console.error(err);
        error.value = err.message;
    }

});

</script>
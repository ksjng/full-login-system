<template>
    
    <main class="grid place-items-center min-h-screen m-auto">
        <div class="max-w-prose w-full p-5 mt-10">

            <VerifyingEmail v-if="route.query.token" />

            <ResendEmail v-else />

        </div>
    </main>

</template>


<script setup>

import ResendEmail from "../components/activate/ResendEmail.vue";
import VerifyingEmail from "../components/activate/VerifyingEmail.vue";

const route = useRoute();

</script>
<template>
    
    <main class="grid place-items-center min-h-screen m-auto">
        <div class="max-w-prose w-full p-5 mt-10">

            <SetNewPassword v-if="route.query.token" />

            <ProvideEmail v-else />

        </div>
    </main>

</template>


<script setup>

import SetNewPassword from "../components/recover/SetNewPassword.vue";
import ProvideEmail from "../components/recover/ProvideEmail.vue";

const route = useRoute();

</script>
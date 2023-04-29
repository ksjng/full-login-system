<template>

    <div>

        <h1 class="font-medium text-4xl my-5">Recover password</h1>

        <p class="mb-3">Enter the email address associated with your account. We will send a link to it that will allow you to set a new password.</p>

        <div v-if="error" class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <p>{{ error }}</p>
        </div>

        <form @submit.prevent="submitRecoverForm" class="mt-5">

            <div class="mb-4">
                <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input 
                    v-model="recoverFormData.email"
                    @change="v$.email.$touch"  
                    type="email" 
                    name="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :class="{
                        'border-red-500 focus:border-red-500': v$.email.$error,
                        'border-[#42d392] ': !v$.email.$invalid
                    }"  
                >
                <span class="text-xs text-red-500" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
            </div>

            <vue-hcaptcha :sitekey="config.public.hCaptchaSiteKey" @verify="captchaVerify"></vue-hcaptcha>
            <span class="text-xs text-red-500" v-if="v$.captcha.$error">{{ v$.captcha.$errors[0].$message }}</span>

            <button type="submit" class="float-right my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send recovery email</button>

        </form>

    </div>

</template>

<script setup>

import { ref, reactive } from "vue";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";

const config = useRuntimeConfig();

const recoverFormData = reactive({
    email: "",
    captcha: null
});

const rules = computed(() => {
    return {
        email: {
            required: helpers.withMessage("The email field is required", required),
            email: helpers.withMessage("Invalid email format", email)
        },
        captcha: {
            required: helpers.withMessage("Captcha is required", required)
        }
    }
});

const v$ = useVuelidate(rules, recoverFormData);

const captchaVerify = (tokenStr) => {
    recoverFormData.captcha = tokenStr;
}

const error = ref("");

const submitRecoverForm = async () => {

    v$.value.$validate();
    if(v$.value.$error) return;

    error.value = "";

    try {

        const res = await fetch("/api/user/recover/reset-request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recoverFormData)
        })

        if(!res.ok) throw new Error("Failed to connect with API server");
        const body = await res.json();

        if(!body.success) throw new Error(body.error);

        console.log(body)

    } catch(err) {
        console.error(err);
        error.value = err.message;
    }

}

</script>
<template>
    
    <main class="grid place-items-center min-h-screen m-auto">

        <div class="max-w-prose w-full p-5 mt-10">

            <h1 class="font-medium text-4xl my-5">Sign up</h1>

            <div v-if="error" class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <p>{{ error }}</p>
            </div>

            <form @submit.prevent="submitRegisterForm">

                <div class="mb-4">
                    <label for="username" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input 
                        v-model="registerFormData.username" 
                        @change="v$.username.$touch" 
                        type="text" 
                        name="username"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{
                            'border-red-500 focus:border-red-500': v$.username.$error,
                            'border-[#42d392] ': !v$.username.$invalid
                        }"
                    >
                    <span class="text-xs text-red-500" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</span>
                </div>

                <div class="mb-4">
                    <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input 
                        v-model="registerFormData.email" 
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

                <div class="mb-4">
                    <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input 
                        v-model="registerFormData.password" 
                        @change="v$.password.$touch" 
                        type="password" 
                        name="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{
                            'border-red-500 focus:border-red-500': v$.password.$error,
                            'border-[#42d392] ': !v$.password.$invalid
                        }"
                    >
                    <password-meter :password="registerFormData.password" />
                    <span class="text-xs text-red-500" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
                </div>

                <div class="mb-4">
                    <label for="repeat_password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                    <input 
                        v-model="registerFormData.repeatPassword" 
                        @change="v$.repeatPassword.$touch" 
                        type="password" 
                        name="repeat_password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{
                            'border-red-500 focus:border-red-500': v$.repeatPassword.$error,
                            'border-[#42d392] ': !v$.repeatPassword.$invalid
                        }"
                    >
                    <span class="text-xs text-red-500" v-if="v$.repeatPassword.$error">{{ v$.repeatPassword.$errors[0].$message }}</span>
                </div>

                <vue-hcaptcha :sitekey="config.public.hCaptchaSiteKey" @verify="captchaVerify"></vue-hcaptcha>
                <span class="text-xs text-red-500" v-if="v$.captcha.$error">{{ v$.captcha.$errors[0].$message }}</span>

                <small class="block text-small my-3 text-gray-500">By registering you agree to our Terms of Service and Privacy Policy.</small>

                <button type="submit" class="float-right my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
            
                <p class="text-small mt-16 text-gray-700">Already have an account? <nuxt-link to="/login" class="text-blue-800 hover:text-blue-500">Log in</nuxt-link>.</p>

            </form>

        </div>

    </main>

</template>


<script setup>

import { ref } from "vue";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
import PasswordMeter from "vue-simple-password-meter";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs, minLength, maxLength, helpers } from "@vuelidate/validators";

const config = useRuntimeConfig();

const registerFormData = reactive({
    username: "",
    email: "",
    password: "",
    repeatPassword: null,
    captcha: null
});

const rules = computed(() => {
    return {
        username: {
            required: helpers.withMessage("The username field is required", required),
            minLength: minLength(4),
            maxLength: maxLength(20),
            isAlphanumeric: helpers.withMessage(
                () => "Username must be alphanumeric (only letters, numbers and _)", 
                (value) => /^[A-Za-z0-9_]+$/.test(value)
            )
        },
        email: {
            required: helpers.withMessage("The email field is required", required),
            email: helpers.withMessage("Invalid email format", email)
        },
        password: {
            required: helpers.withMessage("The password field is required", required),
            minLength: minLength(8),
            maxLength: maxLength(72)
        },
        repeatPassword: {
            required: helpers.withMessage("The repeat password field is required", required),
            sameAs: helpers.withMessage("Passwords don't match", sameAs(registerFormData.password))
        },
        captcha: {
            required: helpers.withMessage("Captcha is required", required)
        }
    }
});

const v$ = useVuelidate(rules, registerFormData);

const captchaVerify = (tokenStr) => {
    registerFormData.captcha = tokenStr;
}

const error = ref("");

const submitRegisterForm = async () => {

    v$.value.$validate();
    if(v$.value.$error) return;

    error.value = "";

    try {

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerFormData)
        })

        if(!res.ok) throw new Error("Failed to connect with API server");
        const body = await res.json();

        if(!body.success) throw new Error(body.error);

        return await navigateTo("/activate");

    } catch(err) {
        console.error(err);
        error.value = err.message;
    }

}

</script>
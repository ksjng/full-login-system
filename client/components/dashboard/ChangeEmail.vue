<template>

    <div class="flex-1 px-4 mx-4 text-left">

        <h2 class="text-3xl m-8 text-center">Change email</h2>

        <div v-if="error" class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <p>{{ error }}</p>
        </div>

        <div v-if="success" class="flex p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <p>Now you need to verify your new email by link we sent you to your new email address. Otherwise the email address will not be changed.</p>
        </div>

        <form @submit.prevent="submitChangeEmailForm" class="mt-5">

            <div class="mb-4">
                    <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">New email</label>
                    <input 
                        v-model="changeEmailFormData.email" 
                        @change="v$.newEmail.$touch" 
                        type="email" 
                        name="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{
                            'border-red-500 focus:border-red-500': v$.newEmail.$error,
                            'border-[#42d392] ': !v$.newEmail.$invalid
                        }"
                    >
                    <span class="text-xs text-red-500" v-if="v$.newEmail.$error">{{ v$.newEmail.$errors[0].$message }}</span>
                </div>

            <div class="mb-4">
                <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                    v-model="changeEmailFormData.password"
                    @change="v$.password.$touch"  
                    type="password" 
                    name="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :class="{
                        'border-red-500 focus:border-red-500': v$.password.$error,
                        'border-[#42d392] ': !v$.password.$invalid
                    }"  
                >
                <span class="text-xs text-red-500" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
            </div>

            <button type="submit" class="float-right my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change email</button>

        </form>

    </div>

</template>


<script setup>

import { ref, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, maxLength, email } from "@vuelidate/validators";

const changeEmailFormData = reactive({
    newEmail: "",
    password: ""
});

const rules = computed(() => {
    return {
        newEmail: {
            required: helpers.withMessage("The old password field is required", required),
            email: helpers.withMessage("Invalid email format", email)
        },
        password: {
            required: helpers.withMessage("The new password field is required", required),
            minLength: minLength(8),
            maxLength: maxLength(72)
        }
    }
});

const v$ = useVuelidate(rules, changeEmailFormData);

const error = ref("");
const success = ref(0);

const submitChangeEmailForm = async () => {

    v$.value.$validate();
    if(v$.value.$error) return;

    error.value = "";
    success.value = false;

    const { newEmail, password } = changePasswordFormData;

    try {

        const res = await fetch("/api/user/settings/change-email/provide-new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newEmail, password })
        })

        if(!res.ok) throw new Error("Failed to connect with API server");
        const body = await res.json();

        if(!body.success) throw new Error(body.error);

        return success.value = true;

    } catch(err) {
        console.error(err);
        error.value = err.message;
    }

}

</script>
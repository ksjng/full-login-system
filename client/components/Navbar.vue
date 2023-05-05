<template>

    <nav class="fixed w-full z-20 top-0 left-0 bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 text-lg">

            <nuxt-link to="/" class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </nuxt-link>

            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>

            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    
                    <li id="dropdown_profile_btn" data-dropdown-toggle="dropdown_profile">

                        <a v-if="user.username" href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"><img :src="user.avatarUrl" class="inline w-8 rounded-full pb-[2px]" alt="Profile picture"> {{ user.username }}</a>
                        
                        <nuxt-link v-else to="/login" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</nuxt-link>
                        
                        <div id="dropdown_profile" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul v-if="user.username" class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown_profile_btn">
                                <li>
                                    <nuxt-link to="/dashboard" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</nuxt-link>
                                </li>
                                <li>
                                    <a @click="logout()" href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</a>
                                </li>
                            </ul>
                        </div>

                    </li>

                </ul>
            </div>

        </div>
    </nav>

</template>


<script setup>

import { ref, onMounted } from "vue";

const user = ref({});

onMounted(async () => {

    try {
        const res = await fetch("/api/user/me");

        if(res.status == 401) return;

        if(!res.ok) throw new Error("Failed to connect with API server");
        const body = await res.json();
        
        user.value = body.data;

    } catch(err) {
        console.error(err);
    }

});

const logout = () => {
    document.cookie = "authorization=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location = "/";
}

</script>
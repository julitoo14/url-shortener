<template>
    <nav class="flex items-center justify-between p-2 lg:h-20 w-full">
        <div class="hidden md:flex md:absolute items-center gap-x-2 text-alt font-bold text-2xl">
            <img src="/logo.webp" alt="logo" class="w-16 h-16 rounded" />
            <span>UrlShortener</span>
        </div>

        <ul :class="{'flex': showMenu || !isMobile, 'hidden': !showMenu && isMobile}" class="lg:flex-row flex-col md:w-1/3 items-center md:justify-start  justify-center gap-y-3 m-auto ">
            <li class="w-full text-center">
                <router-link to="/" class="cursor-pointer text-strong hover-alt text-xl font-semibold">Inicio</router-link>
                <hr class="w-full md:hidden">
            </li>
            <li class="w-full text-center">
                <router-link to="/create" class="cursor-pointer text-strong hover-alt text-xl font-semibold">Nuevo</router-link>
                <hr class="w-full md:hidden">
            </li>
            <li class="w-full text-center">
                <router-link to="/stats" class="cursor-pointer text-strong hover-alt text-xl font-semibold">Stats</router-link>
                <hr class="w-full md:hidden">
            </li>
        </ul>
        <button @click="toogleMenu()" class="lg:hidden text-2xl text-alt font-bold absolute right-2 top-2 bg-strong h-12 w-12 flex justify-center items-center">☰</button>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
const showMenu = ref(false);
const isMobile = ref(window.innerWidth < 768);

const toogleMenu = () => {
    showMenu.value = !showMenu.value;
}

window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
});
</script>
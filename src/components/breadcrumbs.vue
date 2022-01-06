<template>
    <div class="flex items-center bg-gray-100 text-black justify-center whitespace-nowrap h-[80px] w-full">
        <a href="#" class="text-black">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
        </a>

        <span class="mx-2 text-gray-500 ">/</span>

        <a href="#" class="text-black  hover:no-underline">Account</a>

        <span class="mx-2 text-gray-500 ">/</span>

        <a href="#" class="text-black  hover:no-underline">Profile</a>

        <span class="mx-2 text-gray-500">/</span>

        <a href="#" class="text-black hover:underline">Settings</a>
    </div>
</template>

<script>
export default {
    name: "bread"
}
</script>

<style lang="scss" scoped>
</style>
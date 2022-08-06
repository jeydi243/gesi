<template>
    <div>
        Details de l'employee {{ $route.params }}

        <div class="card mt-4 min-h-[200px]">
            <div class="row">
                <img src="@/assets/img/bg-1.jpg" class="rounded-lg h-[150px] w-[150px]">
                <div class="col ml-5">
                    <span>Lle {{ userData }}</span>
                    <span>Lle</span>
                    <span>Lle</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import endpoint from "@/api/management"
const userData = ref(null);
const route = useRoute()
onMounted(async () => {
    const { data } = await endpoint.employeeBy(route.params.id)
    userData.value = data
})
watch(
    () => route.params.id,
    async newId => {
        const { data } = await endpoint.employeeBy(newId)
        userData.value = data
    }
)
onBeforeRouteUpdate(async (to, from) => {
    // only fetch the user if the id changed as maybe only the query or the hash changed
    if (to.params.id !== from.params.id) {
        userData.value = await endpoint.employeeBy(to.params.id)
    }
})
</script>

<style lang="scss" scoped>
</style>
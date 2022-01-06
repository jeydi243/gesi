<template>
    <div class="w-full bg-white rounded shadow-gray-50 p-3 h-auto">
        <div class="flex flex-row justify-between w-full pb-5">
            <div class="relative flex w-72 flex-wrap items-stretch">
                <span class="z-10 flex h-full font-normal text-center self-center caret-green-500 text-gray-300 absolute bg-transparent rounded text-base items-center justify-center w-8">
                    <box-icon name="search" type="regular" color="gray" size="sm" class="self-center text-center"></box-icon>
                </span>
                <input
                    type="text"
                    :placeholder="`Find ${level} by Username or Matricule`"
                    class="px-3 py-3 caret-green-500 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 outline-none focus:outline-none focus:ring-transparent w-full pl-10"
                />
            </div>

            <button
                v-if="currentTabLevel.toLowerCase() == 'préparatoire'"
                @click="$router.push({ name: 'students-add' })"
                class="flex bg-green-500 rounded items-center px-5 justify-center text-white h-9 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-80"
            >
                <box-icon name="user-plus" type="regular" color="white"></box-icon>
                <span class="self-center ml-2">Ajouter</span>
            </button>
        </div>
        <table class="table-fixed w-full">
            <thead class="bg-green-50 w-full mb-5 rounded table-header-group mx-5 px-5">
                <tr class="pl-5 text-left table-row h-10">
                    <th>#</th>
                    <th>Matricule</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Level</th>
                    <th>Statut</th>
                </tr>
            </thead>
            <!-- <tbody v-if="students != null"> -->
            <transition-group name="fade" tag="tbody" mode="out-in">
                <tr class="table-row" v-for="(student,index) in students(level.toLowerCase())" :key="index" @click="goto(index)">
                    <td>{{ index }}</td>
                    <td class="t">{{ student.matricule }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.email }}</td>
                    <td>{{ student.niveau }}</td>
                    <td>{{ student.statut }}</td>
                </tr>
            </transition-group>
            <!-- </tbody> -->
        </table>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: "list-student",
    props: {

        level: { type: String, required: true, default: "candidat" }
    },
    computed: {
        ...mapGetters("students",
            { students: 'myStudentsByLevel' }
        ),
        ...mapGetters(
            { levels: 'getListLevel', currentTabLevel: 'currentLevel' }
        )
    },
}

</script>

<style lang="scss" scoped>
</style>
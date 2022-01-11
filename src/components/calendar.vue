
<template>
    <div class="h-full">
        <vue-cal
            style="height: 100%;"
            selected-date="2022-11-01"
            :time-from="10 * 60"
            :time-to="23 * 60"
            hide-view-selector
            hide-weekends
            :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
            :events="events"
            class="vuecal--full-height-delete"
        />
    </div>
</template>
<script>
import VueCal from 'vue-cal'
export default {
    components: {
        "vue-cal": VueCal
    },

    data() {
        return {
            events: [
                {
                    start: '2021-11-01 14:00',
                    end: '2021-11-01 17:30',
                    title: 'Boring event',
                    content: '<i class="icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
                    class: 'blue-event',
                    deletable: false,
                    resizable: false,
                    draggable: false
                },
            ]
        }
    }
}
</script>

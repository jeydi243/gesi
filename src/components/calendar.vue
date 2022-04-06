
<template>
	<div class="h-full w-full">
		<vue-cal :selected-date="selectedDate" :time-from="6 * 60" :time-to="23 * 60" hide-view-selector hide-weekends :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }" :events="events" show-week-numbers="false" class="vuecal--full-height-delete" locale="fr" :on-event-click="onEventClick" events-on-month-view="short" />
	</div>
</template>
<script>
import VueCal from "vue-cal";
import { format } from "date-fns";
export default {
	components: {
		"vue-cal": VueCal,
	},

	data() {
		var nowformatted = format(new Date(), "yyyy-MM-dd");
		return {
			selectedDate: nowformatted,
			selectedEvent: null,
			events: [
				{
					start: "2022-03-22 14:00",
					end: "2022-03-22 17:30",
					title: "Boring event",
					content: '<i class="icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
					class: "bg-green-100 border border-l-4 border-green-500 text-green-700 p-4 rounded-lg",
					deletable: false,
					resizable: true,
					draggable: true,
				},
			],
			currentStudent: {},
		};
	},
	watch: { "$route.params.id": "getStudent" },
	methods: {
		onEventClick(selectedEvent, e) {
			this.selectedEvent = selectedEvent;
			console.log("The clicked event is: ", selectedEvent);
		},
		getStudent() {
			console.log("getStudent");
		},
	},
};
</script>

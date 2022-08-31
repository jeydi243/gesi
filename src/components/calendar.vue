<template>
	<div class="h-full w-full col">
		<div class="row justify-between">
			<div class="flex justify-center">
				<div>
					<div class="dropdown relative">
						<button class="dropdown-toggle btn-unstate row items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
							{{ actualView }}
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
								<path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
							</svg>
						</button>
						<ul class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none" aria-labelledby="dropdownMenuButton1">
							<li>
								<a class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#">Week</a>
							</li>
							<li>
								<a class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#">Month</a>
							</li>
							<li>
								<a class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#">Year</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<button class="btn-primary" data-mdb-ripple="true" data-mdb-ripple-color="success" type="button"><box-icon type="regular" name="plus" color="white" size="sm" class="text-green-900"></box-icon> Add</button>
		</div>
		<calendar class="mt-3" :active-view="actualView" :selected-date="selectedDate" :time-from="6 * 60" :time-to="20 * 60" hide-view-selector hide-weekends :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }" :events="events" :show-week-numbers="false" locale="fr" :on-event-click="onEventClick" events-on-month-view="short" />
	</div>
</template>
<script>
	import VueCal from "vue-cal"
	import { format } from "date-fns"
	export default {
		components: {
			calendar: VueCal,
		},

		data() {
			var nowformatted = format(new Date(), "yyyy-MM-dd")
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
				actualView: "week",
			}
		},
		watch: { "$route.params.id": "getStudent" },
		methods: {
			onEventClick(selectedEvent, e) {
				this.selectedEvent = selectedEvent
				console.log("The clicked event is: ", selectedEvent)
			},
			getStudent() {
				console.log("getStudent")
			},
		},
	}
</script>

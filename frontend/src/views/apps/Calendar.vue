<template>
	<vue-scroll class="page-calendar">
		<div id="cal" class="calendar-wrap card-base card-shadow--medium"></div>
	</vue-scroll>
</template>

<script>
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });
import moment from 'moment-timezone'
import $ from 'jquery'
import 'fullcalendar'
import 'fullcalendar/dist/fullcalendar.css'
// import {loadSeminar, loadEvent} from '../pages/helper.js';
console.clear();
var event = []

export default {
	name: 'Calendar',
	data() {
		const __Y = moment().format('YYYY')
		const __M = moment().format('MM')

		return {
			user: this.$store.state.user,
			cal: null,
			options: {
				lang: 'en',
				header: {
					left:   'prev,next today',
					center: 'title',
					right:  'month,agendaWeek,agendaDay,listWeek'
				},
				height: "auto",
				firstDay: 1,
				allDaySlot: true,
				slotEventOverlap: true,
				selectable: true,
				selectHelper: true,
				timeFormat: 'HH:mm',
				navLinks: true, // can click day/week names to navigate views
				editable: true,
				eventLimit: true, // allow "more" link when too many events
				events: [
					// { title: 'All Day Event', start: __Y+'-'+__M+'-01' },
					// { title: 'Long Event', start: __Y+'-'+__M+'-07', end: __Y+'-'+__M+'-10' },
					// { title: 'Conference', start: __Y+'-'+__M+'-11', end: __Y+'-'+__M+'-13' },
					// { title: 'Meeting', start: __Y+'-'+__M+'-12T10:30:00', end: __Y+'-'+__M+'-12T12:30:00' },
					// { title: 'Lunch', start: __Y+'-'+__M+'-12T12:00:00' },
					// { title: 'Meeting', start: __Y+'-'+__M+'-12T14:30:00' },
					// { title: 'Happy Hour', start: __Y+'-'+__M+'-12T17:30:00' },
					// { title: 'Dinner', start: __Y+'-'+__M+'-12T20:00:00' },
					// { title: 'Birthday Party', start: __Y+'-'+__M+'-13T07:00:00' },
					// { title: 'Cool Jokes', start: '2018-10-30T02:00'}
					// { title: 'Click for Google', url: 'http://google.com/', start: __Y+'-'+__M+'-28' }
				],
				dayClick: this.dayClick,
				eventClick: this.eventClick,
				select: this.select
			}
		}
	},

	mounted() {

		this.cal = $(window.document.getElementById('cal'))
		this.cal.fullCalendar(this.options)

		fetch({
			query: `query {
						getMyEventsAndSeminars(userID: ${this.user.id}, participationType: ATTENDING) {
							__typename
							...on Event {
								id
								name
								start_time
								end_time
							}
							...on Seminar {
								id
								name
								start_time
								end_time
							}
						}
					}`,
			variables: {ID: this.user.id}
		}).then(res => {
			if (res.data) {
				console.log(res.data.getMyEventsAndSeminars);

				for (var i = 0; i < res.data.getMyEventsAndSeminars.length; i++) {
					res.data.getMyEventsAndSeminars[i].start_time = moment(parseInt(res.data.getMyEventsAndSeminars[i].start_time,10)).format("YYYY-MM-DDTHH:mm")
					res.data.getMyEventsAndSeminars[i].end_time = moment(parseInt(res.data.getMyEventsAndSeminars[i].end_time,10)).format("YYYY-MM-DDTHH:mm")

					var colourLabel = '';
					if (res.data.getMyEventsAndSeminars[i].__typename == "Event")
						colourLabel = '#0091e0'
					else if (res.data.getMyEventsAndSeminars[i].__typename == "Seminar")
						colourLabel = '#ff9484'

					var event = {
						id: res.data.getMyEventsAndSeminars[i].id + "_" + res.data.getMyEventsAndSeminars[i].__typename,
						title: res.data.getMyEventsAndSeminars[i].name,
						start: res.data.getMyEventsAndSeminars[i].start_time,
						end: res.data.getMyEventsAndSeminars[i].end_time,
						color: colourLabel
					}

					console.log(event);
					this.cal.fullCalendar( 'renderEvent', event, true);
				}


			} else {
				console.log(res.errors)
			}
		}).catch(err => {
			console.log(err);
		});
	},

	methods: {
		eventClick: function(event) {
			console.log("name: " + event.title);
			console.log("start: " + event.start);
			console.log("end: " + event.end);
			console.log("id: " + event.id);
			var load
			var info = event.id.split("_")
			if (info[1] == "Event"){
				// load = loadEvent(info[0],this.$store.state.user.id)
				console.log(loadEvent(info[0],this.$store.state.user.id))
				// this.$store.commit("setEvent", load)
                // this.$router.push("event")
			} else if (info[1] == "Seminar"){
				load = loadSeminar(info[0],this.$store.state.user.id)
				// this.$store.commit("setSeminar", load)
                // this.$router.push("seminar")
			}
		}
	}
}
</script>



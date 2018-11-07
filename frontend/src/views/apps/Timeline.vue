<template>
	<div class="page-timeline scrollable only-y">
		<div class="page-header" style="margin-bottom:20px">
			<h1>{{user.first_name}}'s Newsfeed</h1>
		</div>

		<div class="timeline-box card-base card-shadow--medium">
			
			
			<div v-if="news.length!==0">
			<timeline timeline-theme="lightblue">
				
				<div v-for=" (i,key) in news" :key='key' >
					<timeline-item color="#0091e0" v-if="i.type==='event_type'">
						{{i.name}} <br>
						<small> "{{ i.message }}" </small>
						<p style="color:grey;font-size:50%;"> {{i.timestamp}} </p>
					</timeline-item>

					<timeline-item color="#ff9484" v-else-if="i.type==='seminar_type'">
						{{i.name}} <br>
						<small> "{{ i.message }}" </small>
						<p style="color:grey;font-size:50%;"> {{i.timestamp}} </p>
					</timeline-item>
				</div> 

			</timeline>
			</div>

			<div v-if="news.length===0">
				<p style="color:grey;font-size:200%;text-align:center"> You are not following anything :( </p>
			</div>

		</div>
	</div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import * as moment from 'moment'
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });
export default {
	name: 'TimelinePage',
	components: {
		Timeline,
		TimelineItem,
		TimelineTitle
	}
	, 

	data() {
	
		return {
			user: this.$store.state.user,
			news: []
		}
	},

	mounted() {
		fetch({
			query: `query getMyAnnouncements($ID: Int!){
						getMyAnnouncements(userID: $ID) {
							type_name
							message
							date_modified
							type
						}
					}`
			,
			variables: {ID: this.user.id}
		}).then(res => {
			if (res.data) {
				this.managingEvents = res.data.getMyManagingEventsAndSeminars
			} else {
				console.log(res.errors)
			}		
		}).catch(err => {
			console.log(err);
		});
	}
	// ,

	// methods: {

	// }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.timeline-box {
	padding: 50px;
}
.timeline {
	max-width: 1200px;
	margin: 0px auto;
	font-family: inherit;
}
.timeline, .timeline-title {
	color: $text-color;
	line-height: 1.4;
	cursor: default;
}

/* Formats the size and shape of the picture to fit the timeline */
.icon-time {
	width: 32px;
	margin-top: 2px;
	border-radius: 50%;
}
</style>


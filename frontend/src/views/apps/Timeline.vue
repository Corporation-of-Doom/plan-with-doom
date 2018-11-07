<template>
	<div class="page-timeline scrollable only-y">
		<div class="page-header">
			<h1>Newsfeed</h1>
		</div>

		<div class="timeline-box card-base card-shadow--medium">
			<timeline timeline-theme="lightblue">
				<timeline-title>May 25, 2018</timeline-title>
				<timeline-item color="#9dd8e0">
					Anime North<br>
					<small> Anime North passes will be available for pickup from 4:30pm to 7:30pm. </small>
				</timeline-item>
				<timeline-item>
					<img src="@/assets/images/twitchicon.png" class="icon-time" slot="others" alt="Twitch">
					Twitch Con<br>
					<small> The streamer room has been moved to hall C. Sorry for the inconvenience. </small>
				</timeline-item>
				<timeline-title color="pink">May 14, 2018</timeline-title>
				<timeline-item>
					<img src="@/assets/images/twitchicon.png" class="icon-time" slot="others" alt="Twitch">
					<p>Twitch Con: Streamer Box</p>
					<small> Make sure to check our twitter: @TwitchBox to catch your favourite streamer. </small>
				</timeline-item>
				<timeline-item>
					<img src="@/assets/images/youtubeicon.png" class="icon-time" slot="others" alt="Twitch">
					<p>Meet and greet with LilyPichu</p>
					<small> Hope to see you guys there! </small>
				</timeline-item>
				<timeline-item line-color="#a6ade4">
					<p>CUSEC</p>
					<small> Purchase your tickets early for a discount! </small>
				</timeline-item>
			</timeline>
		</div>
	</div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
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
			user: this.$store.state.user
		}
	},

	mounted() {
		console.clear()

		fetch({
			query: `query getMyAnnoucements($ID: Int!){
						getMyAnnoucements(userID: $ID) {
							message
							date_modified
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


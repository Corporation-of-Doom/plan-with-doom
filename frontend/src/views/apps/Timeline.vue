<template>
	<div class="page-timeline scrollable only-y">
		<div class="page-header">
			<h1>Timeline</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Apps</el-breadcrumb-item>
				<el-breadcrumb-item>Timeline</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="timeline-box card-base card-shadow--medium">
			<timeline timeline-theme="lightblue">
				<timeline-title>June 5, 1943</timeline-title>
				<timeline-item color="#9dd8e0">
					The First Computer<br>
					<small>Code named "Project PX" and funded by the United States Army, the first general-purpose computer was the Electronic Numerical Integrator And Computer (ENIAC). It was developed at the University of Pennsylvania's Moore School of Electrical Engineering. </small>
				</timeline-item>
				<timeline-item color="#e6b6b0" :hollow="true">
					...And the women who made it work<br>
					<small>The ENIAC programmers included a number of women: Jean Bartik, Marlyn Wescoff Meltzer, Ruth Lichterman Teitelbaum, Kay McNulty Mauchly Antonelli, Frances Spence, and Frances Elizabeth "Betty" Holberton. Despite their groundbreaking work, the Army never released the names of the women who worked on the ENIAC, and they were largely forgotten until Kathy Kleiman discovered their story in 1985.</small>
				</timeline-item>
				<timeline-title color="#f2d7e1">1952</timeline-title>
				<timeline-item>
					<img src="@/assets/images/Grace-Hopper.png" class="icon-time" slot="others" alt="Grace Hopper">
					<p>Grace Hopper invents the compiler</p>
					<p class="append">In her career with the Navy, Rear Admiral Grace Hopper worked on the first commercial computer (UNIVAC) and laid the groundwork for the programming language COBOL. But her most notable invention was the compiler, which can transform a source language into binary code. (In other words, it can translate the code you and I write into 0s and 1s.) She developed it in 1952, but she said "Nobody would touch it. They told me computers could only do arithmetic."</p>
				</timeline-item>
				<timeline-item line-color="#a6ade4">
					<p>Contributions to space exploration</p>
					<p class="append">One of the first African-American women to earn a Ph.D in mathematics, Evelyn Boyd Granville focused on aeronautics and space during her career. In 1956, she worked with NASA and IBM on Project Mercury, the first manned space flight. She worked with NASA again a few years later on the Apollo Project.</p>
				</timeline-item>
			</timeline>
		</div>
	</div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
	name: 'TimelinePage',
	mounted() {
		//console.log('Timeline mounted')
	},
	components: {
		Timeline,
		TimelineItem,
		TimelineTitle
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
.append {
    font-size: .8em;
    margin-top: 3px;
    color: transparentize($text-color, .5);
}
.icon-time {
	width: 32px;
	margin-top: 2px;
	border-radius: 50%;
}
</style>


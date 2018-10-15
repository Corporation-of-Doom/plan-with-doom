<template>
	<div class="page-bulmachartjs scrollable">
		<div class="page-header">
			<h1>Bulma Chartjs</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Components</el-breadcrumb-item>
				<el-breadcrumb-item>Charts</el-breadcrumb-item>
				<el-breadcrumb-item>Bulma Chartjs</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="card-base card-shadow--medium bg-white black-text p-30 mt-40">
			<h2 class="mt-0 mb-30">Pie</h2>
			<div class="chart-box" style="height:400px;">
				<bulma-chart :type="'pie'" :data="pieData" :options="options"></bulma-chart>
			</div>
		</div>

		<div class="card-base card-shadow--medium bg-white black-text p-30 mt-40">
			<h2 class="mt-0 mb-30">Doughnut</h2>
			<div class="chart-box" style="height:400px;">
				<bulma-chart :type="'doughnut'" :data="pieData" :options="options"></bulma-chart>
			</div>
		</div>
		
		<div class="card-base card-shadow--medium bg-white black-text p-30 mt-40">
			<h2 class="mt-0 mb-30">Polar</h2>
			<div class="chart-box" style="height:400px;">
				<bulma-chart :type="'polarArea'" :data="pieData" :options="options"></bulma-chart>
			</div>
		</div>

		<div class="card-base card-shadow--medium bg-white black-text p-30 mt-40">
			<h2 class="mt-0 mb-30">Animated Radar</h2>
			<div class="chart-box" style="height:400px;">
				<bulma-chart :type="'radar'" :data="waveData" :options="options"></bulma-chart>
			</div>
		</div>
		
		<div class="card-base card-shadow--medium bg-white black-text p-30 mt-40">
			<h2 class="mt-0 mb-30">Animated Bars</h2>
			<div class="chart-box" style="height:200px;">
				<bulma-chart :type="'bar'" :data="waveData" :options="options"></bulma-chart>
			</div>
		</div>

		<div class="card-base card-shadow--medium bg-white black-text p-30 mt-40">
			<h2 class="mt-0 mb-30">Radar</h2>
			<div class="chart-box" style="height:400px;">
				<bulma-chart :type="'radar'" :data="seriesData" :options="options_3"></bulma-chart>
			</div>
		</div>
		
		<div class="card-base card-shadow--medium bg-white black-text p-30 mt-40">
			<h2 class="mt-0 mb-30">Line</h2>
			<div class="chart-box" style="height:200px;">
				<bulma-chart :type="'line'" :data="seriesData" :options="options_3"></bulma-chart>
			</div>
		</div>
		
		<div class="card-base card-shadow--medium bg-white black-text p-30 mt-40">
			<h2 class="mt-0 mb-30">Bars</h2>
			<div class="chart-box" style="height:200px;">
				<bulma-chart :type="'bar'" :data="seriesData" :options="options_3"></bulma-chart>
			</div>
		</div>
		
		<h4><a href="https://github.com/vue-bulma/chartjs" target="_blank"><i class="mdi mdi-link-variant"></i>reference</a></h4>
	</div>
</template>

<script>
export default {
	name: 'BulmaChartjsPage',
	data () {
		return {
			labels: ['Sleeping', 'Designing', 'Coding', 'Cycling'],
			data: [20, 40, 5, 35],
			options: {
				segmentShowStroke: false
			},
			backgroundColor: [
				'#1fc8db',
				'#fce473',
				'#42afe3',
				'#ed6c63',
				'#97cd76'
			],
			labels_2: ['April', 'May', 'June', 'Jule', 'August', 'September', 'October', 'November', 'December'],
			data_2: [1, 9, 3, 4, 5, 6, 7, 8, 2].map(e => (Math.sin(e) * 25) + 25),
			labels_3: ['May', 'June', 'Jule', 'August', 'September', 'October', 'November'],
			data_3: [
				[65, 59, 90, 81, 56, 55, 40],
				[28, 48, 40, 19, 88, 27, 45]
			],
			options_3: {
				tooltips: {
					mode: 'label'
				}
			},
			backgroundColor_3: [
				'rgba(31, 200, 219, 1)',
				'rgba(151, 205, 118, 1)'
			],
			series: ['Data A', 'Data B']
		}
	},
	computed: {
		pieData () {
			return {
				labels: this.labels,
				datasets: [{
					data: this.data,
					backgroundColor: this.backgroundColor
				}]
			}
		},
		waveData () {
			return {
				labels: this.labels_2,
				datasets: [{
					label: 'Live Data',
					data: this.data_2,
					backgroundColor: this.backgroundColor[0]
				}]
			}
		},
		seriesData () {
			let data = {
				labels: this.labels_3
			}
			data.datasets = this.series.map((e, i) => {
				return {
					data: this.data_3[i],
					label: this.series[i],
					borderColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)'),
					pointBackgroundColor: this.backgroundColor_3[i],
					backgroundColor: this.backgroundColor_3[i].replace(/1\)$/, '.5)')
				}
			})
			return data
		}
	},
	created () {
		setInterval(() => {
			this.data_2.unshift(this.data_2.pop())
		}, 1000)
	},
	components: {
		Chart
	}
}
</script>

<style lang="scss" scoped>
.page-bulmachartjs {
	.chart-box {
		position: relative;
		width: 100%;
		max-width: 400px;
	}
}
</style>


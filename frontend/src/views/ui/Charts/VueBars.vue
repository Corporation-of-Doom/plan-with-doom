<template>
	<div class="page-vuebars scrollable">
		<div class="page-header">
			<h1>Vue Bars</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Components</el-breadcrumb-item>
				<el-breadcrumb-item>Charts</el-breadcrumb-item>
				<el-breadcrumb-item>Vue Bars</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="card-base card-shadow--medium p-30 pb-0">
			<bars
				:data="[1, 2, 5, 9, 5, 10, 3, 5, 2, 5, 1, 8, 2, 9, 1]"
				:gradient="['#6fa8dc', '#42b983']"
			></bars>
		</div>

		<h4><a href="https://github.com/DeviaVir/vue-bar" target="_blank"><i class="mdi mdi-link-variant"></i>reference</a></h4>
	</div>
</template>

<script>

export default {
	name: 'VueBarsPage',
	data() {
		return {}
	}
}
</script>

<style lang="scss">
</style>


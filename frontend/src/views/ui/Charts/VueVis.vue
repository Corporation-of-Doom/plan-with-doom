<template>
	<div class="page-vuevis scrollable">
		<div class="page-header">
			<h1>Vue Vis</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Components</el-breadcrumb-item>
				<el-breadcrumb-item>Charts</el-breadcrumb-item>
				<el-breadcrumb-item>Vue Vis</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="card-base card-shadow--medium ph-30 pt-0 pb-30 bg-white black-text">
			<h2>Network</h2>
			<network
				class="network"
				ref="network"
				:nodes="network.nodes"
				:edges="network.edges"
				:options="network.options"
			></network>
			<button @click="addNode">Add node</button>
			<button @click="addEdge">Add edge</button>
			<button @click="resetNetwork">Reset Network</button>
			<button @click="removeNode">Remove Node</button>
			<button @click="removeEdge">Remove Edge</button>
		</div>
		<div class="card-base card-shadow--medium mt-40 bg-white black-text">
			<h2 class="ph-30">Timeline</h2>
			<timeline
				style="background-color: rgba(0, 0, 0, 0.05);"
				ref="timeline"
				:items="timeline.items"
				:groups="timeline.groups"
				:options="timeline.options"
			></timeline>
		</div>

		<h4><a href="https://github.com/alexcode/vue2vis" target="_blank"><i class="mdi mdi-link-variant"></i>reference</a></h4>
	</div>
</template>

<script>
// eslint-disable-next-line
import { Timeline, Network } from 'vue2vis'

export default { 
	name: 'VueVisPage',
	data: () => ({
		timeline: {
			groups: [ { id: 0, content: 'Group 1', }, ],
			items: [
				{ id: 2, group: 0, content: 'item 2', start: '2014-04-14' },
				{ id: 3, group: 0, content: 'item 3', start: '2014-04-18' },
				{ id: 1, group: 0, content: 'item 1', start: '2014-04-20' },
				{ id: 4, group: 0, content: 'item 4', start: '2014-04-16', end: '2014-04-19', },
				{ id: 5, group: 0, content: 'item 5', start: '2014-04-25' },
				{ id: 6, group: 0, content: 'item 6', start: '2014-04-27', type: 'point', },
			],
			options: { editable: true, },
		},
		network: {
			nodes: [
				{ id: 1, label: 'Node 1' },
				{ id: 2, label: 'Node 2' },
				{ id: 3, label: 'Node 3' },
				{ id: 4, label: 'Node 4' },
				{ id: 5, label: 'Node 5' },
			],
			edges: [
				{ id: 1, from: 1, to: 3 },
				{ id: 2, from: 1, to: 2 },
				{ id: 3, from: 2, to: 4 },
				{ id: 4, from: 2, to: 5 },
				{ id: 5, from: 3, to: 3 },
			],
			options: {
				nodes: {
					shape: 'circle',
				},
			},
		},
	}),
	components: {
		Timeline,
		Network,
	},
	methods: {
		addNode() {
			const id = new Date().getTime();
			this.network.nodes.push({ id, label: 'New node' });
		},
		addEdge() {
			const n1 = Math.floor(Math.random() * this.network.nodes.length);
			const n2 = Math.floor(Math.random() * this.network.nodes.length);
			this.network.edges.push({
				id: `${this.network.nodes[n1].id}-${this.network.nodes[n2].id}`,
				from: this.network.nodes[n1].id,
				to: this.network.nodes[n2].id,
			});
		},
		resetNetwork() {
			this.network = {
				nodes: [
					{ id: 1, label: 'Node 1' },
					{ id: 2, label: 'Node 2' },
					{ id: 3, label: 'Node 3' },
					{ id: 4, label: 'Node 4' },
					{ id: 5, label: 'Node 5' },
				],
				edges: [
					{ id: 1, from: 1, to: 3 },
					{ id: 2, from: 1, to: 2 },
					{ id: 3, from: 2, to: 4 },
					{ id: 4, from: 2, to: 5 },
					{ id: 5, from: 3, to: 3 },
				],
				options: {},
			};
		},
		removeNode() {
			this.network.nodes.splice(0, 1);
		},
		removeEdge() {
			this.network.edges.splice(0, 1);
		},
	},
}
</script>

<style lang="scss">
@import '~vis/dist/vis.css';

.vis-timeline {
	border-color: transparent;
}
.network {
	height: 250px;
	margin: 0 20px;
}
</style>


import Charts from '../views/ui/Charts/Charts.vue'
import VueBars from '../views/ui/Charts/VueBars.vue'
import VueTrend from '../views/ui/Charts/VueTrend.vue'
import VueD3Network from '../views/ui/Charts/VueD3Network.vue'
import VueVis from '../views/ui/Charts/VueVis.vue'
import VueChartist from '../views/ui/Charts/VueChartist.vue'
import VueChartkick from '../views/ui/Charts/VueChartkick.vue'
import BulmaChartjs from '../views/ui/Charts/BulmaChartjs.vue'
import Peity from '../views/ui/Charts/Peity.vue'
//import Plotly from '../views/ui/Charts/Plotly.vue'
import Echarts from '../views/ui/Charts/Echarts.vue'

import layouts from '../layout'

export default {
	path: '/charts',
	name: 'charts',
	component: Charts,
	meta: {
		auth: true,
		layout: layouts.navLeft
	},
	children: [
		{
			path: 'vuebars',
			name: 'vuebars',
			component: VueBars,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Vue Bars',
				tags: ['ui']
			}
		},
		{
			path: 'vuetrend',
			name: 'vuetrend',
			component: VueTrend,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Vue Trend',
				tags: ['ui']
			}
		},
		/*{
			path: 'vued3network',
			name: 'vued3network',
			component: VueD3Network,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Vue D3 Network',
				tags: ['ui']
			}
		},*/
		{
			path: 'vuevis',
			name: 'vuevis',
			component: VueVis,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Vue Vis',
				tags: ['ui']
			}
		},
		{
			path: 'vuechartist',
			name: 'vuechartist',
			component: VueChartist,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Vue Chartist',
				tags: ['ui']
			}
		},
		{
			path: 'vuechartkick',
			name: 'vuechartkick',
			component: VueChartkick,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Vue Chartkick',
				tags: ['ui']
			}
		},
		{
			path: 'bulmachartjs',
			name: 'bulmachartjs',
			component: BulmaChartjs,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Bulma Chartjs',
				tags: ['ui']
			}
		},
		{
			path: 'peity',
			name: 'peity',
			component: Peity,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Peity',
				tags: ['ui']
			}
		},
		/*{
			path: 'plotly',
			name: 'plotly',
			component: Plotly,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Plotly',
				tags: ['ui']
			}
		},*/
		{
			path: 'echarts',
			name: 'echarts',
			component: Echarts,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Echarts',
				tags: ['ui']
			}
		}
	]
}


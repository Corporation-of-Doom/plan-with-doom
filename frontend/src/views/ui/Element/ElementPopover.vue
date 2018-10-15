<template>
	<vue-scroll class="page-element-popover">
		<div class="page-header">
			<h1>Element Popover
				<theme-picker style="float:right"></theme-picker>
			</h1>
			<h4><a href="http://element.eleme.io/#/en-US/component/popover" target="_blank"><i class="mdi mdi-book-open-page-variant"></i> see from the complete documentation</a></h4>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Nested information" name="1">
					<el-popover
					ref="popover4"
					placement="right"
					width="250"
					trigger="hover">
					<el-table :data="gridData">
						<el-table-column property="date" label="date"></el-table-column>
						<el-table-column property="name" label="name"></el-table-column>
						<el-table-column property="address" label="address"></el-table-column>
					</el-table>
					</el-popover>

					<el-button v-popover:popover4>Hover to activate</el-button>

				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code1"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Nested operation" name="1">
					<el-popover
					ref="popover5"
					placement="top"
					width="160"
					v-model="visible2">
					<p>Are you sure to delete this?</p>
					<div style="text-align: right; margin: 0">
						<el-button size="mini" type="text" @click="visible2 = false">cancel</el-button>
						<el-button type="primary" size="mini" @click="visible2 = false">confirm</el-button>
					</div>
					</el-popover>

					<el-button v-popover:popover5>Delete</el-button>

				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code2"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
	</vue-scroll>
</template>

<script>
import ThemePicker from '@/components/theme-picker'

export default {
	name: 'ElementPopover',
	data() {
		return {
			gridData: [{
			date: '2016-05-02',
			name: 'Jack',
			address: 'New York City'
			}, {
			date: '2016-05-04',
			name: 'Jack',
			address: 'New York City'
			}, {
			date: '2016-05-01',
			name: 'Jack',
			address: 'New York City'
			}, {
			date: '2016-05-03',
			name: 'Jack',
			address: 'New York City'
			}],
			visible2: false,
			code1: 
`
<el-popover
  ref="popover4"
  placement="right"
  width="400"
  trigger="hover">
  <el-table :data="gridData">
    <el-table-column width="150" property="date" label="date"></el-table-column>
    <el-table-column width="100" property="name" label="name"></el-table-column>
    <el-table-column width="300" property="address" label="address"></el-table-column>
  </el-table>
</el-popover>

<el-button v-popover:popover4>Hover to activate</el-button>

<script>
  export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: 'Jack',
          address: 'New York City'
        }, {
          date: '2016-05-04',
          name: 'Jack',
          address: 'New York City'
        }, {
          date: '2016-05-01',
          name: 'Jack',
          address: 'New York City'
        }, {
          date: '2016-05-03',
          name: 'Jack',
          address: 'New York City'
        }]
      };
    }
  };
<\/script>`
		,code2:
`
<el-popover
  ref="popover5"
  placement="top"
  width="160"
  v-model="visible2">
  <p>Are you sure to delete this?</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible2 = false">cancel</el-button>
    <el-button type="primary" size="mini" @click="visible2 = false">confirm</el-button>
  </div>
</el-popover>

<el-button v-popover:popover5>Delete</el-button>

<script>
  export default {
    data() {
      return {
        visible2: false,
      };
    }
  }
<\/script>
`
		}
	},
	components: {
		ThemePicker
	}
}
</script>

<style lang="scss" scoped>
.demo-box {
	padding: 20px;
	margin-bottom: 20px;
}
pre {
	margin: 0;
	background: white;
}
code {
	padding: 0;
}

@media (max-width: 768px) {code{font-size: 70%;}}

</style>


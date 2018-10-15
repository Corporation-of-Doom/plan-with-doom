<template>
	<vue-scroll class="page-element-pagination">
		<div class="page-header">
			<h1>Element Pagination
				<theme-picker style="float:right"></theme-picker>
			</h1>
			<h4><a href="http://element.eleme.io/#/en-US/component/pagination" target="_blank"><i class="mdi mdi-book-open-page-variant"></i> see from the complete documentation</a></h4>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Small Pagination" name="1">
					<el-pagination
						small
						layout="prev, pager, next"
						:total="50">
					</el-pagination>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code3"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Buttons with background color" name="1">
					<el-pagination
					background
					layout="prev, pager, next"
					:total="1000">
					</el-pagination>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code1"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="More elements" name="1">
					<el-pagination
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					:current-page.sync="currentPage4"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400">
					</el-pagination>
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
	name: 'ElementPagination',
	data() {
		return {
			currentPage4: 4,
			code1: 
`
<el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>`
		,code2:
`
<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(val+' items per page');
      },
      handleCurrentChange(val) {
        console.log('current page: '+val);
      }
    },
    data() {
      return {
        currentPage4: 4
      };
    }
  }
<\/script>
`
		,code3:
`
<el-pagination
  small
  layout="prev, pager, next"
  :total="50">
</el-pagination>
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


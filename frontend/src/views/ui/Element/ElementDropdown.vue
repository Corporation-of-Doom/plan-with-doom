<template>
	<vue-scroll class="page-element-dropdown">
		<div class="page-header">
			<h1>Element Dropdown
				<theme-picker style="float:right"></theme-picker>
			</h1>
			<h4><a href="http://element.eleme.io/#/en-US/component/dropdown" target="_blank"><i class="mdi mdi-book-open-page-variant"></i> see from the complete documentation</a></h4>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Triggering element" name="1">
					<el-dropdown class="m-5">
					<el-button type="primary">
						Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>Action 1</el-dropdown-item>
						<el-dropdown-item>Action 2</el-dropdown-item>
						<el-dropdown-item>Action 3</el-dropdown-item>
						<el-dropdown-item>Action 4</el-dropdown-item>
						<el-dropdown-item>Action 5</el-dropdown-item>
					</el-dropdown-menu>
					</el-dropdown>
					&nbsp;
					<el-dropdown split-button type="primary" @click="handleClick" class="m-5">
					Dropdown List
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>Action 1</el-dropdown-item>
						<el-dropdown-item>Action 2</el-dropdown-item>
						<el-dropdown-item>Action 3</el-dropdown-item>
						<el-dropdown-item>Action 4</el-dropdown-item>
						<el-dropdown-item>Action 5</el-dropdown-item>
					</el-dropdown-menu>
					</el-dropdown>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code1"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Command event" name="1">
					<el-dropdown @command="handleCommand" trigger="click">
					<span class="el-dropdown-link">
						Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="a">Action 1</el-dropdown-item>
						<el-dropdown-item command="b">Action 2</el-dropdown-item>
						<el-dropdown-item command="c">Action 3</el-dropdown-item>
						<el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
						<el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
					</el-dropdown-menu>
					</el-dropdown>
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
	name: 'ElementDropdown',
	methods: {
      handleClick() {
        alert('button click');
	  },
	  handleCommand(command) {
        this.$message('click on item ' + command);
      }
    },
	data() {
		return {
			value1: true,
	        value2: true,
			code1: 
`
<el-dropdown>
  <el-button type="primary">
    Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
  </el-button>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>Action 1</el-dropdown-item>
    <el-dropdown-item>Action 2</el-dropdown-item>
    <el-dropdown-item>Action 3</el-dropdown-item>
    <el-dropdown-item>Action 4</el-dropdown-item>
    <el-dropdown-item>Action 5</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<el-dropdown split-button type="primary" @click="handleClick">
  Dropdown List
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>Action 1</el-dropdown-item>
    <el-dropdown-item>Action 2</el-dropdown-item>
    <el-dropdown-item>Action 3</el-dropdown-item>
    <el-dropdown-item>Action 4</el-dropdown-item>
    <el-dropdown-item>Action 5</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

<script>
  export default {
    methods: {
      handleClick() {
        alert('button click');
      }
    }
  }
<\/script>`
		,code2:
`
<el-dropdown @command="handleCommand" trigger="click">
  <span class="el-dropdown-link">
    Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">Action 1</el-dropdown-item>
    <el-dropdown-item command="b">Action 2</el-dropdown-item>
    <el-dropdown-item command="c">Action 3</el-dropdown-item>
    <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
    <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

<script>
  export default {
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
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


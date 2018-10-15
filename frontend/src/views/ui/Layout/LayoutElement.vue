<template>
	<vue-scroll class="page-layout-element">
		<div class="page-header">
			<h1>Layout Element</h1>
			<h4><a href="http://element.eleme.io/#/en-US/component/layout" target="_blank"><i class="mdi mdi-book-open-page-variant"></i> see from the complete documentation</a></h4>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Basic layout" name="1" class="code1">
					<el-row>
						<el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
					</el-row>
					<el-row>
						<el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
					</el-row>
					<el-row>
						<el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
						<el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
					<el-row>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
					</el-row>
					<el-row>
						<el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
						<el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
						<el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
					</el-row>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code1"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Column spacing" name="1" class="code2">
					<el-row :gutter="20">
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code2"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Hybrid layout" name="1" class="code3">
					<el-row :gutter="20">
						<el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code3"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Column offset" name="1" class="code4">
					<el-row :gutter="20">
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code4"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Alignment" name="1" class="code5">
					<el-row type="flex" class="row-bg">
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
					<el-row type="flex" class="row-bg" justify="center">
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
					<el-row type="flex" class="row-bg" justify="end">
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
					<el-row type="flex" class="row-bg" justify="space-between">
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
					<el-row type="flex" class="row-bg" justify="space-around">
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
						<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
					</el-row>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code5"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Responsive Layout" name="1" class="code6">
					<el-row :gutter="10">
						<el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
						<el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
						<el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
						<el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
					</el-row>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code6"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
	</vue-scroll>
</template>

<script>
export default {
	name: 'LayoutElement',
	data() {
		return {
			code1: 
`
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<el-row>
  <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
<el-row>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
<el-row>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 5px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 5px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>`
		,code2: 
`
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 5px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 5px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>`
		,code3: 
`
<el-row :gutter="20">
  <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
</el-row>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 5px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 5px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>`
		,code4: 
`
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 5px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 5px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>`
		,code5: 
`
<el-row type="flex" class="row-bg">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="center">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="end">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="space-between">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
<el-row type="flex" class="row-bg" justify="space-around">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>

<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 5px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 5px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>`
		,code6: 
`
<el-row :gutter="10">
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>

<style>
  .el-col {
    border-radius: 5px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 5px;
    min-height: 36px;
  }
</style>`
		
		}
	},
}
</script>

<style lang="scss" scoped>
.demo-box {
	padding: 40px;
	margin-bottom: 40px;
}
pre {
	margin: 0;
	background: white;
}
code {
	padding: 0;
}

@media (max-width: 768px) {code{font-size: 70%;}}

.code1 {
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 5px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 5px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
}

.code2 {
	.el-row {
		margin-bottom: 20px;
		&:last-child {
		margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 5px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 5px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
}

.code3 {
	.el-row {
		margin-bottom: 20px;
		&:last-child {
		margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 5px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 5px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
}

.code4 {
	.el-row {
		margin-bottom: 20px;
		&:last-child {
		margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 5px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 5px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
}

.code5 {
	.el-row {
		margin-bottom: 20px;
		&:last-child {
		margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 5px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 5px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
}

.code6 {
	.el-col {
		border-radius: 5px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 5px;
		min-height: 36px;
	}
}
</style>


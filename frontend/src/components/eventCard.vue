<template>
  <el-row type="flex" class="row-bg" style="height: 25%;border-style:outset; margin:10px">
    <el-col style="background: white;" :xs="21" :sm="22" :md="22" :lg="23" :xl="23">
      <div style="padding-left:20px">
        <h3>Title</h3>
        <p>organizer</p>
        <el-row >
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p>Location</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p>Date</p>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col style="background: #0091e0; 
      writing-mode: vertical-rl;
      height:fill;"
      :xs="3" :sm="2" :md="2" :lg="1" :xl="1">
      <div style="text-align: center;
      vertical-align: middle;
      font-size: 1.5vw; height: 100%">
        EVENT
      </div>
    </el-col>
  </el-row>
</template>


<script>
// import { detect } from 'detect-browser'
// const browser = detect()

// export default {
// 	name: 'Card',
// 	props: ['title'],
// 	data() {
// 		return {
// 			isIe: true,
// 			isEdge: true,
// 			activeLink: null
// 		}
// 	},
// 	methods: {
// 		goto(index, indexPath) {
// 			if(index.charAt(0) === '/') {
// 				this.$router.push(index)
// 				this.$emit('push-page', {page:index})
// 			}

// 		},
// 		setLink(path) {
// 			this.activeLink = path
// 		}
// 	},
// 	created() {
// 		if(browser.name !== 'ie') this.isIe = false
// 		if(browser.name !== 'edge') this.isEdge = false

// 		this.setLink(this.$router.currentRoute.path)
// 		this.$router.afterEach((to, from) => {
// 			this.setLink(this.$router.currentRoute.path)
// 			//console.log('afterEach', to, from)
// 		})
// 		//console.log('this.$router.currentRoute.path', this.$router.currentRoute.path)
// 	},
// 	mounted() {
// 		//console.log('nav component mounted')				
// 	}
// }
</script>

<style lang="scss">

</style>

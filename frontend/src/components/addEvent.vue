<template>
  <el-card @click.native="createEvent" class="box-card" style="margin:10px; text-align:center;" shadow="hover" >
    <div >
        Add New Event
    </div>
  </el-card>
</template>
<script>
import { detect } from 'detect-browser'
const browser = detect()

export default {
	name: 'AddEvent',
	data() {
		return {
		}
	},
	methods: {
		createEvent() {
			this.$router.push('CreateEvent')
		},
	},
}
</script>
<template>
  <el-card @click.native="createSeminar" class="box-card" style="margin:10px; text-align:center;" shadow="hover" >
    <div >
        Add New Seminar
    </div>
  </el-card>
</template>
<script>
import { detect } from 'detect-browser'
const browser = detect()

export default {
	name: 'AddSeminar',
	data() {
		return {
		}
	},
	methods: {
		createSeminar() {
			this.$store.commit("setEdit",{editMode: false})
			this.$router.push('CreateSeminar')
		},
	},
}
</script>
<template>
	<div class="page-profile-edit">
		<div class="label-switch-box">
			<el-button v-if="!edit" type="primary" @click="onEdit">Edit</el-button>
		</div>

		<el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="First name">
						<el-input :disabled="!edit" v-model="form.first_name"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Middle name">
						<el-input :disabled="!edit" v-model="form.middle_name"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Last name">
						<el-input :disabled="!edit" v-model="form.last_name"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Organization">
						<el-input :disabled="!edit" v-model="form.organization"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email">
						<el-input :disabled="!edit" v-model="form.email" type="email"/>
					</el-form-item>
					<p v-if="error.show" style="color:red"> {{error.message}}</p>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Phone">
						<el-input :disabled="!edit" v-model="form.phone_number" placeholder="+1 xxx xxx xxxx"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="LinkedIn">
						<el-input :disabled="!edit" v-model="form.linked_in" placeholder="LinkedIn.com">
							 <template slot="prepend">http://</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Twitter">
						<el-input :disabled="!edit" v-model="form.twitter" placeholder="Twitter.com">
							 <template slot="prepend">http://</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Facebook">
						<el-input :disabled="!edit" v-model="form.facebook" placeholder="facebook.com">
							 <template slot="prepend">http://</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Instagram">
						<el-input :disabled="!edit" v-model="form.instagram" placeholder="Instagram.com">
							 <template slot="prepend">http://</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col class="col-p">
				<el-form-item label="About me">
					<el-input placeholder="Tell me about yourself" :disabled="!edit" type="textarea" v-model="form.about_me" autosize></el-input>
				</el-form-item>
			</el-col>
			<el-col v-if="edit" class="col-p">
				<el-form-item>
					<el-button type="primary" @click="onSubmit">Save</el-button>
					<el-button @click="onCancel">Cancel</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default {
	name: 'ProfileEdit',
	data() {
		return {
			user: this.$store.state.user,
			edit: false,
			form: {
				first_name: this.$store.state.user.first_name,
				middle_name: this.$store.state.user.middle_name,
				last_name: this.$store.state.user.last_name,
				email: this.$store.state.user.email,
				phone_number: this.$store.state.user.phone_number,
				linked_in:this.$store.state.user.linked_in,
				twitter: this.$store.state.user.twitter,
				facebook: this.$store.state.user.facebook,
				instagram: this.$store.state.user.instagram,
				about_me: this.$store.state.user.about_me,
				organization: this.$store.state.user.organization,
			},
			labelPosition: 'right',
			error: {
				show: false,
				message: "Email can't be empty"
			}
		}
	},
	methods: {
		onSubmit() {
			var property = "\n"
			var info = ''
			if(this.form.email){
				for (var key in this.form) {
					property += key+'\n'
					if (this.form[key]) {
						info += key+': "'+this.form[key]+'", '
					}
				}
				fetch({query: `mutation {
					editProfile(userID: ${this.user.id}, user: {
						${info}
					}) {
						first_name
						middle_name
						last_name
						email
						phone_number
						linked_in
						twitter
						facebook
						instagram
						about_me
					}
				}`})
				.then(res => {
					if (res.data.editProfile) {
						this.$store.commit("setUser",this.form)
						this.$message({
							message: 'Your profile has been updated! :)',
							type: 'success'
						});
						this.edit = false
					} else {
						this.$message({
							message: 'Something went wrong with updating your profile! :(',
							type: 'error'
						});
					}
				})
			} else {
				this.error.show = true
			}
		},
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'	
			}
		},
		onEdit(){
			this.edit = true
		},
		onCancel(){
			this.form.first_name = this.$store.state.user.first_name
			this.form.middle_name = this.$store.state.user.middle_name
			this.form.last_name = this.$store.state.user.last_name
			this.form.email = this.$store.state.user.email
			this.form.organization = this.$store.state.user.organization
			this.form.phone_number = this.$store.state.user.phone_number
			this.form.linked_in =this.$store.state.user.linked_in
			this.form.twitter = this.$store.state.user.twitter
			this.form.facebook = this.$store.state.user.facebook
			this.form.instagram = this.$store.state.user.instagram
			this.form.about_me = this.$store.state.user.about_me
			this.edit = false			

		}
	},
	mounted() {
		this.resizeLabelPosition();
		window.addEventListener('resize', this.resizeLabelPosition);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition);
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-profile-edit {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
		padding: 0 10px;
		box-sizing: border-box;
	}
	.select-wide {
		width: 100%;
	}
}
</style>

<template>
	<div class="page-profile-edit">
		<div class="label-switch-box">
			<el-button v-if="!edit" type="primary" @click="onEdit">Edit</el-button>
			<!-- <span>label: </span>
			<el-radio-group v-model="labelPosition" size="small">
				<el-radio-button label="left">Left</el-radio-button>
				<el-radio-button label="right">Right</el-radio-button>
				<el-radio-button label="top">Top</el-radio-button>
			</el-radio-group> -->
		</div>

		<el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email">
						<el-input :disabled="!edit" v-model="form.email" type="email"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="First name">
						<el-input :disabled="!edit" v-model="form.firstName"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Middle name">
						<el-input :disabled="!edit" v-model="form.middleName"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Last name">
						<el-input :disabled="!edit" v-model="form.lastName"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Organization">
						<el-input :disabled="!edit" v-model="form.orgnization"/>
					</el-form-item>
				</el-col>
			</el-col>
			<!-- <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Birthday">
						<el-date-picker type="date" placeholder="Pick a date" v-model="form.birthday" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Gender">
						<el-radio-group v-model="form.gender">
							<el-radio label="Male" border></el-radio>
							<el-radio label="Female" border></el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-col> -->
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Phone">
						<el-input :disabled="!edit" v-model="form.phone" placeholder="+1 xxx xxx xxxx"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="LinkedIn">
						<el-input :disabled="!edit" v-model="form.linkedIn" placeholder="LinkedIn.com">
							 <template slot="prepend">Http://</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Twitter">
						<el-input :disabled="!edit" v-model="form.twitter" placeholder="Twitter.com">
							 <template slot="prepend">Http://</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Facebook">
						<el-input :disabled="!edit" v-model="form.facebook" placeholder="facebook.com">
							 <template slot="prepend">Http://</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Instagram">
						<el-input :disabled="!edit" v-model="form.insta" placeholder="Instagram.com">
							 <template slot="prepend">Http://</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Address">
						<el-input :disabled="!edit" v-model="form.address"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Postal code">
						<el-input :disabled="!edit" v-model="form.postalCode"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="City">
						<el-input :disabled="!edit" v-model="form.city"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Country">
						<el-input :disabled="!edit" v-model="form.country"/>
					</el-form-item>
				</el-col>
			</el-col>
			<!-- <el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Hobbies">
						<el-select
							class="select-wide"
							v-model="form.hobbies"
							multiple
							filterable
							allow-create
							default-first-option
							placeholder="Choose tags for your hobbies">
							<el-option
							v-for="item in hobbies"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Skills">
						<el-select
							class="select-wide"
							v-model="form.skills"
							multiple
							filterable
							allow-create
							default-first-option
							placeholder="Choose tags for your skills">
							<el-option
							v-for="item in skills"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-col>
						 -->
			<el-col class="col-p">
				<el-form-item label="About me">
					<el-input  :disabled="!edit" type="textarea" v-model="form.aboutMe" autosize></el-input>
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

export default {
	name: 'ProfileEdit',
	data() {
		return {
			user: this.$store.state.user,
			edit: false,
			form: {
				firstName: this.$store.state.user.first_name,
				middleName: this.$store.state.user.middle_name,
				lastName: this.$store.state.user.last_name,
				email: this.$store.state.user.email,
				orgnization: this.$store.state.user.orgnization,
				// birthday: '1991-02-13T23:00:00.000Z',
				phone: this.$store.state.user.phone_number,
				linkedIn:this.$store.state.user.linked_in,
				twitter: this.$store.state.user.twitter,
				facebook: this.$store.state.user.facebook,
				insta: this.$store.state.user.instagram,
				// hobbies: [],
				// skills: ['JavaScript', 'HTML', 'CSS', 'Vue.js'],
				gender: 'Female',
				address: '',
				city: '',
				country: '',
				postalCode: '',
				aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus posuere libero, nec convallis arcu ullamcorper a. Vestibulum diam neque, egestas scelerisque arcu a, fermentum ornare mauris. Ut venenatis vulputate maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
			},
			hobbies: [
				{
					value: 'Model building',
					label: 'Model building'
				}, {
					value: 'Drawing',
					label: 'Drawing'
				}, {
					value: 'Snowboarding',
					label: 'Snowboarding'
				}
			],
			skills: [
				{
					value: 'HTML',
					label: 'HTML'
				}, {
					value: 'CSS',
					label: 'CSS'
				}, {
					value: 'JavaScript',
					label: 'JavaScript'
				}
			],
			labelPosition: 'right'
		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
			this.edit = false
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
			this.firstName = this.$store.state.user.first_name
			this.middleName = this.$store.state.user.middle_name
			this.lastName = this.$store.state.user.last_name
			this.email = this.$store.state.user.email
			this.orgnization = this.$store.state.user.orgnization
			this.phone = this.$store.state.user.phone_number
			this.linkedIn =this.$store.state.user.linked_in
			this.twitter = this.$store.state.user.twitter
			this.facebook = this.$store.state.user.facebook
			this.insta = this.$store.state.user.instagram
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

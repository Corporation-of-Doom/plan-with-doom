<template>
	<vue-scroll style="overflow:hidden">
	<div class="create-seminar">
			<div class="seminarForm">

				<h1>Creating an seminar</h1>

				<div class="image-cropper" id="seminarImg">
					<img src="@/assets/images/doggo.jpeg" class="rounded" />
				</div>
				
				<p>Seminar Name</p>
				<el-input v-model="seminarName" placeholder="Ex. Seminar of Doom"></el-input>

                <p>Related Event</p>

				<el-select v-model="eventSelected" placeholder="Select event">
					<el-option
					v-for="(i) in managingEvents" :key="i.id" :value="i.id" :label="i.name">
					{{ i.name }}
					</el-option>
				</el-select>
			
				<p>Start Date</p>

				<el-date-picker
					v-model="startDate"
					value-format="yyyy-MM-dd"
					type="date"
					placeholder="Start Date">
					clearable
				</el-date-picker>

				<el-time-picker
					v-model="startTime"
					format="hh:mm A"
					clearable
					placeholder="Start Time">
				</el-time-picker>

				<p>End Date</p>
				<el-date-picker
					v-model="endDate"
					value-format="yyyy-MM-dd"
					type="date"
					placeholder="End Date">
					clearable
				</el-date-picker>

				<el-time-picker
					v-model="endTime"
					format="hh:mm A"
					clearable
					placeholder="End Time">
				</el-time-picker>
		
				<p>Capacity Type</p>
				<el-radio v-model="capacityType" label="FFA">Free for all</el-radio>
				<el-radio v-model="capacityType" label="FCFS_P">First come first serve (physically)</el-radio>
				<el-radio v-model="capacityType" label="FCFS_E">First come first serve (electronically)</el-radio>

				<el-input-number
					v-if="capacityType=='FFA'"
					disabled
					v-model="capacityNum" 
					:precision="0"
					:min="1" 
					:max="9999">
				</el-input-number>

				<el-input-number
					v-if="capacityType!='FFA'"
					v-model="capacityNum" 
					:precision="0"
					:min="1" 
					:max="9999">
				</el-input-number>

				<p>Location</p>
				<p>Country</p>
				<el-input v-model="countryInput" placeholder="Canada" ></el-input>
				<p>City</p>
				<el-input v-model="cityInput" placeholder="Guelph"></el-input>
				<p>Postal Code</p>	
				<el-input v-model="postalInput" placeholder="N1G 2W1"></el-input>
				<p>Address</p>	
				<el-input v-model="addressInput" placeholder="50 Stone Rd E"></el-input>
				
				<p>Website</p>
				<el-input v-model="urlInput" placeholder="www.planwithdoom.com"></el-input>

				<p>Description</p>
				<el-input
					type="textarea"
					autosize
					placeholder="Ex. People gather to discuss their individual dooms"
					v-model="descriptionInput">
				</el-input>

				<p>Add Seminar Organizer(s)</p>
				<el-transfer
					filterable
					:titles="['Available', 'Selected']"
					filter-placeholder="Available organizers"
					v-model="selectedOrganizers"
					:data="transferData"
				></el-transfer>

			</div>

			<!-- buttons -->
			<br>
			<el-button type="success" v-on:click="onSubmit" round >Create Seminar</el-button>	
			<el-button type="danger" @click="onCancel" round>Cancel</el-button>
	
	</div>	
	</vue-scroll>
</template>

<script>
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });
console.clear();
export default {
	  name: 'CreateSeminar',
	  
		data() {
			return {
				user: this.$store.state.user,
				seminarName: '',
				startDate: '',
				endDate: '',      	
				startTime: '',
				endTime: '',
				capacityType: 'FFA',
				capacityNum: 1,
				countryInput: '',
				cityInput: '',
				postalInput: '',
				addressInput: '',
				urlInput: '',
				descriptionInput: '',
				transferData: [],
                selectedOrganizers: [],	
				managingEvents: [],
				eventSelected: null
			};
		},
		mounted() {

				// fetches a list of organizers to be displayed in the transfer component
				fetch({
					query: `{
							searchUsersByName(searchString: "") {
								id
								first_name
								middle_name
								last_name
							}
						}`
					}).then(res => {
					if (res.data) {

						// store all the organizers name into a variable
						// you shouldn't be allowed to choose yourself as a user
						res.data.searchUsersByName.forEach(element => {
							if (this.user.id !== element.id) {
				
								this.transferData.push({
									label: element.first_name+" "+element.last_name,
									key: element.id,
								})
							}
						});
						
					} else {
						console.log(res.errors)
					}		
				}).catch(err => {
					console.log(err);
				}); 
			
			// fetches the logged in user's managing events
            fetch({
                query: `query getMyManagingEventsAndSeminars($ID: Int!){
  							getMyManagingEventsAndSeminars(userID: $ID, type: "event") {
    							... on Event {
      								id
      								name
    							}
  							}
						}`, variables: {ID: this.user.id}
            }).then(res => {
                if (res.data) {
					this.managingEvents = res.data.getMyManagingEventsAndSeminars
                } else {
                    console.log(res.errors)
                }		
            }).catch(err => {
                console.log(err);
            });
		},

    methods: {
		onSubmit: function(event) {
			
			if (this.seminarName && 
			this.startDate && this.endDate && 
			this.startTime && this.endTime &&
			this.capacityType && this.eventSelected !==null)
			{				
				var temp = ''

				// parse the start time
				temp = this.startTime.toString().split(" ")
				temp = temp[4].toString().split(":")
				var startT = temp[0] + ":" + temp[1]
				
				// parse the end time
				temp = this.endTime.toString().split(" ")
				temp = temp[4].toString().split(":")
				var endT = temp[0] + ":" + temp[1]

				// set the number of capacity to null if it is FFA
				if (this.capacityType == "FFA") {
					this.capacityNum = null
				} 

				// Add yourself as the organizer
				this.selectedOrganizers.push(this.user.id)

				console.log("event_id: " + this.eventSelected)
				console.log("name: " + this.seminarName)
				console.log("start_time: " + this.startDate + " " + startT)
				console.log("end_time: " + this.endDate + " " + endT)
				console.log("capacity_type: " + this.capacityType)
				console.log("max_capacity: " + this.capacityNum)
				console.log("organizer_ids: " + this.selectedOrganizers)

				fetch({
					query: `mutation createSeminar($seminar: SeminarInput!){
						createSeminar(seminar: $seminar){
						id
						}
					}`,
					variables: {
						seminar: {		
							event_id: this.eventSelected,
							name: this.seminarName,
							description: this.descriptionInput,
							start_time: this.startDate + " " + startT,
							end_time: this.endDate + " " + endT,
							capacity_type: this.capacityType,
							max_capacity: this.capacityNum,
							location: this.addressInput + ", " + this.cityInput + ", " + this.countryInput + ", " + this.postalInput,
							organizer_ids: this.selectedOrganizers
						}
					}	
				
				}).then(res => {
					console.log(res.data)
					if (res.data) {
						alert("Seminar created successfully!")
						var payload = {
							__typename: "Seminar",
							id: res.data.createSeminar.id
						}
						this.$store.commit("addToManage",payload)
						this.$router.push('ManageEvents')
					} else {
						console.log(res.errors)
					}
				}).catch(err => {
					console.log(err);
				});
			}

			// Make sure the user enter information in the required fields
			var errorMsg = 'The following fields are missing: \n'
			var errorVal = 0
	
			if (!this.seminarName) {
				errorMsg = errorMsg + 'seminar name\n '
				errorVal = 1 
			}

			if (this.eventSelected === null) {
				errorMsg = errorMsg + 'event\n '
				errorVal = 1
			}

			if (!this.startDate) {
				errorMsg = errorMsg + 'start date\n '
				errorVal = 1
			}

			if (!this.startTime) {
				errorMsg = errorMsg + 'start time\n '
				errorVal = 1
			}

			if (!this.endDate) {
				errorMsg = errorMsg + 'end date\n '
				errorVal = 1
			}

			if (!this.endTime) {
				errorMsg = errorMsg + 'end time\n '
				errorVal = 1
			}

			if (!this.capacityType) {
				errorMsg = errorMsg + 'capacity type\n '
				errorVal = 1
			}

			if (errorVal == 1) {
				alert(errorMsg)
			}
		},
	  
		onCancel() {
			this.$confirm('The seminar information will be discarded. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning',
				center: true
			}).then(() => {
				this.$message({
					type: 'success',
					message: 'Delete completed'
				});
				this.$router.push('ManageEvents')
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Delete canceled'
				});
			});
        },
        
	} //METHODS
  };

</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
@import '../../assets/scss/_mixins';

.image-cropper {
    width: 150px;
    height: 150px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
}

img {
    display: inline;
    margin: 0 auto;
    height: 100%;
}

.seminar-name {
	position: relative;
}

</style>


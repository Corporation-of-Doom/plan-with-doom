<template>
	<vue-scroll style="overflow:hidden">
		<div class="create-event">
			<div class="eventForm">

				<h1 v-if="editEvent"> Editing an event </h1>
				<h1 v-else>Creating an event</h1>

				<!-- event image allow user to upload a photo -->
				<div class="image-cropper" id="eventImg">
					<img src="http://www.electricvelocity.com.au/upload/blogs/smart-e-bike-side_2.jpg" class="rounded" />
				</div>
				
				<p>Name</p>
				<el-input v-model="eventName" placeholder="Ex. Convention of Doom"></el-input>

				<p>Start Date</p>

				<el-date-picker
					v-model="startDate"
					value-format="yyyy-MM-dd"
					type="date"
					clearable
					placeholder="Start Date">
				</el-date-picker>

				<el-time-picker
					v-model="startTime"
					format="hh:mm A"
					value-format="hh:mm"
					clearable
					placeholder="Start Time">
				</el-time-picker>

				<p>End Date</p>
				<el-date-picker
					v-model="endDate"
					value-format="yyyy-MM-dd"
					type="date"
					clearable
					placeholder="End Date">
				</el-date-picker>

				<el-time-picker
					v-model="endTime"
					format="hh:mm A"
					value-format="hh:mm"
					clearable
					placeholder="End Time">
				</el-time-picker>
		
				<p>Capacity Type</p>
				
				<el-radio v-model="capacityType" label="FFA">Free for all</el-radio>
				
					<el-radio v-model="capacityType" @click="capacityVisibleFCFSP=true" label="FCFS_P">First come first serve (physically)</el-radio>
					<el-input-number
						:visible.sync="capacityVisibleFCFSP"
						v-if="capacityType=='FCFS_P'"
						v-model="capacityNum" 
						:precision="0"
						:min="1" 
						:max="9999">
					</el-input-number>
				
				<div class="capacity-box-fcfse">
					<el-radio v-model="capacityType" @click="capacityVisibleFCFSE=true" label="FCFS_E">First come first serve (electronically)</el-radio>
					<el-input-number
						:visible.sync="capacityVisibleFCFSP"
						v-if="capacityType=='FCFS_E'"
						v-model="capacityNum" 
						:precision="0"
						:min="1" 
						:max="9999">
					</el-input-number>
				</div>

				<p>Location</p>
				<div>
					<el-input placeholder="Please input" v-model="locationLink">
						<template slot="prepend">Google Map Link</template>
					</el-input>
				</div>
				<p>Address</p>
				<el-input v-model="addressInput" placeholder="50 Stone Rd E, Guelph, ON N1G 2W1" ></el-input>
				
				<p>Website</p>
				<el-input v-model="urlInput" placeholder="www.planwithdoom.com"></el-input>

				<p>Description</p>
				<el-input
					type="textarea"
					autosize
					placeholder="Ex. People gather to discuss their individual dooms"
					v-model="descriptionInput">
				</el-input>

				<p>Add Event Organizer(s)</p>
				<el-transfer
					filterable
					:titles="['Available', 'Selected']"
					filter-placeholder="Available organizers"
					v-model="selectedOrganizers"
					:data="transferData">
				</el-transfer>

			</div>

			<!-- buttons -->
			<br>
			<el-button v-if="editEvent" type="success" v-on:click="onSubmit" round >Update Event</el-button>
			<el-button v-else type="success" v-on:click="onSubmit" round >Create Event</el-button>
			<el-button type="danger" @click="onCancel" round>Cancel</el-button>
	
		</div>	
	</vue-scroll>
</template>

<script>
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });
import * as moment from 'moment'
console.clear();
export default {
  	name: 'CreateEvent',
		
		data() {
			return {
				user: this.$store.state.user,
				eventName: '',
				startDate: '',
				endDate: '',
				startTime: '',
				endTime: '',
				capacityType: 'FFA',
				capacityNum: 1,
				addressInput: '',
				urlInput: '',
				descriptionInput: '',
				transferData: [],
				selectedOrganizers: [],
				editEvent: this.$store.state.editMode,
				locationLink:'',
				capacityVisibleFCFSP: false,
				capacityVisibleFCFSE: false
			};
		},

		mounted() {

			if (this.editEvent == false)
				console.log("EDIT MODE FALSE");
			else 
				console.log("EDIT MODE TRUE");

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
						console.log(res.data);
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

				if (this.editEvent === true) {
					
					var eventInfo = this.$store.state.event

					// displays current event info
					this.eventName = eventInfo.name
					this.descriptionInput = eventInfo.description
					this.startDate = moment(parseInt(eventInfo.start_time_utc,10)).format("YYYY-MM-DD")
					this.endDate = moment(parseInt(eventInfo.end_time_utc,10)).format("YYYY-MM-DD")
					this.startTime = moment(parseInt(eventInfo.start_time_utc,10)).format("HH:mm")
					this.endTime = moment(parseInt(eventInfo.end_time_utc,10)).format("HH:mm")
					this.capacityType = eventInfo.capacity_type
					this.capacityNum = eventInfo.max_capacity
					this.addressInput = eventInfo.location
					this.urlInput = eventInfo.website

					for (var i = 0; i < eventInfo.organizers.length; i++) {
						this.selectedOrganizers.push(eventInfo.organizers[i].id)
					}

					console.log("Name: " + this.eventName);
					console.log("Description: " + this.descriptionInput);
					console.log("start date: " + this.startDate);
					console.log("start time: " + this.startTime);
					console.log("end date: " + this.endDate);
					console.log("end time: " + this.endTime);
					console.log("capacity type: " + this.capacityType);
					console.log("max capacity: " + this.capacityNum);	
					console.log("organizers: " + this.selectedOrganizers);	
					console.log("location: "+ this.addressInput);
					console.log("website: " + this.urlInput);
				}
			
		},
	
    methods: {
		onSubmit: function(event) {
			if (this.eventName && 
			this.startDate && this.endDate && 
			this.startTime && this.endTime &&
			this.capacityType)
			{					
				console.log("STARTTIME: " + this.startTime);
				console.log("ENDTIME: " + this.endTime);

				var temp = ''

				// set the number of capacity to null if it is FFA
				if (this.capacityType == "FFA") {
					this.capacityNum = null
				} 

				// Add yourself as the organizer
				// this.selectedOrganizers.push(this.user.id)

				console.log("startTime: "+ this.startTime);
				console.log("endTime: "+ this.endTime);


				console.log("name: " + this.eventName)
				console.log("start_time: " + this.startDate + " " + this.startTime)
				console.log("end_time: " + this.endDate + " " + this.endTime)
				console.log("capacity_type: " + this.capacityType)
				console.log("max_capacity: " + this.capacityNum)
				console.log("organizer_ids: " + this.selectedOrganizers)

				if (this.editEvent === true) {
					console.log("---------");
					console.log('EVENT ID:  ' + this.$store.state.event.id);
					console.log("******");
					console.log("description: " + this.descriptionInput);
					console.log("max_capacity: " + this.capacityNum);
					console.log("start_time: " + this.startDate + " " + this.startTime);
					console.log("end_time: " + this.endDate + " " + this.endTime);
					console.log("name: " + this.eventName);
					console.log("capacity_type: " + this.capacityType);
					console.log("organizer_ids: " + this.selectedOrganizers);

					fetch({
					query: `mutation editEvent($myid: Int!, $myEvent: EventUpdateInput!){
						editEvent(eventID:$myid, event: $myEvent){
						name
						id
						}
					}`,
					variables: {
						myid: this.$store.state.event.id,
						myEvent: {
							description: this.descriptionInput,
							max_capacity: this.capacityNum,
							start_time: this.startDate + " " + this.startTime,
							end_time: this.endDate + " " + this.endTime,
							name: this.eventName,
							capacity_type: this.capacityType,
							organizer_ids: this.selectedOrganizers,
							location_link: this.locationLink,
							location: this.addressInput,
							website: this.urlInput
						}
					}			
				}).then(res => {
					console.log(res.data)
					if (res.data) {
						alert("Event updated successfully!")
						var payload = {
							__typename: "Event",
							id: res.data.editEvent.id
						}
						this.$store.commit("addToManage",payload)
						this.$router.push('ManageEvents')
					} else {
						console.log(res.errors)
						alert(res.errors[0].message)
					}
				}).catch(err => {
					console.log(err);
				})

				} else {

				fetch({
					query: `mutation createEvent($event: EventInput!){
						createEvent(event: $event){
						id
						}
					}`,
					variables: {
						event: {		
							creator_id: this.user.id,
							name: this.eventName,
							description: this.descriptionInput,
							start_time: this.startDate + " " + this.startTime,
							end_time: this.endDate + " " + this.endTime,
							capacity_type: this.capacityType,
							max_capacity: this.capacityNum,
							organizer_ids: this.selectedOrganizers,
							location_link: this.locationLink,
							location: this.addressInput,
							website: this.urlInput
						}
					}			
				}).then(res => {
					console.log(res.data)
					if (res.data) {
						alert("Event created successfully!")
						var payload = {
							__typename: "Event",
							id: res.data.createEvent.id
						}
						this.$store.commit("addToManage",payload)
						this.$router.push('ManageEvents')
					} else {
						console.log(res.errors)
						alert(res.errors[0].message)
					}
				}).catch(err => {
					console.log(err);
				});

				}
			}

			// Make sure the user enter information in the required fields
			var errorMsg = 'The following fields are missing: \n'
			var errorVal = 0
	
			if (!this.eventName) {
				errorMsg = errorMsg + 'event name\n '
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
			this.$confirm('The event information will be discarded. Continue?', 'Warning', {
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
		}
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

.event-name {
	position: relative;
}


</style>


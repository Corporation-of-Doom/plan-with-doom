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
			
				<p>Date</p>
				<el-date-picker
					is-range
					v-model="dateRange"
					type="daterange"
					align="right"
					value-format="yyyy-MM-dd"
					unlink-panels
					range-separator="To"
					start-placeholder="Start date"
					end-placeholder="End date">
				</el-date-picker>

				<p>Time</p>
				<el-time-picker
					is-range
					format="HH:mm"
					v-model="timeRange"
					range-separator="To"
					start-placeholder="Start time"
					end-placeholder="End time">
				</el-time-picker>
		
				<p>Capacity Type</p>
				<el-radio v-model="capacityType" label=1>Free for all</el-radio>
				<el-radio v-model="capacityType" label=2>First come first serve (physically)</el-radio>
				<el-radio v-model="capacityType" label=3>First come first serve (electronically)</el-radio>

				<el-input-number
					v-if="capacityType==1"
					disabled
					v-model="capacityNum" 
					:min="1" 
					:max="9999">
				</el-input-number>

				<el-input-number
					v-if="capacityType!=1"
					v-model="capacityNum" 
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
					v-model="organizerList"
					:data="transferData">
				</el-transfer>

			</div>

			<!-- buttons -->
			<br>
			<el-button type="success" v-on:click="onSubmit" round >Create Seminar</el-button>	
			<el-button type="danger" @click="onCancel" round>Cancel</el-button>
	
	</div>	
		</vue-scroll>
</template>

<script>
// some JS file
import store from '../../store'; // path to your Vuex store
let userid = store.state.user.id;
// do stuff with user
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });
var availableOrganizers = []
var organizerid = []

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
				console.clear()

			res.data.searchUsersByName.forEach(element => {
				if (userid !== element.id) {
					availableOrganizers.push(element.first_name+" "+element.last_name)	
					organizerid.push(element.id)
				}
			
			});

		} else {
			console.log(res.errors)
		}		
	}).catch(err => {
		console.log(err);
	}); 

export default {
  	name: 'CreateSeminar',
		
		data() {

			var populateTranfer = _ => {
				var data = []
				var initials = availableOrganizers
				
				availableOrganizers.forEach((names, index) => {
					
					data.push({
						label: names,
						key: index,
						initial: initials[index]
					});
				});
				return data;
      		};

			return {
				user: this.$store.state.user,
				seminarName: '',
				dateRange: '',      	
				timeRange: '',
				capacityType: '',
				capacityNum: 1,
				countryInput: '',
				cityInput: '',
				postalInput: '',
				addressInput: '',
				urlInput: '',
				descriptionInput: '',
				transferData: populateTranfer(),
                organizerList: [],	
				managingEvents: [],
				eventSelected: null,
				// temp1: []
			};
		},
		mounted() {
			// console.log(event);
            fetch({
                query: `query getMyManagingEventsAndSeminars($ID: Int!){
  							getMyManagingEventsAndSeminars(userID: $ID, type: "event") {
    							... on Event {
      								id
      								name
    							}
  							}
						}`
				,
                variables: {ID: this.user.id}
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
			
			if (this.seminarName && this.dateRange && this.timeRange && this.capacityType && this.eventSelected !==null)
			{					
				var temp = this.dateRange.toString().split(",")
				var start_time = temp[0]
				var end_time = temp[1]

				var times = this.timeRange.toString().split(' ')
				temp = times[4].split(':')
				start_time = start_time + ' ' + temp[0] + ':' + temp[1]
				temp = times[12].split(':')
				end_time = end_time + ' ' + temp[0] + ':' + temp[1]
			
				temp = this.capacityType
				var capacity_type = ''
				var capacity_num = null

				if (temp == 1) {
					capacity_type = 'FFA'
				} else if (temp == 2) {
					capacity_type = 'FCFS_P'
					capacity_num = this.capacityNum
				} else if (temp == 3) {
					capacity_type = 'FCFS_E'
					capacity_num = this.capacityNum
				}
					
				// console.log('Seminar name: ' + this.seminarName + '\nStart date: ' + start_time + '\nEnd date: ' + end_time + '\nCapacity type: ' + capacity_type + '\nCapacity number: ' + capacity_num)
				
				var selectedOrganizer = []
				console.log("organizerListlength: " + this.organizerList.length)

				for (var i = 0; i < this.organizerList.length; i++) {
					console.log(i + ": " + this.organizerList[i] )
					selectedOrganizer.push(organizerid[this.organizerList[i]])
				}

				console.log("selectedOrganizer: " + selectedOrganizer[0])
				selectedOrganizer.push(this.user.id)

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
							start_time: start_time,
							end_time: end_time,
							capacity_type: capacity_type,
							max_capacity: capacity_num,
							location: this.addressInput + ", " + this.cityInput + ", " + this.countryInput + ", " + this.postalInput,
							organizer_ids: selectedOrganizer
						}
					}	
				
				}).then(res => {
					if (res.data) {
						alert("Seminar created successfully!")
						this.$router.push('ManageEvents')
					} else {
						console.log(res.errors)
					}
				}).catch(err => {
					console.log(err);
				});
			}

			if (!this.seminarName)
				alert('Please enter a name for your seminar!')

			if (!this.dateRange)
				alert('Please select a date for your seminar!')

			if (!this.timeRange)
				alert('Please select a time for your seminar!')	

			if (!this.capacityType)
				alert('Please select a capacity type for your seminar!')
			
			if (this.eventSelected === null){
				console.log("aaahhhh", this.eventSelected);
				alert('Please select an event for your seminar!')
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


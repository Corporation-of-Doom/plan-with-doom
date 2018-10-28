<template>
		<vue-scroll class="page-profile" id="affix-container">

	<div class="my-event">

		<div id="eventForm">

			<!-- event image 
				 allow user to upload a photo -->
			<div class="image-cropper">
	    		<img src="http://www.electricvelocity.com.au/upload/blogs/smart-e-bike-side_2.jpg" class="rounded" />
			</div>
			
			<p>Name</p>
			<el-input placeholder="Ex. Convention of Doom" v-model="input"></el-input>

			<p>Date</p>
		    <el-date-picker
		    	is-range
				v-model="value7"
				type="daterange"
				align="right"
				unlink-panels
				range-separator="To"
				start-placeholder="Start date"
				end-placeholder="End date">
		    </el-date-picker>

			<!-- Make sure the date and time uses a consistent form
				 There should be a start time and end time form -->
			<p>Time</p>
			<el-time-picker
			    is-range
			    v-model="value4"
			    range-separator="To"
			    start-placeholder="Start time"
			    end-placeholder="End time">
  			</el-time-picker>
	
			<p>Location</p>
			<p>Country</p>
			<el-input placeholder="Canada" v-model="input"></el-input>
			<p>City</p>
			<el-input placeholder="Guelph" v-model="input"></el-input>
			<p>Postal Code</p>	
			<el-input placeholder="N1G 2W1" v-model="input"></el-input>
			<p>Address</p>	
			<el-input placeholder="50 Stone Rd E" v-model="input"></el-input>


			<p>Capcity Type</p>

		    <el-radio-group v-model="form.resource">
		      	<el-radio label="Free for all"></el-radio>
		      	<el-radio label="First come first serve (physically)"></el-radio>
		      	<el-radio label="First come first serve (electronically)"></el-radio>
		    </el-radio-group>
			
			<p>Website</p>
			<el-input placeholder="www.planwithdoom.com" v-model="input"></el-input>


			<p>Description</p>
			<el-input
			  type="textarea"
			  autosize
			  placeholder="Ex. People gather to discuss their individual dooms"
			  v-model="textarea2">
			</el-input>

			<p>Add Event Organizer(s)</p>

			


		</div>

<!-- buttons -->
<el-button type="success" round>Create Event</el-button>	
<el-button type="danger" @click="open6" round>Cancel</el-button>
	</div>
		</vue-scroll>
</template>

<script>
  export default {
  	name: 'MyEvent',
    data() {
      return {

      	value4: '',
		enddate_value: '',
		value7: '',      	

      	form: {
          resource: '',
        }
      
      };
    },

    methods: {
    		onSubmit() {
        console.log('submit!');
      }
      ,
      open6() {
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });
        });
      }

	}
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


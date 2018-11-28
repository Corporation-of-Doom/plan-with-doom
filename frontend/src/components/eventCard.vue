<template>
  <el-row type="flex" class="row-bg" style="height: 25%;border-style:outset; margin:10px">
    <el-col style="background: white;" :xs="21" :sm="22" :md="22" :lg="23" :xl="23">
      <div style="padding-left:20px">
        <el-row>
            <el-col :xs="21" :sm="21" :md="18" :lg="12" :xl="12">
              <h3>{{item.name}}</h3>
            </el-col>
             <el-col :xs="3" :sm="3" :md="6" :lg="12" :xl="12" style="padding-top:20px">
              <div v-if="follow">
			        	<i class="mdi mdi-checkbox-marked-circle">Following</i> <br>
              </div>
              <div v-if="attend">
			        	<i class="mdi mdi-checkbox-marked-circle">Attending</i> <br>
              </div>
            </el-col>
        </el-row>
        <p>{{item.creator_id}}</p>
        <el-row >
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p>Location: {{item.event_location}} </p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p>Date: {{item.start_time}} - {{item.end_time}} </p>
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
import { detect } from 'detect-browser'
const browser = detect()

export default {
	name: 'Card',
	props: {
    item:{
      type: Object, 
      default:{
        start_time:"Start Time Unavaiable",
        end_time: "End Time Unavaiable",
        name: "Name Unvailable",
        creator_id: "Organizer Unavailable",
        event_location: "Location Unavailable",
      }
    },
    follow:{
      type: Boolean,
      default: false,
    },
    attend: {
      type: Boolean,
      default: false,
    },
  },	
}
</script>

<style lang="scss">

</style>

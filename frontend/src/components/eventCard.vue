<template>
  <el-row type="flex" class="row-bg" style="height: 25%;border-style:outset; margin:10px">
    <el-col style="background: white;" :xs="21" :sm="22" :md="22" :lg="23" :xl="23">
      <div style="padding-left:20px">
        <h3>{{item.name}}</h3>
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
        event_location: "Location Unavailable"
      }
    }
  },
	
}
</script>

<style lang="scss">

</style>

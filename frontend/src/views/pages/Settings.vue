<template>
<vue-scroll class="page-dashboard">
  <div class="timeline-box card-base card-shadow--medium" style="height: 65%; padding: 20px">
    <!-- Privacy Settings:<br>
    <el-select placeholder="TBD">
        <el-option :key="TBD" :label="TBD" :value="TBD">
       TBD
        </el-option>
    </el-select> <br> -->
    <!-- Home Screen: <br>
    <el-select placeholder="TBD">
        <el-option :key="TBD" :label="TBD" :value="TBD">
        TBD
        </el-option>
    </el-select><br> -->
    <div style="padding:20px; content-align:center">
        Sidebar Orientations <br>
        <el-select v-model="sidebar.value" @change="onChangeSidebar">
            <el-option :key="sidebar.left" :label="sidebar.left" :value="sidebar.left" />
            <el-option :key="sidebar.right" :label="sidebar.right" :value="sidebar.right" />
            <el-option :key="sidebar.top" :label="sidebar.top" :value="sidebar.top" />
            <el-option :key="sidebar.bottom" :label="sidebar.bottom" :value="sidebar.bottom" />
        </el-select>
    </div>
  </div>
</vue-scroll>
</template>

<script>
import seminarCard from '@/components/seminarCard.vue'
import addEvent from '@/components/addEvent.vue'
import addSeminar from '@/components/addSeminar.vue'
import {loadSeminars,loadEvents} from './helper'
import * as moment from 'moment'
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default {
  name: 'Settings',
   data() {
      return {
        sidebar:{
            left: 'Left',
            right: 'Right',
            top: 'Top',
            bottom: 'Bottom',
            value: 'Left'
        },
        user: this.$store.state.user,
        showAddSeminar: false,
        TBD: 'TBD'
      };
    },
  mounted() {
  },
  methods: {
      onChangeSidebar(event){
          console.log('hererererere' + event)
      }
  },
  components: {
    seminarCard, 
    addEvent,
    addSeminar
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
@import '../../assets/scss/_mixins';

.msg-box {
	max-width: 240px;
	margin: 50px auto;

	h1 {
		@include text-bordered-shadow();
	}
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>



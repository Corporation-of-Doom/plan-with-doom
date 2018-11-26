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
    <font size="+1" style="padding:10px">Autosave </font> <br>
    <hr>
    <div style="padding:20px; content-align:center">
        Sidebar Orientations <br>
        <el-select v-model="sidebar.value" @change="onChangeSidebar">
            <el-option :key="sidebar.left.text" :label="sidebar.left.text" :value="sidebar.left.value" />
            <el-option :key="sidebar.right.text" :label="sidebar.right.text" :value="sidebar.right.value" />
            <el-option :key="sidebar.top.text" :label="sidebar.top.text" :value="sidebar.top.value" />
            <el-option :key="sidebar.bottom.text" :label="sidebar.bottom.text" :value="sidebar.bottom.value" />
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
            left: {
              text:'Left',
              value: 'left'
            },
            right: {
              text: 'Right',
              value: 'right'
            },
            top: {
              text: 'Top',
              value: 'top'
            },
            bottom: {
              text: 'Bottom',
              value: 'bottom'
            },
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
          this.$store.commit("changeLayout", {navPos: event})
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



<template>
<vue-scroll class="page-dashboard">
  <div class="timeline-box card-base card-shadow--medium" style="height: 65%; padding: 20px">
    <!-- Privacy Settings:<br>
    <el-select placeholder="TBD">
        <el-option :key="TBD" :label="TBD" :value="TBD">
       TBD
        </el-option>
    </el-select> <br> -->
    
    <font size="+1" style="padding:10px">Autosave </font> <br>
    <hr>
    <div style="padding:20px; content-align:center">
        Sidebar Orientations <br>
        <el-select  v-model="sidebarValue" @change="onChangeSidebar">
          <el-option v-for="item in sidebar" :key="item.text" :label="item.text" :value="item.value" />
        </el-select>
    </div>
    <div style="padding:20px; content-align:center">
        Landing Page: <br>
        <el-select v-model="landingPageValue" @change="onChangeLandingPage">
          <el-option v-for="item in home" :key="item.text" :label="item.text" :value="item.value" />
        </el-select><br>
    </div>
  </div>
</vue-scroll>
</template>

<script>
import seminarCard from '@/components/seminarCard.vue'
import addEvent from '@/components/addEvent.vue'
import addSeminar from '@/components/addSeminar.vue'
import {loadSeminars,loadEvents,capitialLetter,getLandingPage } from './helper'
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
        },
        home:{
          search: {
            text:'Search',
            value: 'search'
          },
          myEvent: {
            text:'My Events',
            value: 'myevents'
          },
          calendar: {
            text:'Calendar',
            value: 'calendar'
          },
          newsFeed: {
            text:'News Feed',
            value: 'timeline'
          },
          manageEvent: {
            text:'Manage Event',
            value: 'manageevents'
          },
          profile: {
            text:'Profile',
            value: 'profile'
          },
          settings: {
            text:'Settings',
            value: 'settings'
          },          
        },
        sidebarValue: capitialLetter(this.$store.state.user.menu_orientation),
        landingPageValue: getLandingPage(this.$store.state.user.landing_page),
        user: this.$store.state.user,
        showAddSeminar: false,
        dialog: false,
        message: "",
        TBD: 'TBD'
      };
    },
  mounted() {
  },
  methods: {
    onChangeSidebar(event){
      fetch({query:`mutation {
        editProfile(userID: ${this.user.id}, user: {menu_orientation: ${event.toUpperCase()}}){
          first_name
        }
      }`})
      .then(res => {
        if (res.data){ 
          this.$store.commit("setLayout", {navPos: event})
        } else{
          this.$message({
            message: 'Something went wrong when updating your menu bar. :(',
            type: 'error'
          });
        }
      })
    },
    onChangeLandingPage(event){
      fetch({query:`mutation {
        editProfile(userID: ${this.user.id}, user: {landing_page: "${event}"}) {
          first_name
        }
      }`})
      .then(res => {
        if (res.data){ 
          this.$store.commit("setUser", {landing_page: event})
          this.$message({
            message: 'Your landing page has been changed! :)',
            type: 'success'
          });
        } else {
          this.$message({
            message: 'Something went wrong when updating your landing page. :(',
            type: 'error'
          });
        }
      })
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



<template>
  <vue-scroll class="page-dashboard">
    <div class="timeline-box card-base card-shadow--medium" style="height: auto; padding: 20px">
      <el-input
        placeholder="Search"
        prefix-icon="el-icon-search"
        v-model="searchInput"
        @change="onSearch"
        style="margin-bottom: 20px"
      />
      <div style="height:20%" v-for="item in currentList" :key="item.id">
        <el-card shadow="always" style="text-align:center;padding:20px;margin-bottom:10px;height:20%" @click.native="loadUser(item.id)">
          <el-col> {{item.first_name}} {{item.middle_name}} {{item.last_name}} </el-col>
        </el-card>
      </div>
    </div>
  </vue-scroll>
</template>

<script>
import seminarCard from '@/components/seminarCard.vue'
import eventCard from '@/components/eventCard.vue'
import Search from '@/components/Search.vue'
import { createApolloFetch } from "apollo-fetch"
import * as moment from 'moment'
import {loadEvents, loadSeminars} from './helper'
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default {
  name: 'UserSearch',
   data() {
      return {
        searchInput: "",
        offSet: 0,
        currentList: [],
        total: 0,
        key: 0,
        user: this.$store.state.user
      };
    },
   mounted() {
    //  gets all the cards for events and seminars
      fetch({
        query: `{
          searchUsersByName(searchString: "") {
            id
            first_name
            middle_name
            last_name
          }
        }`
      })
      .then(res => {
        if (res.data) {
          this.currentList = res.data.searchUsersByName.filter(item => item.id != this.user.id)
        } else {
          this.$message({
            message: "Something went wrong loading the users",
            type: "error"
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
    },

    methods: {
      onSearch(event){
        // seach all events and semina based on key word
        fetch({
          query: `{
            searchUsersByName(searchString: "${event}") {
              id
              first_name
              middle_name
              last_name
            }
          }`
        })
        .then(res => {
          if (res.data) {
            this.currentList = res.data.searchUsersByName.filter(item => item.id != this.user.id)
          } else {
            this.$message({
              message: "Something went wrong loading the users",
              type: "error"
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
        // gets total number events and seminar for pagination
        fetch({
          query: `{
            getTotalSearchResults(searchString: "${event}") 
          }`
        })
        .then(res=> {
          if(res.data){
            this.total = res.data.getTotalSearchResults;
          }
        })
        .catch(err =>{
          console.log(err)
        })
      },
      loadUser(id){
        fetch({
          query: `{
            getUserById(userID: ${id}){
              first_name
              middle_name
              last_name
              email
              organization
              linked_in
              twitter
              facebook
              instagram
              phone_number
              privacy_settings
              about_me
            } 
          }`
        })
        .then(res => {
          if(res.data.getUserById){
            this.$store.commit("loadUser",res.data.getUserById)
            this.$router.push("userprofile")
          } else {
            this.$message({
              message: "Something went wrong loading the user :("
            })
          }
        })
      }
    },
  components: {
    seminarCard,
    eventCard,
    Search
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

<template> 
  <vue-scroll style="background:white;">
    <h1 style="margin-bottom:5px; margin-top:20px;text-align:center;">{{info.name}} </h1>
    <p style="margin:10px;margin-top:0px;text-align:center;">  {{info.event_name}} </p>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin-right:10px">
        <el-button v-if="manageInfo.status" title="Edit" type="primary"> {{manageInfo.edit}} Seminar </el-button>
        <el-button v-else-if="followInfo.status" @click="unfollow" type="primary" plain title="Unfollow">{{followInfo.following}}</el-button>
        <el-button v-else @click="follow" type="primary" title="Follow">{{followInfo.follow}}</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-left:10px">
        <el-button v-if="hideAttend" @click="attend" type="primary" title="Must attend the event" disabled>{{attendInfo.attend}}</el-button>
        
        
        <div v-if="manageInfo.status">

        <el-button title="Announcement" type="primary" @click="dialogVisible = true"> {{manageInfo.announcement}} </el-button>

          <el-dialog
            
            title="Post an announcement"
            :visible.sync="dialogVisible"
            width="30%">

            <el-input
              id="post"
              type="textarea"
              :rows="2"
              placeholder="Message here"
              clearable
              v-model="postMessage">
            </el-input>

            <span slot="footer" class="dialog-footer">
              <el-button @click="onCancel">Cancel</el-button>
              <el-button type="primary" @click="onPost">Post</el-button>
            </span>

          </el-dialog>

        </div>
        
        

        <el-button v-else-if="attendInfo.status" @click="unattend" type="primary" plain title="Unattend">{{attendInfo.attending}}</el-button>
        <el-button v-else @click="attend" type="primary" title="Attend">{{attendInfo.attend}}</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin:10px">
      Location: {{info.location}}
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin:10px;">
      <p>Start Date: {{info.start_time}}</p>
      <p>End Date: {{info.end_time}}</p>
      </el-col>
    </el-row>
    <hr>
    <p>Description<p>
    <p> {{info.discription}} </p>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="News" name="news">
        <el-card v-for="(announcement,key) in info.announcements" :key="key" class="box-card" style="margin:10px" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{announcement.date_modified}}</span>
        </div>
        <div>
          {{announcement.message}}
        </div>
      </el-card>
      </el-tab-pane>
      <el-tab-pane label="Organizers" name="organizers" >
        <div v-for="(organizer,key) in info.organizers" :key="key">
          {{organizer.first_name}} {{organizer.last_name}}
        </div>
      </el-tab-pane>
    </el-tabs>
  </vue-scroll>
</template>

<script>
import { createApolloFetch } from "apollo-fetch"
import * as moment from 'moment'
import {followAndAttend, unfollowAndUnattend} from './helper'
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default {
  name: "SeminarPage",
  data() {
    return {
      postMessage: '',
      followInfo: {
        status: this.$store.state.seminar.follow,
        follow: "Follow",
        following: "Following"
      },
      attendInfo: {
        status: this.$store.state.seminar.attend,
        attend: "Attend",
        attending: "Attending"
      }, 
      manageInfo: {
        status: this.$store.state.seminar.manage,
        edit: "Edit",
        announcement: "Post Announcment"
      },
      hideAttend: this.$store.state.seminar.hideAttend,
      activeName:'news',
      info: this.$store.state.seminar,
      userid:this.$store.state.user.id,
      dialogVisible: false
    };
  },
  methods: {
    onCancel() {
      this.dialogVisible = false
      this.postMessage = ''
    },

    onPost() {

      if (this.postMessage) {
        fetch({
            query: ` mutation createSeminarAnnoucement($announcement: AnnouncementInput!) {
              createSeminarAnnouncement(announcement: $announcement) {
                  id
                  date_modified
                }
              }`,
            variables: {
              announcement: {		
                type_id: this.$store.state.seminar.id,
                message: this.postMessage
              }
            }
            }).then(res => {
            if (res.data) {
              console.log("Test: " + JSON.stringify(res.data.createSeminarAnnouncement));
              var temp =  moment(parseInt(res.data.createSeminarAnnouncement.date_modified,10)).format("MMMM Do YYYY, h:mm a")
              this.$store.commit("addAnnouncement", {type: "Seminar", message: this.postMessage, date_modified: temp})
              this.dialogVisible = false
              this.postMessage=''   
            } else {
              console.log(res.errors)
            }		
          }).catch(err => {
            console.log(err);
          }); 
      } else {
        alert("There is nothing to post.")
      }
    },
    follow() {
      followAndAttend('Seminar', 'FOLLOWING').then(function(result) {
        if (result){
          this.followInfo.status = true
        } else{
          this.followInfo.status = false
        }
      }.bind(this))
    },
    attend() {
      followAndAttend('Seminar', 'ATTENDING').then(function(result) {
        if (result){
          this.attendInfo.status = true
        } else{
          this.attendInfo.status = false
        }
      }.bind(this))
    },
    changeTab(tab, event) {
        console.log(tab, event);
      },
    unfollow(){
      unfollowAndUnattend('Seminar', 'FOLLOWING').then(function(result) {
        if (result){
          this.followInfo.status = false
        } else{
          this.followInfo.status = true
        }
      }.bind(this))
    },
    unattend(){
      unfollowAndUnattend('Seminar', 'ATTENDING').then(function(result) {
        if (result){
          this.attendInfo.status = false
        } else{
          this.attendInfo.status = true
        }
      }.bind(this))
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_variables";
@import "../../assets/scss/_mixins";

.msg-box {
  max-width: 240px;
  margin: 50px auto;

  h1 {
    @include text-bordered-shadow();
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>


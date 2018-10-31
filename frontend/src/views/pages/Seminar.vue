<template> 
  <vue-scroll style="background:white;">
    <h1 style="margin-bottom:5px; margin-top:20px;text-align:center;">{{info.name}} </h1>
    <p style="margin:10px;margin-top:0px;text-align:center;">  {{info.event_id}} </p>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin-right:10px">
        <el-button v-if="followInfo.status" @click="unfollow" type="primary" plain>{{followInfo.following}}</el-button>
        <el-button v-else @click="follow" type="primary">{{followInfo.follow}}</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-left:10px">
        <el-button v-if="attendInfo.status" @click="unattend" type="primary" plain>{{attendInfo.attending}}</el-button>
        <el-button v-else @click="attend" type="primary">{{attendInfo.attend}}</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin:10px;">
      Date: {{info.start_time}} - {{info.end_time}}
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin:10px">
      Location: {{info.location}}
      </el-col>
    </el-row>
    <hr>
    <p>Discription<p>
    <p> {{info.discription}} </p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="News" name="news">
        <el-card v-for="(announcement,key) in announcements" :key="key" class="box-card" style="margin:10px" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{announcement.date_modified}}</span>
        </div>
        <div>
          {{announcement.message}}
        </div>
      </el-card>
      </el-tab-pane>
      <el-tab-pane label="Organizers" name="organizers" v-for="(organizer,key) in info.organizers" :key="key" >{{organizer.first_name}} {{organizer.last_name}}</el-tab-pane>
    </el-tabs>
  </vue-scroll>
</template>

<script>
export default {
  name: "SeminarPage",
  data() {
    return {
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
      activeName:'news',
      info: this.$store.state.seminar,
      userid:this.$store.state.user.id
    };
  },
  methods: {
    follow() {
      
      fetch({query: `mutation addUserToSeminar($newUser: EventParticipationInput!) {
              addUserToEvent(EventParticipation: $newUser)   
            }`,
          variables: {
            newUser: {
              userid: this.userid,
              seminarid: this.info.id,
              participationType: "FOLLOWING"
            }
          }
        })
      .then(res =>{
          console.log(res)
        if(res.data){
          this.followInfo.status = !this.followInfo.status
        }
      })
    },
    attend() {
      fetch({query: `mutation addUserToSeminar($newUser: EventParticipationInput!) {
              addUserToEvent(EventParticipation: $newUser)   
            }`,
          variables: {
            newUser: {
              userid: this.userid,
              seminarid: this.info.id,
              participationType: "ATTENDING"
            }
          }
        })
      .then(res =>{
        if(res.data){
          this.attendInfo.status = !this.attendInfo.status;     
        }
      })
    },
    handleClick(tab, event) {
        console.log(tab, event);
      },
      unfollow(){
      fetch({query: `mutation emoveUserFromSeminar($newUser: EventParticipationInput!) {
              addUserToEvent(EventParticipation: $newUser)   
            }`,
          variables: {
            newUser: {
              userid: this.userid,
              seminarid: this.info.id,
              participationType: "FOLLOWING"
            }
          }
        })
      .then(res =>{
        if(res.data){
          this.followInfo.status = !this.followInfo.status
        }
      })
    },
    unattend(){
      fetch({query: `mutation removeUserFromSeminar($newUser: EventParticipationInput!) {
              removeUserToEvent(EventParticipation: $newUser)   
            }`,
          variables: {
            newUser: {
              userid: this.userid,
              seminarid: this.info.id,
              participationType: "ATTENDING"
            }
          }
        })
      .then(res =>{
        if(res.data){
          this.attendInfo.status = !this.attendInfo.status;     
        }
      })
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


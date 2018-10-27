<template> 
  <vue-scroll style="background:white;">
    <h1 style="margin-bottom:5px; margin-top:20px;text-align:center;">Seminar Title </h1>
    <p style="margin:10px;margin-top:0px;text-align:center;"> Event Title </p>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin-right:10px">
        <el-button v-if="followInfo.status" @click="follow" type="primary" plain>{{followInfo.following}}</el-button>
        <el-button v-else @click="follow" type="primary">{{followInfo.follow}}</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-left:10px">
        <el-button v-if="attendInfo.status" @click="attend" type="primary" plain>{{attendInfo.attending}}</el-button>
        <el-button v-else @click="attend" type="primary">{{attendInfo.attend}}</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right;margin:10px;">
      Date + Time
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin:10px">
      Location
      </el-col>
    </el-row>
    <hr>
    <p>Discription<p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deleniti laboriosam fuga cum saepe sequi necessitatibus provident, hic cupiditate dolores quaerat eos veniam? Architecto dicta temporibus illum totam, adipisci asperiores? </p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="News" name="news">
        <el-card v-for="i in 4" :key="i" class="box-card" style="margin:10px" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{'Announcement '+ i}}</span>
        </div>
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, iusto voluptate ea placeat mollitia autem ipsum dolorem ad, aspernatur vero error corporis. Voluptatibus dignissimos nihil, dicta alias error qui eum?
        </div>
      </el-card>
      </el-tab-pane>
      <el-tab-pane label="Organizers" name="organizers">Organizers</el-tab-pane>
    </el-tabs>
  </vue-scroll>
</template>

<script>
export default {
  name: "SeminarPage",
  data() {
    return {
      followInfo: {
        status: false,
        follow: "Follow",
        following: "Following"
      },
      attendInfo: {
        status: false,
        attend: "Attend",
        attending: "Attending"
      },
      activeName:'news'
    };
  },
  methods: {
    follow() {
      this.followInfo.status = !this.followInfo.status;
    },
    attend() {
      this.attendInfo.status = !this.attendInfo.status;
    },
    handleClick(tab, event) {
        console.log(tab, event);
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


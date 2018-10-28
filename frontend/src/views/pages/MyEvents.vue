<template>

          <vue-scroll class="page-dashboard">
  <div>
    <el-tabs type="border-card" style="width:100%">
      <el-tab-pane label="All">
        <el-row type="flex" class="row-bg">
          Fliter:
          <el-dropdown @command="changeFilterText" style="margin-left:10px;margin-top:1px;" >
            <span class="el-dropdown-link">
              {{ filter }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="None">None</el-dropdown-item>
              <el-dropdown-item command="Attending">Attending</el-dropdown-item>
              <el-dropdown-item command="Following">Following</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
        <div>
            <seminar-card v-for="i in 5" :key="i" @click.native="loadEvent"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Event">
        <el-row type="flex" class="row-bg">
          Fliter:
          <el-dropdown @command="changeFilterText" style="margin-left:10px;margin-top:1px;" >
            <span class="el-dropdown-link">
              {{ filter }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="None">None</el-dropdown-item>
              <el-dropdown-item command="Attending">Attending</el-dropdown-item>
              <el-dropdown-item command="Following">Following</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
          Event
      </el-tab-pane>
      <el-tab-pane label="Seminar">
        <el-row type="flex" class="row-bg">
          Fliter:
          <el-dropdown @command="changeFilterText" style="margin-left:10px;margin-top:1px;" >
            <span class="el-dropdown-link">
              {{ filter }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="None">None</el-dropdown-item>
              <el-dropdown-item command="Attending">Attending</el-dropdown-item>
              <el-dropdown-item command="Following">Following</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
        Seminar
      </el-tab-pane>
    </el-tabs>
  </div>
          </vue-scroll>
</template>

<script>
import seminarCard from '@/components/seminarCard.vue'
import Search from '@/components/Search.vue'
export default {
  name: 'SearchPage',
   data() {
      return {
        activeName: 'first',
        filter: "None"
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      changeFilterText(command){
        this.filter = command;
      },
      loadEvent(){
        this.$router.push("event")
      }
    },
  components: {
    seminarCard, Search
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


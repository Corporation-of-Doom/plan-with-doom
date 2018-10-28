<template>

<vue-scroll class="page-dashboard">
  <div>
    <el-tabs type="border-card" style="width:100%">
      <el-tab-pane label="All">
        <add-event/>
        <add-seminar/>
        <div>
            <seminar-card v-for="i in 5" :key="i" @click.native="loadEvent"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Event">
        <add-event/>
      </el-tab-pane>
      <el-tab-pane label="Seminar">
        <add-seminar/>
      </el-tab-pane>
    </el-tabs>
  </div>
</vue-scroll>
</template>

<script>
import seminarCard from '@/components/seminarCard.vue'
import addEvent from '@/components/addEvent.vue'
import addSeminar from '@/components/addSeminar.vue'
export default {
  name: 'ManageEventsPage',
   data() {
      return {
        activeName: 'all',
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



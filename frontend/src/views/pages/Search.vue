<template>

          <vue-scroll class="page-dashboard">
  <div>
    <el-tabs type="border-card" style="width:100%">
      <el-tab-pane label="All">
          <search style="margin-left:10px;"/>
        <div v-for="i in 5" :key="i">
            <seminar-card @click.native="loadSeminar"/>
            <event-card @click.native="loadEvent" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="Event">
        <event-card v-for="i in 5" :key="i" @click.native="loadEvent" />
      </el-tab-pane>
      <el-tab-pane label="Seminar">
        <seminar-card v-for="i in 5" :key="i" @click.native="loadSeminar" />
      </el-tab-pane>
    </el-tabs>
  </div>
          </vue-scroll>
</template>

<script>
import seminarCard from '@/components/seminarCard.vue'
import eventCard from '@/components/eventCard.vue'
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
      },
      loadSeminar(){
        this.$router.push("seminar")
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


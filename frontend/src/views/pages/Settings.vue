<template>
<vue-scroll class="page-dashboard">
  <div>
    
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
  name: 'ManageEventsPage',
   data() {
      return {
        activeName: 'all',
        filter: "None",
        currentList: [],
        user: this.$store.state.user,
        showAddSeminar: false

      };
    },
  mounted() {
  },
  methods: {
    
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



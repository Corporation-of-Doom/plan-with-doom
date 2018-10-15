<template>
	<div class="page-element-table scrollable">
		<div class="page-header">
			<h1>Element Table
				<theme-picker style="float:right"></theme-picker>
			</h1>
			<h4><a href="http://element.eleme.io/#/en-US/component/table" target="_blank"><i class="mdi mdi-book-open-page-variant"></i> see from the complete documentation</a></h4>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Table with fixed columns and header" name="1">
					<el-table
					:data="tableData3"
					style="width: 600px"
					height="250">
					<el-table-column
					fixed
					prop="date"
					label="Date"
					width="150">
					</el-table-column>
					<el-table-column
					prop="name"
					label="Name"
					width="120">
					</el-table-column>
					<el-table-column
					prop="state"
					label="State"
					width="120">
					</el-table-column>
					<el-table-column
					prop="city"
					label="City"
					width="120">
					</el-table-column>
					<el-table-column
					prop="address"
					label="Address"
					width="300">
					</el-table-column>
					<el-table-column
					prop="zip"
					label="Zip"
					width="120">
					</el-table-column>
				</el-table>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code1"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Grouping table head" name="1">
					<el-table
						:data="tableData3"
						style="width: 600px;">
						<el-table-column
						prop="date"
						label="Date"
						width="150">
						</el-table-column>
						<el-table-column label="Delivery Info">
						<el-table-column
							prop="name"
							label="Name"
							width="120">
						</el-table-column>
						<el-table-column label="Address Info">
							<el-table-column
							prop="state"
							label="State"
							width="120">
							</el-table-column>
							<el-table-column
							prop="city"
							label="City"
							width="120">
							</el-table-column>
							<el-table-column
							prop="address"
							label="Address"
							width="300">
							</el-table-column>
							<el-table-column
							prop="zip"
							label="Zip"
							width="120">
							</el-table-column>
						</el-table-column>
						</el-table-column>
					</el-table>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code2"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Filter" name="1">
					<el-table
						:data="tableData"
						style="width: 100%">
						<el-table-column
						prop="date"
						label="Date"
						sortable
						width="180"
						:filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
						:filter-method="filterHandler"
						>
						</el-table-column>
						<el-table-column
						prop="name"
						label="Name"
						width="180">
						</el-table-column>
						<el-table-column
						prop="address"
						label="Address"
						:formatter="formatter">
						</el-table-column>
						<el-table-column
						prop="tag"
						label="Tag"
						width="100"
						:filters="[{ text: 'Home', value: 'Home' }, { text: 'Office', value: 'Office' }]"
						:filter-method="filterTag"
						filter-placement="bottom-end">
						<template slot-scope="scope">
							<el-tag
							:type="scope.row.tag === 'Home' ? 'primary' : 'success'"
							close-transition>{{scope.row.tag}}</el-tag>
						</template>
						</el-table-column>
					</el-table>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code3"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Expandable row" name="1">
					<el-table
						:data="tableData3"
						style="width: 100%">
						<el-table-column type="expand">
						<template slot-scope="props">
							<p>State: {{ props.row.state }}</p>
							<p>City: {{ props.row.city }}</p>
							<p>Address: {{ props.row.address }}</p>
							<p>Zip: {{ props.row.zip }}</p>
						</template>
						</el-table-column>
						<el-table-column
						label="Date"
						prop="date">
						</el-table-column>
						<el-table-column
						label="Name"
						prop="name">
						</el-table-column>
					</el-table>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code4"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
			<el-collapse value="1">
				<el-collapse-item title="Summary row" name="1">
					<el-table
						:data="tableData6"
						border
						show-summary
						style="width: 100%">
						<el-table-column
						prop="id"
						label="ID"
						width="180">
						</el-table-column>
						<el-table-column
						prop="name"
						label="Name">
						</el-table-column>
						<el-table-column
						prop="amount1"
						sortable
						label="Amount 1">
						</el-table-column>
						<el-table-column
						prop="amount2"
						sortable
						label="Amount 2">
						</el-table-column>
						<el-table-column
						prop="amount3"
						sortable
						label="Amount 3">
						</el-table-column>
					</el-table>

					<el-table
						:data="tableData6"
						border
						height="200"
						:summary-method="getSummaries"
						show-summary
						style="width: 100%; margin-top: 20px">
						<el-table-column
						prop="id"
						label="ID"
						width="180">
						</el-table-column>
						<el-table-column
						prop="name"
						label="Name">
						</el-table-column>
						<el-table-column
						prop="amount1"
						label="Cost 1 ($)">
						</el-table-column>
						<el-table-column
						prop="amount2"
						label="Cost 2 ($)">
						</el-table-column>
						<el-table-column
						prop="amount3"
						label="Cost 3 ($)">
						</el-table-column>
					</el-table>
				</el-collapse-item>
				<el-collapse-item title="Code" name="2">
					<pre v-highlightjs="code5"><code class="html"></code></pre>
				</el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script>
import ThemePicker from '@/components/theme-picker'

export default {
	name: 'ElementTable',
	data() {
		return {
			tableData3: [{
				date: '2016-05-03',
				name: 'Tom',
				state: 'California',
				city: 'Los Angeles',
				address: 'No. 189, Grove St, Los Angeles',
				zip: 'CA 90036'
				}, {
				date: '2016-05-02',
				name: 'Tom',
				state: 'California',
				city: 'Los Angeles',
				address: 'No. 189, Grove St, Los Angeles',
				zip: 'CA 90036'
				}, {
				date: '2016-05-04',
				name: 'Tom',
				state: 'California',
				city: 'Los Angeles',
				address: 'No. 189, Grove St, Los Angeles',
				zip: 'CA 90036'
				}, {
				date: '2016-05-01',
				name: 'Tom',
				state: 'California',
				city: 'Los Angeles',
				address: 'No. 189, Grove St, Los Angeles',
				zip: 'CA 90036'
				}, {
				date: '2016-05-08',
				name: 'Tom',
				state: 'California',
				city: 'Los Angeles',
				address: 'No. 189, Grove St, Los Angeles',
				zip: 'CA 90036'
				}, {
				date: '2016-05-06',
				name: 'Tom',
				state: 'California',
				city: 'Los Angeles',
				address: 'No. 189, Grove St, Los Angeles',
				zip: 'CA 90036'
				}, {
				date: '2016-05-07',
				name: 'Tom',
				state: 'California',
				city: 'Los Angeles',
				address: 'No. 189, Grove St, Los Angeles',
				zip: 'CA 90036'
			}],
			tableData: [{
				date: '2016-05-03',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
				tag: 'Home'
				}, {
				date: '2016-05-02',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
				tag: 'Office'
				}, {
				date: '2016-05-04',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
				tag: 'Home'
				}, {
				date: '2016-05-01',
				name: 'Tom',
				address: 'No. 189, Grove St, Los Angeles',
				tag: 'Office'
			}],
			tableData6: [{
				id: '12987122',
				name: 'Tom',
				amount1: '234',
				amount2: '3.2',
				amount3: 10
				}, {
				id: '12987123',
				name: 'Tom',
				amount1: '165',
				amount2: '4.43',
				amount3: 12
				}, {
				id: '12987124',
				name: 'Tom',
				amount1: '324',
				amount2: '1.9',
				amount3: 9
				}, {
				id: '12987125',
				name: 'Tom',
				amount1: '621',
				amount2: '2.2',
				amount3: 17
				}, {
				id: '12987126',
				name: 'Tom',
				amount1: '539',
				amount2: '4.1',
				amount3: 15
			}],
			code1: 
`
<template>
  <el-table
    :data="tableData3"
    style="width: 100%"
    height="250">
    <el-table-column
      fixed
      prop="date"
      label="Date"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="120">
    </el-table-column>
    <el-table-column
      prop="state"
      label="State"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="City"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Address"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="Zip"
      width="120">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }]
      }
    }
  }
<\/script>`
		,code2:
`
<template>
  <el-table
    :data="tableData3"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="Date"
      width="150">
    </el-table-column>
    <el-table-column label="Delivery Info">
      <el-table-column
        prop="name"
        label="Name"
        width="120">
      </el-table-column>
      <el-table-column label="Address Info">
        <el-table-column
          prop="state"
          label="State"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="City"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="Address"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="Zip"
          width="120">
        </el-table-column>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }]
      }
    }
  }
<\/script>
`
		,code3:
`
<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="Date"
      sortable
      width="180"
      :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
      :filter-method="filterHandler"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Address"
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      :filters="[{ text: 'Home', value: 'Home' }, { text: 'Office', value: 'Office' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === 'Home' ? 'primary' : 'success'"
          close-transition>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Home'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Office'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Home'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          tag: 'Office'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
<\/script>
`
		,code4:
`
<template>
  <el-table
    :data="tableData3"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <p>State: {{ props.row.state }}</p>
        <p>City: {{ props.row.city }}</p>
        <p>Address: {{ props.row.address }}</p>
        <p>Zip: {{ props.row.zip }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="Date"
      prop="date">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="name">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }]
      }
    }
  }
<\/script>
`
		,code5:
`
<template>
  <el-table
    :data="tableData6"
    border
    show-summary
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name">
    </el-table-column>
    <el-table-column
      prop="amount1"
      sortable
      label="Amount 1">
    </el-table-column>
    <el-table-column
      prop="amount2"
      sortable
      label="Amount 2">
    </el-table-column>
    <el-table-column
      prop="amount3"
      sortable
      label="Amount 3">
    </el-table-column>
  </el-table>

  <el-table
    :data="tableData6"
    border
    height="200"
    :summary-method="getSummaries"
    show-summary
    style="width: 100%; margin-top: 20px">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name">
    </el-table-column>
    <el-table-column
      prop="amount1"
      label="Cost 1 ($)">
    </el-table-column>
    <el-table-column
      prop="amount2"
      label="Cost 2 ($)">
    </el-table-column>
    <el-table-column
      prop="amount3"
      label="Cost 3 ($)">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData6: [{
          id: '12987122',
          name: 'Tom',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: 'Tom',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: 'Tom',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: 'Tom',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: 'Tom',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      };
    },
    methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total Cost';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = '$ ' + values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    }
  };
<\/script>
`
		}
	},
	methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
	  },
	  getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total Cost';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = '$ ' + values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }
    },
	components: {
		ThemePicker
	}
}
</script>

<style lang="scss" scoped>
.demo-box {
	padding: 20px;
	margin-bottom: 20px;
}
pre {
  margin: 0;
  background: white;
}
code {
	padding: 0;
}

@media (max-width: 768px) {code{font-size: 70%;}}

</style>


<template>
  <div>
    <div class="current-position">
      <span>当前位置:茶园列表</span>
      <div>
         <a-input-search  placeholder="搜索" style="width: 200px" @search="onSearch" />
        <a-button style="margin:0 10px">查询</a-button>
          <a-button type="primary">导出</a-button>

      </div>
    </div>
    <a-table :columns="columns" :pagination="pagination" :dataSource="data" class="table-header">
      
      <template slot="action" slot-scope="text" >
      <a-button type="primary" style="borderRadius:16px">订阅</a-button>

      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  { align: "center", title: "序号", dataIndex: "id", key: "id" },
  { align: "center", title: "茶园名称", dataIndex: "name", key: "name" },
  { align: "center", title: "地址", dataIndex: "address", key: "address" },
  { align: "center", title: "建园时间(年)", dataIndex: "year", key: "year" },
  { align: "center", title: "茶园面积(亩)", dataIndex: "area", key: "area" },
  { align: "center", title: "茶树品种(年)", dataIndex: "varieties", key: "varieties" },
  { align: "center",
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    id: i,
    name: `Edward King ${i}`,
    age: 32,
    year:2000+i,
    area:i,
    varieties:i,
    address: `London, Park Lane no. ${i}`
  });
}
export default {
  data() {
    return {
      data,
      columns
    };
  },

  computed: {
    pagination: {
      get() {
        return {
          defaultPageSize: 10,
          size: "middle",
          position: "bottom"
          // showSizeChanger:true,
          // onChange: this.changePage
        };
      }
    }
  },

  mounted() {},

  methods: {
    onSearch(value){

    }
  },

  components: {}
};
</script>
<style lang='stylus' scoped>
.table-header
  /deep/ .ant-table-thead th
    background-color #eee
  /deep/.ant-table-tbody > tr:hover > td
    background-color #F6F6F6
  
</style>
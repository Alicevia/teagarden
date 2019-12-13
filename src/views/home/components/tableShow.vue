<template>
  <div class="content-item">
    <div class="current-position">
      <slot name="title"></slot>
      <slot name="opreate"></slot>
    </div>
    <a-table
      :rowSelection="rowSelection"
      :columns="columns"
      :customRow="customRow"
      rowKey="id"
      :pagination="pagination"
      :dataSource="tableData"
      class="table-header"
    >
      <template slot="action" slot-scope="text">
        <slot name="action"></slot>
      </template>
      <template slot="role" slot-scope="text">
        <slot name="role"></slot>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  props: ["rowSelection", "columns", "tableData"],
  data() {
    return {};
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
    onSearch(value) {},
    tableRow(record) {
      this.$router.push({ path: "/home/detail", query: record });
      // this.$router.push({name:'detail',params:{detail:JSON.stringify(record)}})
    },
    customRow(record) {
   
      return {
        on: {
          click: e => {
            this.tableRow(record);
          }
        }
      };
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
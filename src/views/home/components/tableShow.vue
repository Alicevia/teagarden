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
      <template slot="sort" slot-scope="record,item,index">
        <span>{{index+1}}</span>
      </template>
      <template slot="action" slot-scope="record,item,index">
        <slot name="action" :record='record' ></slot>
      </template>
      <template slot="role" slot-scope="record">
        <slot name="role" :record='record'></slot>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  props: ["rowSelection", "columns", "tableData", "customRow",'pagination'],
  data() {
    return {};
  },
  computed: {
  },

  mounted() {},

  methods: {
    onSearch(value) {},
  
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
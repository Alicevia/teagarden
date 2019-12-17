<template>
  <TableShow :columns="columns" :tableData="allUserApplyLogin.list">
    <span slot="title">当前页面:用户管理</span>
    <!-- <span slot="sort" slot-scope="record">1</span> -->
    <div slot="opreate">
      <a-select defaultValue="a1" style="width: 200px" ref="select">
        <a-select-option
          v-for="i in 25"
          :key="(i + 9).toString(36) + i"
        >{{(i + 9).toString(36) + i}}</a-select-option>
      </a-select>
      <a-input-search placeholder="搜索" style="width: 200px;margin:0 10px" />
      <a-button style="backgroundColor:#00B57E;color:white">查询</a-button>
    </div>
    <a-switch slot="action" checkedChildren="已同意" unCheckedChildren="待审核" :disabled='false' />
  </TableShow>
</template>

<script>
import TableShow from "home/components/tableShow";
import { mapActions, mapState } from "vuex";
const columns = [
  { align: "center", title: "序号",key:'sort',scopedSlots: { customRender: "sort" } },
  { align: "center", title: "角色", dataIndex: "roleName", key: "roleName" },
  { align: "center", title: "手机号", dataIndex: "phone", key: "phone" },
  {
    align: "center",
    title: "审核",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  data() {
    return {
      columns,
    };
  },

  computed: {
    ...mapState(['allUserApplyLogin']),

  },
  created() {
    this.getAllUserApplyLoginInfo({ page: 1, size: 10 });
  },
  mounted() {},

  methods: {
    ...mapActions(["getAllUserApplyLoginInfo"])
  },

  components: { TableShow }
};
</script>
<style lang='stylus' scoped></style>
<template>
  <TableShow :columns="columns" :tableData="tableData">
    <span slot="title">当前页面:用户管理</span>
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
    <a-switch slot="action" checkedChildren="已同意" unCheckedChildren="待审核" disabled />
  </TableShow>
</template>

<script>
import TableShow from "home/components/tableShow";
const columns = [
  { align: "center", title: "序号", dataIndex: "id", key: "id" },
  { align: "center", title: "名称", dataIndex: "name", key: "name" },
  { align: "center", title: "角色", dataIndex: "role", key: "role" },
  { align: "center", title: "手机号", dataIndex: "phone", key: "phone" },
  {
    align: "center",
    title: "审核",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const tableData = [];
for (let i = 0; i < 46; i++) {
  tableData.push({
    id: i,
    name: `南京茶园 ${i}`,
    role: 32,
    phone: 2000 + i
  });
}
export default {
  data() {
    return {
      columns,
      tableData
    };
  },

  computed: {},

  mounted() {},

  methods: {},

  components: { TableShow }
};
</script>
<style lang='stylus' scoped></style>
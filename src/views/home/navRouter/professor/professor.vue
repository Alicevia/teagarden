<template>
  <TableShow :columns='columns' :tableData='tableData'>
    <span slot="title">当前页面:专家</span>
    <div slot="opreate">
      <a-input-search placeholder="搜索" style="width: 200px" />
      <a-button style="margin:0 10px">查询</a-button>
      <a-button type="primary">导出</a-button>
    </div>
    <a-button slot="action" type="primary" style="borderRadius:16px">
      <span class="iconfont" style="fontSize:14px">&#xe68d;</span>
      <span style="marginLeft:6px">建议</span>
    </a-button>
  </TableShow>
</template>

<script>
import TableShow from "home/components/tableShow";
const columns = [
  { align: "center", title: "序号", dataIndex: "id", key: "id" },
  { align: "center", title: "茶园名称", dataIndex: "name", key: "name" },
  { align: "center", title: "地址", dataIndex: "address", key: "address" },
  { align: "center", title: "建园时间(年)", dataIndex: "year", key: "year" },
  { align: "center", title: "茶园面积(亩)", dataIndex: "area", key: "area" },
  {
    align: "center",
    title: "茶树品种(年)",
    dataIndex: "varieties",
    key: "varieties"
  },
  {
    align: "center",
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const tableData = [];

for (let i = 0; i < 46; i++) {
  tableData.push({
    id: i,
    name: `南京茶园 ${i}`,
    age: 32,
    year: 2000 + i,
    area: i,
    varieties: i,
    address: `南京双龙大道${i}号`
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
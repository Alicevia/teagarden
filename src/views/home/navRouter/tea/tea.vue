<template>
  <TableShow :columns='columns' :tableData='teaInfo' :customRow='customRow' :rowSelection='rowSelection'>
    <span slot="title">当前页面:茶园</span>
    <div slot="opreate">
      <a-input-search placeholder="搜索" style="width: 200px" />
      <a-button style="margin:0 10px">查询</a-button>
      <a-button type="primary">导出</a-button>
    </div>
     <a-button slot="action" type="primary" style="borderRadius:16px" @click.stop="subscribeTea($event)">
      <span class="iconfont" style="fontSize:14px">&#xe65b;</span>
      <span style="marginLeft:6px" >订阅</span>
    </a-button>
  </TableShow>
</template>

<script>
import TableShow from "home/components/tableShow";
import { mapState } from 'vuex';
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

export default {
  data() {
    return {
      columns
    };
  },

  computed: {
    ...mapState(['teaInfo']),
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    },
     customRow(record) {
      return record => {
        return {
          on: {
            click: e => {
              this.$router.push({ path: "/home/detail", query: record });
            }
          }
        };
      };
    }

  },

  mounted() {},

  methods: {
    subscribeTea(e){
      console.log('23')
    }
  },

  components: { TableShow }
};
</script>
<style lang='stylus' scoped></style>
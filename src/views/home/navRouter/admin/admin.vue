<template>
  <TableShow :columns="columns" :tableData="tableData">
    <span slot="title">当前页面:权限管理</span>
    <div slot="opreate">
      <a-select defaultValue="a1" style="width: 200px" >
        <a-select-option
          v-for="i in 25"
          :key="(i + 9).toString(36) + i"
        >{{(i + 9).toString(36) + i}}</a-select-option>
      </a-select>
      <a-input-search placeholder="搜索" style="width: 200px;margin:0 10px" />
      <a-button style="backgroundColor:#00B57E;color:white">查询</a-button>
    </div>
    <a-button slot="action" size="default" style="backgroundColor:#399DCC;color:white">初始化密码</a-button>
    <template slot="role">
      <a-select defaultValue="普通用户" style="width: 200px">
        <a-select-option  v-for="(item,index) in ['普通用户','专家','管理员']" :key="index">{{item}}</a-select-option>
      </a-select>
      <a-button type="primary" style="marginLeft:10px">提交</a-button>
    </template>
  </TableShow>
</template>

<script>
import TableShow from "home/components/tableShow";
const columns = [
  { align: "center", title: "序号", dataIndex: "id", key: "id" },
  { align: "center", title: "名称", dataIndex: "name", key: "name" },
  {
    align: "center",
    title: "角色",
    dataIndex: "role",
    key: "role",
    scopedSlots: { customRender: "role" }
  },
  { align: "center", title: "手机号", dataIndex: "phone", key: "phone" },
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
    name: `张三 ${i}`,
    role: '普通用户',
    phone: 17787887888 + i
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

  methods: {
    stopClick(e){
      //   var e=window.event || arguments.callee.caller.arguments[0];
      // e.preventDefault();
      // e.stopPropagation();
      console.log(e)
    },
    handleChange(){
     var e=window.event || arguments.callee.caller.arguments[0];
      e.preventDefault();
      e.stopPropagation();
      console.log(e)
    }
  },

  components: { TableShow }
};
</script>
<style lang='stylus' scoped></style>
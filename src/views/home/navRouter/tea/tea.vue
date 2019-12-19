<template>
  <TableShow
    :columns="columns"
    :tableData="teaInfo.list"
    :customRow="customRow"
    :rowSelection="rowSelection"
    :pagination="pagination"
  >
    <span slot="title">当前页面:茶园</span>
    <div slot="opreate">
      <a-input-search v-model="name" placeholder="搜索" @keyup.enter="searchTea" style="width: 200px" />
      <a-button style="margin:0 10px" @click="searchTea">查询</a-button>
      <a-button type="primary">导出</a-button>
    </div>
    <template #action="{record}">
      <a-button
        v-if="!record.teaGardenSubscribeId"
        type="primary"
        style="borderRadius:16px"
        @click.stop="subscribeTea(record.id)"
      >
        <span class="iconfont" style="fontSize:14px">&#xe65b;</span>
        <!-- 没订阅是0 -->
        <span style="marginLeft:6px">订阅</span>
      </a-button>
      <a-button
        v-else
        type="primary"
        ghost
        style="borderRadius:16px"
        @click.stop="unSubscribeTea(record.id)"
      >
        <span class="iconfont" style="fontSize:14px">&#xe602;</span>
        <!-- 没订阅是0 -->
        <span style="marginLeft:6px">已订阅</span>
      </a-button>
    </template>
  </TableShow>
</template>

<script>
import TableShow from "home/components/tableShow";
import { mapState, mapActions } from "vuex";
import { reqSubscribeTea, reqUnSubscribeTea } from "@/api";
import utils from "../../../../utils";
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
      columns,
      current: 1,
      pageSize: 10,
      name: ""
    };
  },

  computed: {
    ...mapState(["teaInfo"]),
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
    pagination: {
      get() {
        return {
          defaultPageSize: 10,
          size: "middle",
          position: "bottom",
          current: this.current,
          pageSize: this.pageSize,
          // showSizeChanger:true,
          onChange: this.changePage,
          total: this.teaInfo.total || 0
        };
      }
    },
    customRow(record) {
      return record => {
        return {
          on: {
            click: e => {
              this.$router.push({path:'/home/detail',query:{id:record.id}})
              // this.$router.push({ path: "/home/detail", query: record });
            }
          }
        };
      };
    }
  },
  created() {
    this.getTeaInfo({ page: 1, size: 10, name: this.name });
  },
  mounted() {},

  methods: {
    ...mapActions(["getTeaInfo"]),
    // 订阅
    async subscribeTea(id) {
      let { data } = await reqSubscribeTea({ teaGardenId: id });
      utils.detailBackCode(data, { s: "订阅成功" }, () => {
        this.getTeaInfo({
          page: this.current,
          size: this.pageSize,
          name: this.name
        });
      });
    },
    // 取消订阅
    async unSubscribeTea(id) {
      let { data } = await reqUnSubscribeTea({ teaGardenId: id });
      utils.detailBackCode(data, { s: "已取消订阅" }, () => {
        this.getTeaInfo({
          page: this.current,
          size: this.pageSize,
          name: this.name
        });
      });
    },
    // 改变页码
    changePage(page, pageSize) {
      this.current = page;
      this.getTeaInfo({
        page,
        size: pageSize,
        name: this.name
      });
    },
    // 查询
    searchTea(){
       if (this.name === "") {
        message.warning("请输入查询条件");
        return;
      }
      this.current = 1
      this.getTeaInfo({
        page: this.current,
        size: this.pageSize,
        name: this.name
      });
    }
    
  },
  watch: {
    name(value) {
      if (value === "") {
        this.getTeaInfo({
          page: 1,
          size: this.pageSize,
          name: ""
        });
      }
    }
  },

  components: { TableShow }
};
</script>
<style lang='stylus' scoped></style>
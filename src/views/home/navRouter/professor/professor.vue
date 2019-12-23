<template>
  <div>
    <TableShow
      :columns="columns"
      :tableData="teaInfo.list"
      :customRow="customRow"
      :pagination="pagination"
    >
      <span slot="title">当前页面:专家</span>
      <div slot="opreate">
        <a-input-search
          v-model="name"
          placeholder="请输入茶园名"
          @keyup.enter="searchTea"
          style="width: 200px"
        />
        <a-button style="margin:0 0px 0 10px" @click="searchTea">查询</a-button>
        <!-- <a-button type="primary">导出</a-button> -->
      </div>
      <a-button slot="action" slot-scope="{record}" type="primary" style="borderRadius:16px" @click.stop="advisePro(record.id)">
        <span class="iconfont" style="fontSize:14px">&#xe68d;</span>
        <span style="marginLeft:6px">建议</span>
      </a-button>
    </TableShow>
    <RemarkDialog ref="proAdvise" theme='专家建议' :comment='{}' :searchId='searchId'></RemarkDialog>
  </div>
</template>
<script>
import RemarkDialog from "home/components/remarkDialog.vue";

import TableShow from "home/components/tableShow";
import { mapState, mapActions } from "vuex";
const columns = [
  // { align: "center", title: "序号", dataIndex: "id", key: "id" },
  {
    align: "center",
    title: "序号",
    key: "sort",
    scopedSlots: { customRender: "sort" }
  },
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
      name: "",
      searchId:''
    };
  },

  computed: {
    ...mapState(["teaInfo"]),
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
              // this.$router.push({ path: "/home/detail", query: record });
                this.$router.push({path:'/home/detail',query:{id:record.id}})
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
    advisePro(id) {
      this.searchId = id
      this.$refs['proAdvise'].showModal()
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
    searchTea() {
      if (this.name === "") {
        message.warning("请输入查询条件");
        return;
      }
      this.current = 1;
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

  components: { TableShow, RemarkDialog }
};
</script>
<style lang='stylus' scoped></style>
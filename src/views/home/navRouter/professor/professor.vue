<template>
  <div>
    <TableShow
      :columns="columns"
      :tableData="professorSuggestList.list"
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
      <a-button
        slot="action"
        slot-scope="{record}"
        type="primary"
        style="borderRadius:16px"
        @click.stop="advisePro(record.id)"
      >
        <span class="iconfont" style="fontSize:14px">&#xe68d;</span>
        <span style="marginLeft:6px">建议</span>
      </a-button>
    </TableShow>
    <RemarkDialog ref="proAdvise" theme="专家建议" :comment="{}" :searchId="searchId"></RemarkDialog>
  </div>
</template>
<script>
import RemarkDialog from "home/components/remarkDialog.vue";

import TableShow from "home/components/tableShow";
import { mapState, mapActions } from "vuex";
import { message } from "ant-design-vue";
const columns = [
  // { align: "center", title: "序号", dataIndex: "id", key: "id" },
  {
    align: "center",
    title: "序号",
    key: "sort",
    scopedSlots: { customRender: "sort" },
    width: 60
  },
  { align: "center", title: "茶园名称", dataIndex: "name", key: "name" },
  // { align: "center", title: "地址", dataIndex: "address", key: "address" },
  { align: "center", title: "建园时间(年)", dataIndex: "year", key: "year" },
  { align: "center", title: "茶园面积(亩)", dataIndex: "area", key: "area" },
  {
    align: "center",
    title: "茶树品种",
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
      searchId: ""
    };
  },

  computed: {
    ...mapState(["professorSuggestList", "userInfo"]),
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
          total: this.professorSuggestList.total || 0
        };
      }
    },
    customRow(record) {
      return record => {
        return {
          on: {
            click: e => {
              // this.$router.push({ path: "/home/detail", query: record });
              this.$router.push({
                path: "/home/detail",
                query: { id: record.id }
              });
            }
          }
        };
      };
    }
  },
  created() {
    this.getProfessorSuggestList({ page: 1, size: 10, name: this.name })
    // this.getTeaInfo({ page: 1, size: 10, name: this.name });
  },
  mounted() {},
  activated(){
    this.getProfessorSuggestList({ page: 1, size: 10, name: this.name })
  },
  methods: {
    ...mapActions(["getProfessorSuggestList"]),
    advisePro(id) {
      this.searchId = id;
      this.$refs["proAdvise"].showModal();
    },
    // 改变页码
    changePage(page, pageSize) {
      this.current = page;
      this.getProfessorSuggestList({
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
      this.getProfessorSuggestList({
        page: this.current,
        size: this.pageSize,
        name: this.name
      });
    }
  },
  // beforeRouteLeave(to,from,next){
  //   let userInfo = this.userInfo
  //   let length = to.matched.length
  //   let auth = to.matched[length-1].meta.auth
  //   next()
  //   if (!auth||auth.includes(userInfo.roleId)) {
  //     next()
  //   }else{
  //     message.warning('您暂时无权限访问该路径')
  //   }
  // },
  watch: {
    name(value) {
      if (value === "") {
        this.getProfessorSuggestList({
          page: 1,
          size: this.pageSize,
          name: ""
        });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$authority(to, from, next);
  },

  components: { TableShow, RemarkDialog }
};
</script>
<style lang='stylus' scoped></style>
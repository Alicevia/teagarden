<template>
  <TableShow :columns="columns" :tableData="allUserApplyLogin.list" :pagination="pagination">
    <span slot="title">当前页面:用户管理</span>
    <!-- <span slot="sort" slot-scope="record">1</span> -->
    <div slot="opreate">
      <a-input-search
        v-model="searchApplyUser"
        placeholder="请输入手机号"
        style="width: 200px;margin:0 10px"
      />
      <a-button style="backgroundColor:#00B57E;color:white" @click="searchApplyList">查询</a-button>
    </div>
    <template #action="{record:{id}}">
      <a-switch @click="passApply(id)" checkedChildren="已同意" unCheckedChildren="待审核" />
    </template>
  </TableShow>
</template>

<script>
import TableShow from "home/components/tableShow";
import { mapActions, mapState } from "vuex";
import { reqPassApply } from "@/api";
import utils from "@/utils";
import { message } from "ant-design-vue";
const columns = [
  {
    align: "center",
    title: "序号",
    key: "sort",
    scopedSlots: { customRender: "sort" }
  },
  { align: "center", title: "用户名", dataIndex: "name", key: "name" },

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
      searchApplyUser: "",
      current: 1,
      pageSize: 10
    };
  },

  computed: {
    ...mapState(["allUserApplyLogin"]),
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
          total: this.allUserApplyLogin.total || 0
        };
      }
    }
  },
  created() {
    this.getAllUserApplyLoginInfo({
      page: 1,
      size: 10,
      phone: this.searchApplyUser
    });
  },
  mounted() {
  },

  methods: {
    ...mapActions(["getAllUserApplyLoginInfo"]),
    // 改变页码
    changePage(page, pageSize) {
      this.current = page;
      this.getAllUserApplyLoginInfo({
        page,
        size: pageSize,
        phone: this.searchApplyUser,
      });
    },
    // 通过申请
    async passApply(id) {
      let { data } = await reqPassApply({ userId: id });
      utils.detailBackCode(data, { s: "已通过审核" }, () => {
        let { total } = this.allUserApplyLogin;
        if ((total - 1) / 10 === this.current - 1) {
          this.current = this.current - 1;
        }
        let timer = setTimeout(() => {
          clearTimeout(timer);
          this.getAllUserApplyLoginInfo({
            page: this.current,
            size: this.pageSize,
            phone: this.searchApplyUser
          });
        }, 1000);
      });
    },
    // 搜索
    searchApplyList() {
      if (this.searchApplyUser === "") {
        message.warning("请输入查询条件");
        return;
      }
      this.getAllUserApplyLoginInfo({
        page: this.current,
        size: this.pageSize,
        phone: this.searchApplyUser
      });
    }
  },
  watch: {
    searchApplyUser(value) {
      if (value === "") {
        this.getAllUserApplyLoginInfo({
          page: 1,
          size: this.pageSize,
          phone: ""
        });
      }
    }
  },
  beforeRouteLeave(to,from,next){
   this.$authority(to,from,next)
  },

  components: { TableShow }
};
</script>
<style lang='stylus' scoped></style>
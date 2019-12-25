<template>
  <TableShow :columns="columns" :tableData="allUserRoleInfo.list" :pagination='pagination'>
    <span slot="title">当前页面:权限管理</span>
    <div slot="opreate">
      <a-select placeholder="请选择角色"  style="width: 200px"  v-model="roleId" >
        <a-select-option  v-for="(item,index) in ['管理员','专家','普通用户','所有用户']" :key="index+2" >{{item}}</a-select-option>
      </a-select>
      <!-- 1 超管 2管理 3专家 4用户 -->
      <a-input-search v-model="name" placeholder="请输入用户名" style="width: 200px;margin:0 10px" />
      <a-button style="backgroundColor:#00B57E;color:white" @click="searchUserRole">查询</a-button>
    </div>
    <template #action='{record}'>
    <a-button size="default" style="backgroundColor:#399DCC;color:white" :disabled='record.roleId===1'  @click="resetUserPassword(record.id)">初始化密码</a-button>

    </template>
    <template #role='{record}'>
      <a-select @select="saveUserRoleId" @change="getUserId(record.id)" :disabled='record.roleId===1'   style="width: 200px" :defaultValue='record.roleId===1?"超级管理员":record.roleId' >
        <a-select-option  v-for="(item,index) in ['管理员','专家','普通用户']" :key="index+2">{{item}}</a-select-option>
      </a-select>
      <a-button type="primary" style="marginLeft:10px" :disabled='record.roleId===1'  @click="changeUserRole(record.id)">提交</a-button>
    </template>
  </TableShow>
</template>

<script>
import TableShow from "home/components/tableShow";
import { mapActions, mapState } from 'vuex';
import {reqModiUserRole,reqResetPassword} from '@/api'
import utils from '../../../../utils';
import { message } from 'ant-design-vue';
const columns = [
  // { align: "center", title: "序号", dataIndex: "id", key: "id" },
    {
    align: "center",
    title: "序号",
    key: "sort",
    scopedSlots: { customRender: "sort" }
  },
  { align: "center", title: "名称", dataIndex: "name", key: "name" },
  {
    align: "center",
    title: "角色",
    // dataIndex: "role",
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
export default {
  data() {
    return {
      columns,

      current: 1,
      pageSize: 10,
      name: "",
      roleId:undefined,

      
    };
  },

  computed: {
    ...mapState(['allUserRoleInfo']),
  
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
          total: this.allUserRoleInfo.total || 0
        };
      }
    },
  },
  created(){
    this.getAllUserRoleInfo({
      page:this.current,
      size:this.pageSize,
      name:this.name,
      roleId:this.roleId
    })
  },
  mounted() {},

  methods: {
    ...mapActions(['getAllUserRoleInfo']),
    // 重置密码
    async resetUserPassword(id){
      let {data} = await reqResetPassword({userId:id})
      utils.detailBackCode(data,{s:'初始化密码成功'})
    },
    // 获取修改的角色id
    getUserId(id){
      // console.log(id)
      this.userId = id
    },
    saveUserRoleId(value){
      // console.log(value)
      this.payload = {
        roleId:value
      }
    },
    // 修改用户角色
    async changeUserRole(id){
      if (this.userId!==id) {
        message.warning('您没有修改该用户角色')
        return
      }
      this.payload.userId  = id
      let {data} = await reqModiUserRole(this.payload)
      utils.detailBackCode(data,{s:'修改角色成功'},()=>{
        this.payload = null
        this.userId = null
      })
      
    },
     // 改变页码
    changePage(page, pageSize) {
      this.current = page;
      this.getAllUserRoleInfo({
        page,
        size: pageSize,
        name: this.name,
        roleId:this.roleId
      });
    },
    // 查询
    searchUserRole(){
      // console.log(this.roleId)
      // return 
      this.current = 1
      this.getAllUserRoleInfo({
        page: this.current,
        size: this.pageSize,
        name: this.name,
        roleId:this.roleId
      });
    }
  },
  watch:{
    roleId(value){
      if (value===5) {
        this.name=''
        this.roleId=undefined
         this.getAllUserRoleInfo({
          page: 1,
          size: this.pageSize,
          name: this.name,
          roleId:this.roleId
        });
      }
    }
  },

  components: { TableShow }
};
</script>
<style lang='stylus' scoped></style>
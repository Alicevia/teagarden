import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home',
    meta:{check:false}
  },
  {
    path:'/home',
    component:()=>import('views/home/home.vue'),
    meta:{check:true},
    children:[
      {
        path:'',
        redirect:'index'
      },
      {
        path:'index',
        component:()=>import('home/navRouter/index/index.vue')
      },
      {
        path:'tea',
        component:()=>import('home/navRouter/tea/tea.vue')
      },
      {
        path:'professor',
        component:()=>import('home/navRouter/professor/professor.vue')
      },
      {
        path:'usermanage',
        component:()=>import('home/navRouter/userManage/userManage.vue')
      },
      {
        path:'admin',
        component:()=>import('home/navRouter/admin/admin.vue')
      },
    ]
  },
  {
    path:'/login',
    component:()=>import('views/login/login'),
    meta:{check:false}
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router

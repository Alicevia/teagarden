import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

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
        redirect:'map'
      },
      {
        path:'map',
        component:()=>import('home/navRouter/map/map.vue')
      },
      {
        path:'tea',
        component:()=>import('home/navRouter/tea/tea.vue')
      },
      {
        // path:'detail/:detail',
        path:'detail',
        name:'detail',
        component:()=>import('home/navRouter/detail/detail.vue'),
        // props: (route) => ({ detail: JSON.parse(route.params.detail) }) 
        props: (route) => ({ detail:route.query }) 
        // props:true
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
    meta:{check:false},
    children:[
      {
        path:'',
        redirect:'sign'
      },
      {
        path:'sign',
        component:()=>import('views/login/loginRouter/sign.vue')
      },
    ]
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { message } from 'ant-design-vue'
Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [
  {
    path: '',
    redirect: '/login',
    // redirect:'/home',
    meta: { check: false }
  },
  {
    path: '/home',
    component: () => import('views/home/home.vue'),
    // component:Home,
    meta: { check: true },
    children: [
      {
        path: '',
        redirect: 'map'
      },
      {
        path: 'map',
        component: () => import('home/navRouter/map/map.vue'),
        // component:Map
      },
      {
        path: 'tea',
        component: () => import('home/navRouter/tea/tea.vue'),
      },
      {
        // path:'detail/:detail',
        path: 'detail',
        name: 'detail',
        component: () => import('home/navRouter/detail/detail.vue'),
        // component:Detail,
        // props: (route) => ({ detail: JSON.parse(route.params.detail) }) 
        // props: (route) => ({ detail:route.query }) 
        // props:true
      },
      {
        path: 'professor',
        component: () => import('home/navRouter/professor/professor.vue'),
        meta: { auth: [3] }
      },
      {
        path: 'usermanage',
        component: () => import('home/navRouter/userManage/userManage.vue'),
        meta: { auth: [1, 2] }
      },
      {
        path: 'admin',
        component: () => import('home/navRouter/admin/admin.vue'),
        meta: { auth: [1] }
      },
      {
        path: 'data',
        component: () => import('home/navRouter/dataUpload/dataUpload.vue'),
        meta: { auth: [1, 2] }
      },
      {
        path: 'account',
        component: () => import('home/navRouter/account/account.vue'),
      },
      {
        path: '*',
        redirect: 'map'
      }
    ]
  },
  {
    path: '/login',
    component: () => import('views/login/login'),
    meta: { check: false },
    children: [
      {
        path: '',
        redirect: 'sign'
      },
      {
        path: 'sign',
        component: () => import('views/login/loginRouter/sign.vue')
      },
      {
        path: 'register',
        component: () => import('views/login/loginRouter/register.vue')
      },
      {
        path: 'forget',
        component: () => import('views/login/loginRouter/forget.vue')
      },
    ]
  },
  {
    path: '*',
    redirect: '/home'
  }
]


const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  let isLogin = store.state.userToken
  if (to.matched[0].meta.check) {
    if (isLogin) {
      next()
    } else {
      router.push({ path: '/login' })
    }
  } else {
    if (isLogin) {
      next({path:'/home'})
    } else {
      next()
    }
  }
})


export default router

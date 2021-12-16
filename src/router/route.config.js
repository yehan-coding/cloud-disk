import Index from '../pages/index'
import Login from '../pages/login'

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  }
]

export default routes.reverse()

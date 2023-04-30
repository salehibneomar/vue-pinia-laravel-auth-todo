import { createRouter, createWebHistory } from 'vue-router'
import { useNavStatusStore } from '../stores/nav'
import { useAuthStore } from '../stores/auth'
import { hasToken } from '../composables/Token'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import AddTodoView from '../views/AddTodoView.vue'
import EditTodoView from '../views/EditTodoView.vue'

const routeAuthGuard = (to, from, next) => {
  const isLoggedIn = useAuthStore().user_information.isLoggedIn && hasToken()
  if (isLoggedIn) {
    next()
  } else {
    next('/')
  }
}

const redirectIfAlredyLoggedIn = (to, from, next) => {
  const isLoggedIn = useAuthStore().user_information.isLoggedIn && hasToken()
  if (isLoggedIn) {
    next('/dashboard')
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      beforeEnter: redirectIfAlredyLoggedIn
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: routeAuthGuard
    },
    {
      path: '/add-todo',
      name: 'add_todo',
      component: AddTodoView,
      beforeEnter: routeAuthGuard
    },
    {
      path: '/edit-todo/:id',
      name: 'edit_todo',
      component: EditTodoView,
      beforeEnter: routeAuthGuard
    },
    {
      path: '/:catchAll(.*)',
      name: 'not_found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.afterEach((to) => {
  const nav = useNavStatusStore()
  if (to.path !== '/') {
    nav.enableNav = true
  } else {
    nav.enableNav = false
  }
})

export default router

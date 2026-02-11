import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import DashboardGuru from '../views/guru/DashboardGuru.vue'

const routes = [
    { path: '/', redirect: '/login' },

    { path: '/login', component: Login },

    { path: '/guru', component: DashboardGuru },

    {
        path: '/guru/qr',
        component: () => import('../views/guru/QRGuru.vue')
    },
    {
        path: '/guru/manual',
        component: () => import('../views/guru/ManualGuru.vue')
    },
    {
        path: '/guru/profil',
        component: () => import('../views/guru/ProfileView.vue')
    },
    {
        path: '/guru/rekap',
        component: () => import('../views/guru/RekapGuru.vue')
    },
    {
        path: '/siswa',
        component: () => import('../views/siswa/DashboardSiswa.vue')
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!token && to.path !== '/login') {
    next('/login')
  } else if (token && to.path === '/login') {
    // redirect sesuai role
    if (user.role === 'guru') next('/guru')
    else if (user.role === 'siswa') next('/siswa')
    else next('/login')
  } else {
    next()
  }
})



export default router

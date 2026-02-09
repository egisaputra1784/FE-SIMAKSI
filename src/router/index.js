import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import DashboardGuru from '../views/guru/DashboardGuru.vue'

const routes = [
    { path: '/', redirect: '/guru' },

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
        path: '/guru/rekap',
        component: () => import('../views/guru/RekapGuru.vue')
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

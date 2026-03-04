import { createRouter, createWebHistory } from '@ionic/vue-router'
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
        path: '/murid',
        component: () => import('../views/siswa/DashboardSiswa.vue')
    },
    {
        path: '/scan',
        component: () => import('../views/siswa/ScanSiswa.vue')
    },
    {
        path: '/murid/profil',
        component: () => import('../views/siswa/ProfilSiswa.vue')
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    try {
        const token = localStorage.getItem('token')
        let user = null

        if (token) {
            const storedUser = localStorage.getItem('user')
            if (storedUser) {
                user = JSON.parse(storedUser)
            }
        }

        if (!token && to.path !== '/login') {
            next('/login')
        } else if (token && to.path === '/login') {
            if (user?.role === 'guru') next('/guru')
            else if (user?.role === 'murid') next('/murid')
            else next('/login')
        } else {
            next()
        }
    } catch (e) {
        console.error('Router error:', e)
        next('/login')
    }
})



export default router

import { createRouter, createWebHistory } from '@ionic/vue-router'

import Login from '@/views/login.vue'

// DASHBOARD
import DashboardGuru from '@/views/guru/DashboardGuru.vue'
import DashboardSiswa from '@/views/siswa/DashboardSiswa.vue'

const routes = [

    {
        path: '/',
        redirect: '/login'
    },

    {
        path: '/login',
        component: Login
    },

    /*
    ====================
    GURU ROUTES
    ====================
    */

    {
        path: '/guru',
        component: DashboardGuru
    },

    {
        path: '/guru/qr',
        component: () => import('@/views/guru/QRGuru.vue')
    },

    {
        path: '/guru/manual',
        component: () => import('@/views/guru/ManualGuru.vue')
    },

    {
        path: '/guru/profil',
        component: () => import('@/views/guru/ProfileView.vue')
    },

    {
        path: '/guru/detail',
        component: () => import('@/views/guru/DetailProfilGuru.vue')
    },

    {
        path: '/guru/ganti-password',
        component: () => import('@/views/guru/GantiPassword.vue')
    },

    {
        path: '/guru/rekap',
        component: () => import('@/views/guru/RekapGuru.vue')
    },

    {
        path: '/guru/penilaian',
        component: () => import('@/views/guru/Penilaian.vue')
    },

    {
        path: '/guru/evaluasi',
        component: () => import('@/views/guru/Evaluasi.vue')
    },
    {
        path: '/guru/hasil-evaluasi/:id',
        component: () => import('@/views/guru/HasilEvaluasi.vue')
    },

    // HALAMAN INPUT NILAI
    {
        path: '/guru/input-nilai/:id',
        component: () => import('@/views/guru/InputNilai.vue')
    },

    /*
    ====================
    SISWA ROUTES
    ====================
    */

    {
        path: '/murid',
        component: DashboardSiswa
    },

    {
        path: '/scan',
        component: () => import('@/views/siswa/ScanSiswa.vue')
    },

    {
        path: '/murid/profil',
        component: () => import('@/views/siswa/ProfilSiswa.vue')
    },

    {
        path: '/murid/ganti-password',
        component: () => import('@/views/siswa/GantiPassword.vue')
    },

    {
        path: '/murid/jadwal',
        component: () => import('@/views/siswa/JadwalSiswa.vue')
    },
    {
        path: '/murid/point',
        component: () => import('@/views/siswa/PointSiswa.vue')
    },
    {
        path: '/leaderboard',
        component: () => import('@/views/siswa/LeaderboardPage.vue')
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

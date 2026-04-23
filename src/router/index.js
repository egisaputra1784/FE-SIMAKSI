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
    },
    {
        path: '/murid/detail',
        component: () => import('@/views/siswa/DetailProfileSiswa.vue')
    },
    {
        path: '/murid/riwayat',
        component: () => import('@/views/siswa/RiwayatAbsensi.vue')
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    try {
        const token = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        const user = storedUser ? JSON.parse(storedUser) : null

        // ❌ belum login
        if (!token && to.path !== '/login') {
            return next('/login')
        }

        // ✅ sudah login tapi ke login lagi
        if (token && to.path === '/login') {
            if (user?.role === 'guru') return next('/guru')
            if (user?.role === 'murid') return next('/murid')
            return next('/login')
        }

        // 🔥 PROTECT GURU
        if (to.path.startsWith('/guru') && user?.role !== 'guru') {
            return next('/murid')
        }

        // 🔥 PROTECT MURID
        if (to.path.startsWith('/murid') && user?.role !== 'murid') {
            return next('/guru')
        }

        next()

    } catch (e) {
        console.error('Router error:', e)
        next('/login')
    }
})



export default router

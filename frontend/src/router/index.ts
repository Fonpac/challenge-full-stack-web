import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateStudent from '../views/CreateStudent.vue'
import EditStudent from '../views/EditStudent.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/create',
        name: 'create',
        component: CreateStudent
    },
    {
        path: '/edit',
        name: 'edit',
        component: EditStudent
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

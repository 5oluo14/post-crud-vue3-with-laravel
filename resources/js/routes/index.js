import PostsIndex from '../components/Posts/Index.vue'
import PostsCreate from '../components/Posts/Create.vue'
import PostsEdit from '../components/Posts/Edit.vue'
import Login from '../components/Login.vue'
import Authenticated from '../layouts/Authenticated.vue'
import Guest from '../layouts/Guest.vue'
import { createRouter, createWebHistory } from 'vue-router';

function auth(to, from, next){
    if(JSON.parse(localStorage.getItem('loggedIn'))){
        next()
    }
    next('/login')
}
const routes = [
    {
        component: Authenticated,
        beforeEnter: auth,
        children: [
            {
                path : '/posts',
                name: 'posts.index', 
                component: PostsIndex,
                meta: {title:'posts'}
            },
            {
                path : '/posts/create',
                name: 'posts.create', 
                component: PostsCreate,
                meta: {title:'add new post'}
            },
            {
                path : '/posts/edit/:id',
                name: 'posts.edit', 
                component: PostsEdit,
                meta: {title:'edit post'}
            }
        ]
    },
    {
        path:'/',
        redirect: {name:'login'},
        component: Guest,
        children: [
            {
                path : '/login',
                name: 'login', 
                component: Login,
            }
        ]
    }
    
]

export default createRouter({
    history : createWebHistory(),
    routes
})
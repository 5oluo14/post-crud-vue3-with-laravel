import PostsIndex from '../components/Posts/Index.vue'
import PostsCreate from '../components/Posts/Create.vue'
import PostsEdit from '../components/Posts/Edit.vue'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path : '/',
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

export default createRouter({
    history : createWebHistory(),
    routes
})
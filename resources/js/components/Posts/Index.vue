<script setup>
import usePosts from '../../composables/posts'
import useCategories from '../../composables/categories'
import { onMounted, ref, watch } from 'vue';
import { useAbility } from '@casl/vue';

const search_category = ref('')
const search_id = ref('')
const search_title = ref('')
const search_content = ref('')
const search_global = ref('')
const { posts, getPosts, deletePost } = usePosts();
const { categories, getCategories } = useCategories();
const { can } = useAbility()
onMounted(() => {
  getPosts()
  getCategories()
})

watch(search_category, (current, previous) => {
  getPosts(
    1,
    current,
    search_id.value,
    search_title.value,
    search_content.value,
    search_global.value,
    )
})
watch(search_id, (current, previous) => {
  getPosts(
    1,
    search_category.value,
    current,
    search_title.value,
    search_content.value,
    search_global.value,
    )
})
watch(search_title, (current, previous) => {
  getPosts(
    1,
    search_category.value,
    search_id.value,
    current,
    search_content.value,
    search_global.value,
    )
})
    
watch(search_content, (current, previous) => {
  getPosts(
    1,
    search_category.value,
    search_id.value,
    search_title.value,
    current,
    search_global.value,
    )
})

watch(search_global, (current, previous) => {
  setTimeout(() => {
    getPosts(
      1,
      search_category.value,
      search_id.value,
      search_title.value,
      search_content.value,
      current,
    )
  }, 1000); 
});


</script>

<template>
  <div class="container mx-auto px-9">

    <div class="mb-4 ">
      <input v-model="search_global" placeholder="global search" class="black mt-1  bg-gray-800 boarder-b boarder-gray-100" />
    </div>
    <table class="table-fixed  border-collapse border-spacing-10 ">
      <thead>
        <tr>
          <th>
            <input v-model="search_id" placeholder="id search" type="number" class="black mt-1  bg-gray-800 boarder-b boarder-gray-100" />
          </th>
          <th>
            <select v-model="search_category" class="black mt-1  bg-gray-800 boarder-b boarder-gray-100">
              <option value="" selected>--all categories--</option>
              <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
            </select>
          </th>
          <th>
            <input v-model="search_title" placeholder="title search"  class="black mt-1  bg-gray-800 boarder-b boarder-gray-100" />
          </th>
          <th>
            <input v-model="search_content" placeholder="content search"  class="black mt-1  bg-gray-800 boarder-b boarder-gray-100" />
          </th>
        </tr>
        <tr>
          <th class="border border-slate-600 p-3 text-center">ID</th>
          <th class="border border-slate-600 p-3 text-center">Category</th>
          <th class="border border-slate-600 p-3 text-center">Title</th>
          <th class="border border-slate-600 p-3 text-center">Content</th>
          <th class="border border-slate-600 p-3 text-center">Created at</th>
          <th class="border border-slate-600 p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts.data">
          <td class="border border-slate-700 p-6 text-center">{{ post.id }}</td>
          <td class="border border-slate-700 p-6 text-center">{{ post.category }}</td>
          <td class="border border-slate-700 p-6 text-center">{{ post.title }}</td>
          <td class="border border-slate-700 p-6 text-center">{{ post.content }}</td>
          <td class="border border-slate-700 p-6 text-center">{{ post.created_at }}</td>
          <td class="border border-slate-700 p-6 text-center">
            <router-link v-if="can('posts.update')" :to="{ name: 'posts.edit', params: { id: post.id } }">Edit</router-link>
            <a href="#" v-if="can('posts.delete')" @click.perevent="deletePost(post.id)" class="ml-2">Delete</a>
          </td>
        </tr>

      </tbody>
      <TailwindPagination :data="posts" @pagination-change-page="getPosts" />
    </table>
  </div>

</template>

<script setup>
import useCategories from '../../composables/categories'
import usePosts from '../../composables/posts'
import { onMounted, reactive} from 'vue';
const {categories, getCategories} = useCategories();
const post = reactive({
    title :'',
    content: '',
    category_id:'',
    image:''
})
const {storePost,validationErrors} = usePosts();

onMounted(()=>{
  getCategories()
})

</script>

<template>
        <form @submit.prevent="storePost(post)">
            <div>
                <label for="post-title" class="black block font-medium text-sm text-white">
                    Title
                </label>
                <input v-model="post.title" type="text" class="black block mt-1 w-full text-black rounded-md shadow-sm boarder-gray-600"/>
                <div class="texr-red-600 mt-1">
                    <div v-for="message in validationErrors?.title">
                        {{message}}
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <label for="post-content" class="black block font-medium text-sm text-white">
                    Content
                </label>
                <textarea v-model="post.content" type="text" class="black block mt-1 w-full text-black rounded-md shadow-sm boarder-gray-600"/>
                <div class="texr-red-600 mt-1">
                    <div v-for="message in validationErrors?.content">
                        {{message}}
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <label for="post-category" class="black block font-medium text-sm text-white">
                    Category
                </label>
                <select v-model="post.category_id" class="black block mt-1 w-full text-black rounded-md shadow-sm boarder-gray-600">
                    <option value="" selected>--choose category--</option>
                    <option v-for="category in categories" :value="category.id">{{category.name}}</option>
                  </select>
                  <div class="texr-red-600 mt-1">
                    <div v-for="message in validationErrors?.category_id">
                        {{message}}
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <label for="post-image" class="black block font-medium text-sm text-white">
                    image
                </label>
                <input type="file" @change="post.image = $event.target.files[0]"/>
               <div class="text-red-600 mt-1">
                    <div v-for="message in validationErrors?.image">
                        {{ message }}
                    </div>
                </div>
            </div>

            <div>
                <button class="px-3 mt-4 py-2 bg-blue-600 text-white rounded">save</button>
            </div>
        </form>
</template>

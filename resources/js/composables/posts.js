import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
export default function usePosts() {

  const posts = ref({})
  const post = ref({})
  const validationErrors = ref({})
  const router = useRouter()
  const swal = inject('$swal')


  //for index to get all posts
  const getPosts = async (
    page = 1,
    search_category = '',
    search_id = '',
    search_title = '',
    search_content = '',
    search_global = ''
  ) => {
    axios.get(`/api/posts?page=${page}
    &search_category=${search_category}
    &search_id=${search_id}
    &search_title=${search_title}
    &search_content=${search_content}
    &search_global=${search_global}
    `)
      .then(response => {
        posts.value = response.data;
      })
      .catch(error => console.log(error))
  }

  //for show to get specific post
  const getPost = async (id) => {
    axios.get(`/api/posts/${id}`)
      .then(response => {
        post.value = response.data.data;
      })
      .catch(error => console.log(error))
  }


  //to store post
  const storePost = async (post) => {
    let serializedPost = new FormData()
    for (let item in post) {
      if (post.hasOwnProperty(item)) {
        serializedPost.append(item, post[item])
      }
    }
    await axios.post('/api/posts', serializedPost)
      .then(response => {
        router.push({ name: 'posts.index' })
        swal({
          icon: 'success',
          title: 'Post saved successfully'
        });
      })
      .catch(error => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors
        }
      })
  }

  const updatePost = async (post) => {

    await axios.put(`/api/posts/${post.id}`, post)
      .then(response => {
        router.push({ name: 'posts.index' })
        swal({
          icon: 'success',
          title: 'Post saved successfully'
        });
      })
      .catch(error => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors
        }
      })
  }

  const deletePost = async (id) => {

    swal({
      title: 'Are u sure ? ',
      text: "you'll not be able to revert it again !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'yes, delete it',
      confirmButtonColor: '#ef4444',
      timer: 20000,
      timerProgressBar: true,
      reverseButtons: true,
    })
      .then(result => {
        if (result.isConfirmed) {
          axios.delete(`/api/posts/${id}`)
            .then(response => {
              getPosts()
              router.push({ name: 'posts.index' })
              swal({
                icon: 'success',
                title: 'Post deleted successfully'
              });
            })
            .catch(error => {
              swal({
                icon: 'error',
                title: 'Somthing went wrong'
              });
            })

        }
      })






  }

  return { posts, post, validationErrors, getPosts, getPost, storePost, updatePost, deletePost }

}
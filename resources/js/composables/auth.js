import { ref, reactive,inject } from 'vue'
import { useRouter } from 'vue-router'
export default function useAuth() {

  const swal = inject('$swal')
  const loginForm = reactive({
    email: '',
    password: '',
    remember_me: false
  })
  const user = reactive({
    name :'',
    email: ''
  })
  const validationErrors = ref({})
  const router = useRouter()

  const submitLogin = async () => {
    axios.post(`/login`, loginForm)
      .then(async response => {
        loginUser(response);
      })
      .catch(error => {
        if (error.response?.data) {
          validationErrors.value = error.response.data.errors
        }
      })
  }

  const loginUser = (response) => {
    console.log(response)
    user.name = response.data.name
    user.email = response.data.email
    localStorage.setItem('loggedIn', JSON.stringify(true))
    router.push({ name: 'posts.index' })
  }

  const getUser = () => {
    axios.get('api/user')
    .then(response => {
      loginUser(response)
    })
  }

  const logout = () => {
    axios.post('/logout')
        .then(response=>{
            localStorage.removeItem('loggedIn')
             user.name = ''
             user.email = ''
            swal({
                icon:'success',
                title:'Logged out successfully'
            })
            router.push({name: 'login'})
        }).catch(error=>{
        swal({
            icon:'error',
            title:'something went wrong'
        })
    })

}

  return { loginForm, validationErrors, user, submitLogin, getUser, logout }

}
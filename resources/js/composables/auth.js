import axios from 'axios'
import { ref, reactive, inject } from 'vue'
import { useRouter } from 'vue-router'
import { AbilityBuilder, Ability } from '@casl/ability'
import { ABILITY_TOKEN } from '@casl/vue'
import ability from '../services/ability'
export default function useAuth() {

  const swal = inject('$swal')
  const loginForm = reactive({
    email: '',
    password: '',
    remember_me: false
  })
  const user = reactive({
    name: '',
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

  const loginUser = async (response) => {
    user.name = response.data.name
    user.email = response.data.email
    localStorage.setItem('loggedIn', JSON.stringify(true))
    await getPermissions()
    await router.push({ name: 'posts.index' })
  }

  const getUser = () => {
    axios.get('api/user')
      .then(response => {
        loginUser(response)
      })
  }

  const logout = () => {
    axios.post('/logout')
      .then(response => {
        localStorage.removeItem('loggedIn')
        user.name = ''
        user.email = ''
        swal({
          icon: 'success',
          title: 'Logged out successfully'
        })
        router.push({ name: 'login' })
      }).catch(error => {
        swal({
          icon: 'error',
          title: 'something went wrong'
        })
      })

  }

  const getPermissions = async () => {
    axios.get('/api/permissions')
      .then(response => {
        const permissions = response.data
        const { can, rules } = new AbilityBuilder(ability)
        can(permissions)
        ability.update(rules)
      })
  }

  return { loginForm, validationErrors, user, submitLogin, getUser, logout, getPermissions }

}
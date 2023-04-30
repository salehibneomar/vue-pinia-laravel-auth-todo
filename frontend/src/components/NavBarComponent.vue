<template>
  <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink :to="{ name: 'dashboard' }" class="nav-link active" aria-current="page"
              >Dashboard</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'add_todo' }" class="nav-link active" aria-current="page"
              >Add Todo</RouterLink
            >
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ auth.user_information.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ErrorToast, InfoToast } from '../composables/Toast'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth
    .logout()
    .then((data) => {
      auth.removeUserToken()
      InfoToast('Logged Out')
      router.push({ name: 'login' })
    })
    .catch((err) => {
      ErrorToast(err.message)
    })
}
</script>

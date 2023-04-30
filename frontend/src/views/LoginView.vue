<template>
  <main>
    <ContainerRowSlot>
      <template v-slot:col>
        <div class="col-md-4 mx-auto mt-5">
          <CardSlot class="bg-body-secondary mt-lg-5">
            <template v-slot:card-header>
              <div class="card-header bg-secondary text-white">
                <h4 class="card-title">Login</h4>
              </div>
            </template>
            <template v-slot:card-body-content>
              <FormSlot @submit.prevent="handleSubmit">
                <div class="form-group">
                  <label for="email" class="mb-2">Email</label>
                  <input type="email" id="email" class="form-control" v-model="email" />
                  <small class="text-danger" v-if="errors && errors.email">{{
                    errors.email[0]
                  }}</small>
                </div>
                <div class="form-group">
                  <label for="password" class="mb-2">Password</label>
                  <input type="password" id="password" class="form-control" v-model="password" />
                  <small class="text-danger" v-if="errors && errors.password">{{
                    errors.password[0]
                  }}</small>
                </div>
                <div class="form-group mt-3">
                  <button class="btn btn-primary" type="submit" :class="{ disabled: auth.loading }">
                    {{ `${auth.loading ? 'Submitting...' : 'Login'}` }}
                  </button>
                </div>
              </FormSlot>
            </template>
          </CardSlot>
        </div>
      </template>
    </ContainerRowSlot>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { ErrorToast, SuccessToast } from '../composables/Toast.js'
import ContainerRowSlot from '../slots/ContainerRowSlot.vue'
import CardSlot from '../slots/CardSlot.vue'
import FormSlot from '../slots/FormSlot.vue'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const errors = ref(null)
const router = useRouter()

const auth = useAuthStore()

const handleSubmit = () => {
  auth
    .login(email.value, password.value)
    .then((token) => {
      email.value = ''
      password.value = ''
      auth.setUserToken(token)
      SuccessToast('Logged In')
      router.push({ name: 'dashboard' })
    })
    .catch((err) => {
      if (err.status === 401) {
        ErrorToast(err.message)
      } else {
        errors.value = err.message
      }
    })
}
</script>

<template>
  <ContainerRowSlot>
    <template v-slot:col>
      <div class="col-md-4 mx-auto mt-5">
        <CardSlot class="bg-body-secondary">
          <template v-slot:card-header>
            <div class="card-header bg-secondary text-white">
              <h4 class="card-title">Edit Todo</h4>
            </div>
          </template>
          <template v-slot:card-body-content>
            <LoadingComponent v-if="todoStore.loading" />
            <FormSlot v-else @submit.prevent="handleSubmit">
              <div class="form-group">
                <label class="mb-2">Title</label>
                <input type="text" class="form-control" v-model="formInput.title" />
                <small class="text-danger" v-if="errors.title">{{ errors.title[0] }}</small>
              </div>
              <div class="form-group mt-3">
                <button
                  class="btn btn-primary"
                  type="submit"
                  :class="{ disabled: todoStore.submitting }"
                >
                  {{ `${todoStore.submitting ? 'Submitting...' : 'Update'}` }}
                </button>
              </div>
            </FormSlot>
          </template>
        </CardSlot>
      </div>
    </template>
  </ContainerRowSlot>
</template>

<script setup>
import ContainerRowSlot from '../slots/ContainerRowSlot.vue'
import CardSlot from '../slots/CardSlot.vue'
import FormSlot from '../slots/FormSlot.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todo'
import { ErrorToast, SuccessToast } from '../composables/Toast'
import LoadingComponent from '../components/LoadingComponent.vue'

const todoStore = useTodoStore()
const route = useRoute()
const router = useRouter()
const formInput = ref({
  title: ''
})
const errors = ref({})

const handleSubmit = () => {
  const id = route.params.id
  const updatedTodo = { title: formInput.value.title }
  todoStore
    .updateTodo(id, updatedTodo)
    .then((d) => {
      SuccessToast(d.message)
      router.push({ name: 'dashboard' })
    })
    .catch((err) => {
      if (err.status !== 422) {
        ErrorToast(err.message)
      } else {
        errors.value = err.message
      }
    })
}

onMounted(() => {
  todoStore.getTodo(route.params.id).then((d) => (formInput.value.title = todoStore.todo.title))
})
</script>

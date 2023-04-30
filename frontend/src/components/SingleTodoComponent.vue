<template>
  <li class="list-group-item mb-2" :class="{ 'list-group-item-success': props.todo.completed }">
    <input
      class="form-check-input me-2"
      type="checkbox"
      :checked="props.todo.completed"
      @change="handleCompleteCheckbox"
    />
    <label class="form-check-label">
      {{ props.todo.title }}
    </label>
    <div class="btn-group float-end">
      <RouterLink
        :to="{ name: 'edit_todo', params: { id: props.todo.id } }"
        class="btn btn-sm btn-light"
      >
        <i class="fa-solid fa-edit text-primary"></i>
      </RouterLink>
      <button class="btn btn-sm btn-light" @click.prevent.stop="handleDeleteBtnClick">
        <i class="fa-solid fa-trash text-danger"></i>
      </button>
    </div>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { RouterLink } from 'vue-router'
import Swal from 'sweetalert2'
const props = defineProps(['todo', 'index'])
const emit = defineEmits(['todoDeleteEmit', 'todoCompleteEmit'])

const handleDeleteBtnClick = (e) => {
  Swal.fire({
    title: 'Want to Delete?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'YES'
  }).then((result) => {
    emit('todoDeleteEmit', props.todo.id, props.index)
  })
}

const handleCompleteCheckbox = (e) => {
  const completed = e.currentTarget.checked
  emit('todoCompleteEmit', props.todo, completed)
}
</script>

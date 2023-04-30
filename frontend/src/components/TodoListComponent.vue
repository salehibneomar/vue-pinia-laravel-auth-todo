<template>
  <LoadingComponent v-if="todoStore.loading" />
  <template v-else>
    <p v-if="todoStore.all_todos.length === 0">No Todo Found!</p>
    <template v-else>
      <ul class="list-group" v-for="(todo, index) in todoStore.all_todos">
        <SingleTodoComponent
          :key="todo.id"
          :todo="todo"
          :index="index"
          @todoDeleteEmit="handleDelete"
          @todoCompleteEmit="handleComplete"
        />
      </ul>
    </template>
  </template>
</template>

<script setup>
import SingleTodoComponent from './SingleTodoComponent.vue'
import LoadingComponent from './LoadingComponent.vue'
import { useTodoStore } from '../stores/todo'
import { onMounted } from 'vue'
import { ErrorToast, SuccessToast } from '../composables/Toast'
const todoStore = useTodoStore()

const handleDelete = (id, index) => {
  todoStore
    .deleteTodo(id)
    .then((d) => {
      todoStore.todos.splice(index, 1)
      SuccessToast(d.message)
    })
    .catch((e) => {
      ErrorToast(e.message)
    })
}

const handleComplete = (todo, completed) => {
  const updatedTodo = { completed }
  todoStore
    .changeCompletedStatus(todo.id, updatedTodo)
    .then((d) => {
      todo.completed = completed
      SuccessToast(d.message)
    })
    .catch((e) => {
      ErrorToast(e.message)
    })
}

onMounted(() => {
  todoStore.getTodos()
})
</script>

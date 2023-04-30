<template>
  <ContainerRowSlot>
    <template v-slot:col>
      <div class="col-md-6 mx-auto mt-5">
        <CardSlot class="bg-body-secondary">
          <template v-slot:card-header>
            <div class="card-header bg-secondary text-white">
              <h4 class="card-title">All Todos</h4>
            </div>
          </template>
          <template v-slot:card-body-content>
            <TodoListComponent />
          </template>
        </CardSlot>
      </div>
    </template>
  </ContainerRowSlot>
</template>

<script setup>
import TodoListComponent from '../components/TodoListComponent.vue'
import ContainerRowSlot from '../slots/ContainerRowSlot.vue'
import CardSlot from '../slots/CardSlot.vue'
</script>

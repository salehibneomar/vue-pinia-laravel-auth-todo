<template>
  <ContainerRowSlot>
    <template v-slot:col>
      <div class="col-md-12 mx-auto mt-5">
        <div class="text-center mt-5">
          <h1 class="mb-4">404 Not Found</h1>
          <button class="btn btn-primary" @click.prevent="goBackHandle">Go Back</button>
        </div>
      </div>
    </template>
  </ContainerRowSlot>
</template>

<script setup>
import ContainerRowSlot from '../slots/ContainerRowSlot.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goBackHandle = () => {
  router.go(-1)
}
</script>

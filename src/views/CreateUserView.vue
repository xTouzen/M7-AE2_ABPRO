<script setup>
import CreateUserForm from '@/components/CreateUserForm.vue';
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-sm">
          <div class="card-body p-4 p-md-5">
            <h2 class="card-title text-center mb-4">Crear Cuenta</h2>
            <CreateUserForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 80vh;
  align-items: center;
}
</style>
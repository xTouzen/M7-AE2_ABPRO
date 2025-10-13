<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="errorMsg" class="alert alert-danger" role="alert">
      {{ errorMsg }}
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Correo Electrónico</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="tu@correo.com"
          v-model="email"
          required
          autocomplete="email"
        />
      </div>
    </div>

    <div class="mb-4">
      <label for="password" class="form-label">Contraseña</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Tu contraseña"
          v-model="password"
          required
          autocomplete="current-password"
        />
      </div>
    </div>

    <div class="d-grid">
      <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
    </div>

    <div class="text-center mt-4">
      <router-link to="/create-user">¿No tienes una cuenta?</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const email = ref('');
const password = ref('');
const errorMsg = ref('');

const userStore = useUserStore();

const handleSubmit = async () => {
  errorMsg.value = '';

  if (!email.value || !password.value) {
    errorMsg.value = 'El correo y la contraseña son obligatorios.';
    return;
  }

  const error = await userStore.loginUser(email.value, password.value);

  if (error) {
    errorMsg.value = error;
  }
};
</script>

<style scoped>
.input-group-text {
  background-color: #f8f9fa;
}
</style>


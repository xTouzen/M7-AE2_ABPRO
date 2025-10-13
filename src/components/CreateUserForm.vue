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
        />
      </div>
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Contraseña</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Mínimo 6 caracteres"
          v-model="password"
          required
        />
      </div>
    </div>

    <div class="mb-4">
      <label for="confirmPassword" class="form-label">Repite la Contraseña</label>
      <div class="input-group">
        <span class="input-group-text"><i class="bi bi-check-circle-fill"></i></span>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          placeholder="Confirma tu contraseña"
          v-model="confirmPassword"
          required
        />
      </div>
    </div>

    <div class="d-grid gap-2">
      <button type="submit" class="btn btn-primary" :disabled="userStore.loadingUser">
        <span v-if="!userStore.loadingUser">Crear Usuario</span>
        <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </button>
      <router-link to="/login" class="btn btn-outline-secondary">Cancelar</router-link>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user'; 

const userStore = useUserStore();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');

const handleSubmit = async () => {
  errorMsg.value = ''; 

  if (!email.value || !password.value || !confirmPassword.value) {
    errorMsg.value = 'Todos los campos son obligatorios.';
    return;
  }
  if (password.value.length < 6) {
    errorMsg.value = 'La contraseña debe tener al menos 6 caracteres.';
    return;
  }
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Las contraseñas no coinciden.';
    return;
  }

  const error = await userStore.registerUser(email.value, password.value);
  if (error) {
    errorMsg.value = error;
  }
}
</script>

<style scoped>
.input-group-text {
  background-color: #f8f9fa;
}
</style>


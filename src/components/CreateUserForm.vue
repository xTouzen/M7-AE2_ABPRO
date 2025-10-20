<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user'; 
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');

const showPassword = ref(false);
const showConfirmPassword = ref(false);

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
  } else {
    router.push({ name: 'login' });
  }
}
</script>

<template>
  <v-card class="elevation-12 pa-4">
    <v-card-title class="text-center text-h5 mb-4">
      Crear Cuenta
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-alert
          v-if="errorMsg"
          type="error"
          variant="tonal"
          density="compact"
          class="mb-4"
        >
          {{ errorMsg }}
        </v-alert>

        <v-text-field
          v-model="email"
          label="Correo Electrónico"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          density="compact"
          required
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Contraseña"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          variant="outlined"
          density="compact"
          required
          hint="Mínimo 6 caracteres"
          persistent-hint
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="confirmPassword"
          label="Confirmar Contraseña"
          :type="showConfirmPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-check-circle-outline"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
          variant="outlined"
          density="compact"
          required
        ></v-text-field>

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-4"
          :loading="userStore.loadingUser"
          :disabled="userStore.loadingUser"
        >
          Crear Usuario
        </v-btn>
         <v-btn
          variant="text"
          block
          class="mt-2"
          @click="router.push({ name: 'login' })"
        >
          Cancelar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>


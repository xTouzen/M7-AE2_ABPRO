<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const showPassword = ref(false); 

const userStore = useUserStore();
const router = useRouter();

const handleSubmit = async () => {
  errorMsg.value = '';

  if (!email.value || !password.value) {
    errorMsg.value = 'El correo y la contraseña son obligatorios.';
    return;
  }

  const error = await userStore.loginUser(email.value, password.value);

  if (error) {
    errorMsg.value = error;
  } else {
    router.push({ name: 'course-panel' });
  }
};
</script>

<template>
  <v-card class="elevation-12 pa-4">
    <v-card-title class="text-center text-h5 mb-4">
      Iniciar Sesión
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
          autocomplete="email"
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
          autocomplete="current-password"
        ></v-text-field>

        <v-btn
          type="submit"
          color="primary"
          block
          class="mt-4"
        >
          Ingresar
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center">
      <router-link to="/create-user" class="text-primary text-decoration-none">
        ¿No tienes una cuenta?
      </router-link>
    </v-card-actions>
  </v-card>
</template>


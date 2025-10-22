<script setup>
import { ref, onMounted } from 'vue'; 
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const successMsg = ref(''); 
const showPassword = ref(false); 

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  if (userStore.registrationSuccessMessage) {
    successMsg.value = userStore.registrationSuccessMessage;
    userStore.clearRegistrationSuccessMessage();

    setTimeout(() => {
      successMsg.value = '';
    }, 3000);
  }
});

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
  <div> 
    <v-card class="elevation-12 pa-4">
      <v-card-title class="text-center text-h5 mb-4">
        Iniciar Sesión
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-alert
            v-if="successMsg"
            type="success"
            variant="tonal"
            density="compact"
            class="mb-4"
          >
            {{ successMsg }}
          </v-alert>

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

    <v-card class="elevation-12 pa-4 mt-6">
      <v-card-title class="text-center text-h6 mb-3">Datos de Demo</v-card-title>
      <v-card-text>
        <div class="mb-3">
          <div class="d-flex align-center mb-2">
            <v-icon color="primary" class="me-2">mdi-account</v-icon>
            <strong class="text-body-1">Vista Usuario</strong>
          </div>
          <div class="text-body-2 ms-8">
            <v-icon size="small" class="me-1" icon="mdi-email-outline"></v-icon>
            Correo: <span class="font-weight-medium">user@correo.com</span>
          </div>
          <div class="text-body-2 ms-8">
            <v-icon size="small" class="me-1" icon="mdi-lock-outline"></v-icon>
            Contraseña: <span class="font-weight-medium">user111</span>
          </div>
        </div>

        <v-divider class="my-3"></v-divider>

        <div>
          <div class="d-flex align-center mb-2">
            <v-icon color="primary" class="me-2">mdi-account</v-icon>
            <strong class="text-body-1">Vista Administrador</strong>
          </div>
          <div class="text-body-2 ms-8">
            <v-icon size="small" class="me-1" icon="mdi-email-outline"></v-icon>
            Correo: <span class="font-weight-medium">admin@correo.com</span>
          </div>
          <div class="text-body-2 ms-8">
            <v-icon size="small" class="me-1" icon="mdi-lock-outline"></v-icon>
            Contraseña: <span class="font-weight-medium">admin1</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>


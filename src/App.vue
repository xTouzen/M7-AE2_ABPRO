<script setup>
import { onMounted } from 'vue';
import { useUserStore } from './stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  userStore.listenForAuthState();
});

const handleLogout = async () => {
  await userStore.logoutUser();
  router.push({ name: 'login' }); 
};

const goToPanel = () => {
  if (userStore.userData) {
    router.push({ name: 'course-panel' });
  } else {
    router.push({ name: 'login' });
  }
};
</script>

<template>
  <v-app>
    <v-app-bar app color="grey-darken-4" density="compact">
      <v-app-bar-title class="cursor-pointer" @click="goToPanel">
        <div class="logo-container">
          <span class="logo-main-text">adweb</span>
          <span class="logo-sub-text">online</span>
        </div>
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-if="userStore.userData">
        <div class="d-none d-sm-flex align-center me-4">
          <span class="text-grey-lighten-1 text-caption">
            Bienvenido, {{ userStore.userData.email }}
          </span>
        </div>

        <v-btn
          v-if="userStore.isAdmin" 
          :to="{ name: 'course-admin' }"
          variant="text"
          size="small"
          prepend-icon="mdi-cog"
          class="me-2"
        >
          Administrar
        </v-btn>
        
        <v-btn
          @click="handleLogout"
          variant="outlined"
          size="small"
          prepend-icon="mdi-logout"
        >
          Logout
        </v-btn>
      </template>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-footer app name="footer" color="grey-darken-4" class="text-center d-flex flex-column pa-2">
      <div>
        &copy; {{ new Date().getFullYear() }} — <strong>adweb online</strong>
      </div>
      <div class="text-caption">
        Todos los derechos reservados.
      </div>
    </v-footer>
  </v-app>
</template>

<style scoped>
.logo-container {
  line-height: 1.1;
  width: fit-content;
}
.logo-main-text {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: -1px;
}
.logo-sub-text {
  font-size: 0.6rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  padding-left: 2px;
}
.cursor-pointer {
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { useUserStore } from './stores/user';

const userStore = useUserStore();

onMounted(() => {
  userStore.listenForAuthState();
});
</script>

<template>
  <div class="d-flex flex-column min-vh-100 bg-light">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container">
        <router-link class="navbar-brand d-flex flex-column lh-1" to="/course-panel">
          <span class="fw-bold fs-4 logo-main-text">adweb</span>
          <span class="logo-sub-text">online</span>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <template v-if="userStore.userData">
              <li class="nav-item">
                <span class="navbar-text me-3">
                  Bienvenido, {{ userStore.userData.email }}
                </span>
              </li>
              <li class="nav-item">
                <button @click="userStore.logoutUser" class="btn btn-outline-danger btn-sm">Logout</button>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
    <main class="flex-grow-1 container my-4">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <footer class="bg-dark text-white text-center p-3 mt-auto">
      <div>&copy; {{ new Date().getFullYear() }} adweb online. Todos los derechos reservados.</div>
    </footer>
  </div>
</template>

<style scoped>
.logo-main-text {
  font-size: 1.8rem;
  letter-spacing: -1px;
}

.logo-sub-text {
  font-size: 0.7rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  margin-top: 2px;
  padding-left: 2px;
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
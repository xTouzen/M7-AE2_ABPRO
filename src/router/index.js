import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import CreateUserView from '@/views/CreateUserView.vue'
import CoursePanelView from '@/views/CoursePanelView.vue'
import { useUserStore } from '../stores/user'
import { auth } from '../fireBaseConfig'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: CreateUserView,
    },
    {
      path: '/course-panel',
      name: 'course-panel',
      component: CoursePanelView,
      meta: { requireAuth: true },
    }

  ],
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe(); 
      resolve(user);
    }, reject);
  });
};

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  const currentUser = await getCurrentUser();

  if (to.name === 'login' && currentUser) {
    return next({ name: 'course-panel' });
  }

  if (requiresAuth && !currentUser) {
    return next({ name: 'login' });
  }

  next();
});

export default router



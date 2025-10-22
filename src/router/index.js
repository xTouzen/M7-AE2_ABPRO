import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import CoursePanelView from '../views/CoursePanelView.vue'
import CoursePanelAdminView from '../views/CoursePanelAdminView.vue'
import { auth } from '../fireBaseConfig' 

const ADMIN_EMAIL = 'admin@correo.com';

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: CreateUserView
    },
    {
      path: '/course-panel',
      name: 'course-panel',
      component: CoursePanelView,
      meta: { requiresAuth: true }
    },
    {
      path: '/course-admin',
      name: 'course-admin',
      component: CoursePanelAdminView,
      meta: { 
        requiresAuth: true,
        requiresAdmin: true 
      } 
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser && currentUser.email === ADMIN_EMAIL;

  if (requiresAdmin && !isAdmin) {
    next({ name: 'course-panel' }); 
  }
  else if (requiresAuth && !currentUser) {
    next({ name: 'login' });
  }
  else if (to.name === 'login' && currentUser) {
    next({ name: 'course-panel' });
  }
  else {
    next();
  }
});

export default router


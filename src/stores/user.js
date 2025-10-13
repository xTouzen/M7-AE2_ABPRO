import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../fireBaseConfig";
import router from "../router";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push({ name: "login" });
      } catch (error) {
        console.log(error.code);
        switch (error.code) {
          case 'auth/email-already-in-use':
            return 'El correo electrónico ya está en uso.';
          case 'auth/invalid-email':
            return 'El correo electrónico no es válido.';
          case 'auth/weak-password':
            return 'La contraseña es demasiado débil.';
          default:
            return 'Ocurrió un error al registrar el usuario.';
        }
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        this.userData = { email: user.email, uid: user.uid };
        router.push({ name: "course-panel" });
      } catch (error) {
        console.log(error.code);
        switch (error.code) {
          case 'auth/user-not-found':
            return 'Usuario no encontrado.';
          case 'auth/wrong-password':
            return 'Contraseña incorrecta.';
          case 'auth/invalid-credential':
            return 'Credenciales incorrectas.';
            
          default:
            return 'Ocurrió un error al iniciar sesión.';
        }
      } finally {
        this.loadingUser = false;
      }
    },

    async logoutUser() {
      try {
        await signOut(auth);
        this.userData = null;
        router.push({ name: "login" });
      } catch (error) {
        console.log(error);
      }
    },

    listenForAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userData = { email: user.email, uid: user.uid };
        } else {
          this.userData = null;
        }
      });
    }
  },
});
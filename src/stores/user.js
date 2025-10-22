import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { defineStore } from "pinia";
import { auth } from "../fireBaseConfig";

const ADMIN_EMAIL = 'admin@correo.com';

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUser: false,
    isAdmin: false, 
    registrationSuccessMessage: null,
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await signOut(auth);
        this.registrationSuccessMessage = "Usuario creado exitosamente";
      } catch (error) {
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        this.userData = { email: user.email, uid: user.uid };
        if (user.email === ADMIN_EMAIL) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } catch (error) {
      } finally {
        this.loadingUser = false;
      }
    },

    async logoutUser() {
      try {
        await signOut(auth);
        this.userData = null;
        this.isAdmin = false; 
      } catch (error) {
        console.log(error);
      }
    },

    listenForAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userData = { email: user.email, uid: user.uid };
          if (user.email === ADMIN_EMAIL) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        } else {
          this.userData = null;
          this.isAdmin = false; 
        }
      });
    },

    clearRegistrationSuccessMessage() {
      this.registrationSuccessMessage = null;
    }
  },
});


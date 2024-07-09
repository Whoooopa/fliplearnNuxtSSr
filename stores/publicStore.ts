import { defineStore } from 'pinia'
import { getIdToken, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const usePublicStore = defineStore({
  id: 'publicStore',
  state: () => ({
    user: null,
   }),
  actions: {
    async register(submissionData: FormData){
      try {

        const res = await fetch('/api/register', {
          method: "POST",
          body: submissionData
        })
        console.log(res);
      } 
      catch (e){
        console.log(e);
      }
    },

    async logIn (submissionData: FormData){
      const email = submissionData.get('email')!.toString();
      const password = submissionData.get('password')!.toString();
      const { $fireAuth } = useNuxtApp();

      try {
        const userCredential = await signInWithEmailAndPassword($fireAuth, email, password);
        const user = userCredential.user;
        const idToken = await getIdToken(user);
        const response = await fetch('/api/login', {
          method: "POST",
          headers: new Headers({
            'Authorization': `Bearer ${idToken}`
          })
        });
        const data = await response.json();
        console.log(data);
        this.user = data;
        localStorage.setItem('token', idToken);
        localStorage.setItem('id', data.uid);
        localStorage.setItem('type', data.type);
      } catch (error) {
        console.log(error);
        this.user = null;
      }

    },

    async logout(){
      const { $fireAuth } = useNuxtApp();
      signOut($fireAuth).then(async () => {
        // Sign-out successful.
        const cookie = useCookie(useRuntimeConfig().public.authCookieName)
        cookie.value = null;
        console.log('isSignedOut');
        localStorage.clear();
        
        await $fetch('/api/logout', {
          method: 'POST'
        }
        )
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
    }

  },
  persist: true,
})


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePublicStore, import.meta.hot))
}
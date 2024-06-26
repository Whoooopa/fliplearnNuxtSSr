import { defineStore } from 'pinia'

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

  }
})

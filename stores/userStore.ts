import { defineStore } from 'pinia'

export const useMyUserStore = defineStore({
  id: 'myUserStore',
  state: () => ({ 
    quizDeckId: '',
    quizDeckName: '',
    quizTags: [] as string[],
    quizCards: [] as cardDoc[],
    quizMaxQuestion: 0,
    quizCurrentProgress: 0,
    quizTotalPoints: 0
  }),
  actions: {},
  persist: true
})

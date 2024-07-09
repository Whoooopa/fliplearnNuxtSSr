import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
    const pinia = useNuxtApp().$pinia
    pinia.use(piniaPluginPersistedstate)
})

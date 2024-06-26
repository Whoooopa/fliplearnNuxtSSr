export default defineNuxtRouteMiddleware((to, from) => {
    const publicStore = usePublicStore();
    const blockedRoute = /\/teacher|student\/*/
    if(!publicStore.$state.user && to.path.match(blockedRoute) ){
        return navigateTo('/login');
    }
})

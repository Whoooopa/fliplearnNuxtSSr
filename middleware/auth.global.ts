import { useNitro } from "nuxt/kit";

export default defineNuxtRouteMiddleware((to, from) => {
    
    const blockedRoute = /\/teacher|student\/*/
    let cookie = null;
    // useNitro().storage.getItem
    if(import.meta.server){
        const cookieName = useRuntimeConfig().public.authCookieName;
        const tokenReg = new RegExp(`${cookieName}=([^;]*)`);
        const cookies = useRequestHeaders(['cookie'])
        const tokenMatch = tokenReg.exec(cookies.cookie ??  '')
        const token = tokenMatch ? tokenMatch[1] : null;

        if(!token && to.path.match(blockedRoute) ){
           return navigateTo('/login')
        }
        const typeReg = /type=([^;]*)/
        const typeMatch = typeReg.exec(cookies.cookie ??  '')
        const type = typeMatch ? typeMatch[1] : null;
        // console.log(type);
        if(type && !to.path.includes(type!)){

            if(!to.path.includes('user')){
                return navigateTo(`/${type}`)
            }
        }

    } else {
        cookie = useCookie('type');
        
        if(!cookie.value && to.path.match(blockedRoute) ){
            navigateTo('/login')
        }
    }
})

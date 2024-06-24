<template>
<div class="bg-secondary flex py-5 justify-around">
    <Icon name="i-logos:github-icon" class="w-8 h-8" />
    <div class="font-righteous text-2xl">
        <NuxtLink :to='"/"'>
            FlipLearn
        </NuxtLink>
    </div>
</div>
</template>
  
<script lang="ts" setup>
const route = useRoute();
const isPath = (link: string):boolean => {
return route.path === link
}
const links = [
{
    name: 'Home',
    link: '/',
        active: computed(()=> isPath('/'))
},
{
    name: 'About',
    link: '/about',
        active: computed(()=> isPath('/about'))
},{
    name: 'Login',
    link: '/login',
        active: computed(()=> isPath('/login'))
},{
    name: 'Register',
    link: '/register',
        active: computed(()=> isPath('/register'))
}
]
  
  
const menuOpen = ref(false);
function closeMenu() {
    menuOpen.value = false;
}
</script>
  
<style>
</style>
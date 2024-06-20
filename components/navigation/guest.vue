<template>
  <div class="flex justify-around py-3 bg-secondary border-b-4 border-b-primary fixed w-full">
    <div class="font-righteous text-2xl">
      <NuxtLink :to='"/"'>
        FlipLearn
      </NuxtLink>
    </div>
    <div class="md:block hidden my-auto">
      <div class="flex flex-row gap-5 items-center">
        <NuxtLink v-for="link in links" :to='`${link.link}`' class="link px-2 rounded-md" :class=" link.active.value ? 'active': ''">
          {{ link.name }}
        </NuxtLink>
      </div>
    </div>
    <div class="md:hidden block my-auto">
      <Transition name="fade" appear v-if="!menuOpen">
        <Icon name="i-material-symbols:menu" class="w-8 h-8" @click="menuOpen = !menuOpen"/>
      </Transition>
      
      <Transition name="fade" appear v-else>
        <Icon name="i-material-symbols-light:close-rounded" class="w-8 h-8" @click="closeMenu"/>
      </Transition>
      <Teleport to="body">
        <Transition name="fade" appear v-if="menuOpen">
          <div class="flex flex-col items-center w-screen py-3 z-50 absolute top-[3.75rem] bg-customPrimary-100">
            <NuxtLink v-for="link in links" :to='`${link.link}`' class="link px-2 py-3 rounded-md w-4/5 text-center" :class=" link.active.value ? 'active': ''" @click="closeMenu">
              {{ link.name }}
            </NuxtLink>
          </div>
        </Transition>
      </Teleport>
      <!-- <UPopover class="flex items-center" v-model:open="menuOpen" v-if="!menuOpen">
        <Transition name="fade" appear>
          <Icon name="i-material-symbols:menu" class="w-8 h-8"/>
        </Transition>
          <template #panel>
            <div class="flex flex-col items-center w-screen -ml-4 py-3">
              <NuxtLink v-for="link in links" :to='`${link.link}`' class="link px-2 py-3 rounded-md w-4/5 text-center" :class=" link.active.value ? 'active': ''" @click="closeMenu">
                {{ link.name }}
              </NuxtLink>
            </div>
          </template>
      </UPopover>
      <Transition name="fade" appear v-if="menuOpen">
        <Icon name="i-material-symbols-light:close-rounded" class="w-8 h-8" @click="closeMenu"/>
      </Transition> -->
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
@media (hover: hover), (-ms-high-contrast:none) {

  .link {
    background-color: var(--secondary);
    transition: background-color 1000ms linear;
  }

  .link:hover {
    background-color: var(--lightersecond);
  }

}

.active {
  background-color: var(--lightersecond);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
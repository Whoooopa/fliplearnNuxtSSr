<template>
  <div class="w-20 bg-accent border-r-4 border-r-customPrimary h-screen flex flex-col items-center py-10 gap-5">
    <div v-for="link in type =='teacher' ? teacherLinks: studentLinks">
      <NuxtLink :to="link.to" v-if="link.to" class="p-2 rounded-md hover:bg-customPrimary-600 relative">
        <Icon :name="link.iconUri" class="w-8 h-8 text-white " />
        <Icon :name="link.secondIconUri" class="w-5 h-5 text-softbackground absolute top-[40%] left-[30%]" v-if="link.secondIconUri"/>
      </NuxtLink>
      <div v-else class="p-2 rounded-md hover:bg-customPrimary-600 hover:cursor-pointer" @click="handleLogout">
        <Icon :name="link.iconUri" class="w-7 h-7 text-white " />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const publicStore = usePublicStore();
const type = useCookie('type');
console.log(type);
const teacherLinks = [
  {
    to: '/teacher',
    iconUri: 'i-ph:cards-three'
  },
  {
    to: '/teacher/createdeck',
    iconUri: 'i-ph:cards-three',
    secondIconUri: 'i-material-symbols:add'
  },
  {
    iconUri: 'i-hugeicons:logout-04'
  },
]
const studentLinks = [
  {
    to: '/student',
    iconUri: 'i-ph:cards-three'
  },
  {
    iconUri: 'i-hugeicons:logout-04'
  },
]

const router = useRouter();
async function handleLogout(){
  await publicStore.logout();
  router.push('login');
}
</script>

<style>

</style>
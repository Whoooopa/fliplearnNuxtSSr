<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <ReusableCardlayout>
      <div class="p-12 w-full h-full">
        <div 
        v-if="!dataLoaded">
          <USkeleton class="w-80 h-12"/>
        </div>
        <span 
        class="text-4xl font-medium"
        v-else>
          Welcome back,  {{ user.name }}
        </span>
        <div class="w-5/6 h-0.5 bg-slate-600 mt-5"></div>

        <form class="w-full flex flex-col mt-10 justify-between h-4/5">
          <div class="w-full flex flex-row md:gap-20">
            <div class="w-40 h-40">
              <label for="upload-photo" class="w-full h-full">
                <div class="w-full h-full">
                  <img :src="imgSrc" alt="upload image"
                  class="w-full h-full object-contain rounded-full cursor-pointer hover:opacity-70" v-if="dataLoaded"/>
                </div>
              </label>
              <input type="file" class="absolute -z-10 opacity-0" id="upload-photo" accept="image/*" v-on:change="onFileChange" />
            </div>
            <div class="flex flex-col justify-center">
              <UInput v-model="name" 
              placeholder="Enter a username"
              size="xl"> 
                <template #trailing>
                  <ClientOnly>
                    <span class="text-[9.5px] pt-4">{{ nameLength }} / 25</span>
                  </ClientOnly>
                </template>
              </UInput> 
              <ClientOnly
              class="text-red-500"
              v-if="error">
                {{ error }}
              </ClientOnly>
            </div>
          </div>
          <button 
          class="w-min mx-auto"
          @click="updateProfile">
            Save
          </button>

        </form>
      </div>
    </ReusableCardlayout>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'user'
})
const dataLoaded = ref(false);
const { data: user } = await useFetch<user>('/api/user/user');
const imgSrc = ref('https://api.iconify.design/material-symbols:account-circle-full.svg');
const name = useState('username', () => '')
let nameLength = 0;
console.log(user.value)
onMounted(()=>{
  console.log(user.value?.name)
  name.value = toRaw(user.value.name)
  if(user.value.profileUrl.length != 0){
    imgSrc.value = user.value.profileUrl?.toString() ?? 'https://api.iconify.design/material-symbols:account-circle-full.svg';
  }
  console.log(imgSrc.value);
  nameLength = computed(()=> name.value.length);
  dataLoaded.value = true;
})

let newImg :any|null;
let file :any|null;
function onFileChange(e: any) {
  file = e.target.files || e.dataTransfer.files;
  imgSrc.value = URL.createObjectURL(file[0]);
  newImg = file[0];
}

const nameRegex = /^(\b\w+\b )*\b\w+\b$/
const error = ref('');

async function updateProfile() {
const submissionData = new FormData();

  if(!nameRegex.test(name.value)) {
    if(name.value.length)
    error.value = 'No more than 25 characters'
    else
    error.value = 'No white spaces before or after name, and only 1 space between words'
  };

  submissionData.append('username', name.value);

  if(newImg) submissionData.append('img', newImg);
  
  
  try {
    const res = await fetch('/api/user/updateUser', {
          method: "POST",
          body: submissionData
        })
  }
  catch(e){
    console.log(e)
  }
}
</script>

<style>

</style>
<template>

  <div class="h-screen flex flex-row">
    <div class="w-1/2 bg-black"></div>
    <div class="w-1/2 flex justify-center items-center">
      <form class="flex flex-col gap-2" @submit.prevent="register">
          <div v-for="field in fields" :key="field.name">
            <UInput v-model="field.value.value" 
            :type="field.name === 'email' ? 
            'email' : field.visibility?.value ? 
            '': 'password'"
            :placeholder="field.name"
            :ui="{ icon: { trailing: { pointer: '' } } }"
            class="relative"> 
              <template #trailing>
                <ClientOnly>
                  <Icon v-if="field.name != 'email' " :name="field.visibility?.value ? 'i-fa6-solid:eye-slash': 'i-fa6-solid:eye'" aria-hidden="true" @click="toggleVisibility(field)"/>
                  <template #fallback>
                    <Icon name="i-fa6-solid:eye" />
                  </template>
                </ClientOnly>
                <div class="absolute top-10 -left-40 z-40" v-if="field.name === 'password'">
                  <div class="w-max p-5 rounded-md bg-white shadow-md" v-if="field.value.value != '' && !validations.every(validation => validation.passed.value)" >
                    <div v-for="validation in validations">
                      <Icon :name="validation.passed.value ? 'i-mdi:check' : 'i-mdi:close'" :color="validation.passed.value ? 'green' : 'red' " class="w-6 h-6" />
                      <span>{{ validation.condition }}</span>
                    </div>
                  </div>
                </div>
                <div class="absolute top-10 -left-40 z-40" v-else-if="field.name === 'confirmPassword'">
                  <div class="w-max p-5 rounded-md bg-white shadow-md" v-if="field.value.value != '' && !confirmPassword" >
                      <span>Password doesn't match</span>
                  </div>
                </div>
              </template>
            </UInput>
          </div>
          <USelect v-model="accountType" :options="accountTypes" />
          <button class="p-1 bg-slate-400" type="submit">
            Register
          </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const accountTypes = ['teacher','student'];
const accountType = ref(accountTypes[0]);
const fields = [
  {
    name: 'email',
    value: ref('')
  },
  {
    name: 'password',
    value: ref(''),
    visibility: ref(true)
  },
  {
    name: 'confirmPassword',
    value: ref(''),
    visibility: ref(true)
  },
]

type field = {
  name: string,
  value: Ref<string>,
  visibility?: Ref<boolean>
  
}

function toggleVisibility(field: field) {
  if (field.visibility) {
    field.visibility.value = !field.visibility.value;
  }
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/

const validations = [ 
  { 
    condition: 'At least 8 Characters',
    passed: computed(()=> fields[1].value.value.length >= 8)
  }, {
    condition: 'One uppercase character',
    passed: computed(()=> /[A-Z]/.test(fields[1].value.value))
  }, {
    condition: 'One number eg. 1,2,3',
    passed: computed(() => /\d/.test(fields[1].value.value))
  }]

const confirmPassword = computed(()=> fields[2].value.value === fields[1].value.value);

async function register() {

  console.log(fields[1].value.value)
  const match = fields[1].value.value.match(passwordRegex);
  console.log(match);

  // try {
  //   console.log(fields[0].value.value);
  //   const res = await fetch('/api/register', {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       'email': `${fields[0].value.value}`,
  //       'password': `${fields[1].value.value}`
  //     })
  //   })
  //   const data = await res.json();
  //   console.log(data);
  // } 
  // catch (e){
  //   console.log(e);
  // }
}
definePageMeta({
  layout: 'login',
  
})
</script>

<style>

</style>
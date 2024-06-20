<template>
  <div class="flex flex-col gap-2">
    <div class="border border-solid border-slate-900 rounded-sm flex flex-row items-center" v-for="field in fields" :key="field.name">
      <input v-model="field.value.value" :placeholder="field.name" :type="field.name === 'email' ? 
      'email' : field.visibility?.value ? 
      '': 'password'">
      <i v-if="field.name != 'email' " :class="field.visibility?.value ? 'fa fa-eye-slash': 'fa fa-eye'" aria-hidden="true" @click="toggleVisibility(field)"/>
    </div>
    <button class="p-1 bg-slate-400" @click="register">
      Register
    </button>
  </div>
</template>

<script lang="ts" setup>
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

async function register() {
  try {
    console.log(fields[0].value.value);
    const res = await fetch('/api/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': `${fields[0].value.value}`,
        'password': `${fields[1].value.value}`
      })
    })
    const data = await res.json();
    console.log(data);
  } 
  catch (e){
    console.log(e);
  }
}
definePageMeta({
  layout: 'guest',
  
})
</script>

<style>

</style>
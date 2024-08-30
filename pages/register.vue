<template>

  <div class="h-screen flex md:flex-row flex-col">
    <div class="md:w-1/2 md:h-full h-1/2 flex justify-center items-center bg-white">
      <CardPreview 
      :class="'md:scale-100 scale-[65%] md:mb-0 -mb-16'"
       :prevTitle="quizData.prevTitle"
       :prevDesc="quizData.prevDesc"
       :prevQuestion="quizData.prevQuestion"
       :prevAnswers="quizData.prevAnswers"
       :prevUrl="quizData.prevUrl"
      />
    </div>
    <div class="md:w-1/2 md:h-full h-1/2 flex justify-center items-center">
      <form class="flex flex-col gap-2" @submit.prevent="register">
          <div v-for="field in fields" :key="field.name" class="w-80">
            <UInput v-model="field.value.value" 
            :type="field.type === 'email' ? 
            'email' : field.type != 'password' ? 
            '': field.visibility?.value ? '': 'password'"
            :placeholder="field.name"
            :ui="{ icon: { trailing: { pointer: '' } } }"
            class="relative"
            size="xl"> 
              <template #trailing>
                <ClientOnly>
                  <Icon v-if="field.visibility " :name="field.visibility?.value ? 'i-fa6-solid:eye-slash': 'i-fa6-solid:eye'" aria-hidden="true" @click="toggleVisibility(field)"/>
                  <span v-else-if="field.name === 'name'" class="text-[9.5px] pt-4">{{ field.value.value.length }} / 25</span>
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
            <div aria-live="polite" aria-atomic="true" class="text-red-400 text-sm text-wrap" v-if="field.error.value">
               {{ field.error.value }}
            </div>
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
const route = useRoute();
const accountTypes = ['teacher','student'];
const accountType = ref(route.query.type ?? accountTypes[1]);

const quizData = {
        prevTitle: "Cell Structure",
        prevDesc: "Cells are the basic unit of life. Remember, cell theory explains the origins and properties of cells.",
        prevQuestion: "Which of the following is not a part of the cell theory?",
        prevAnswers: [
            { truth: false, text: "All living things are made up of cells." },
            { truth: true, text: "Cells can arise spontaneously from non-living material." },
            { truth: false, text: "Cells are the basic unit of structure and function in living things." },
            { truth: false, text: "All cells come from pre-existing cells." }
        ],
        prevUrl: "/cell.jpeg",
    };

const nameRegex = /^(\b\w+\b )*\b\w+\b$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/

const fields = [
  {
    name: 'name',
    type: 'name',
    value: ref(''),
    required: true,
    test: nameRegex,
    error: ref('')
  },
  {
    name: 'email',
    type: 'email',
    value: ref(''),
    required: true,
    error: ref('')
  },
  {
    name: 'password',
    type: 'password',
    value: ref(''),
    required: true,
    visibility: ref(true),
    test: passwordRegex,
    error: ref('')
  },
  {
    name: 'confirmPassword',
    type: 'password',
    value: ref(''),
    required: false,
    visibility: ref(true),
    error: ref('')
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


const validations = [ 
  { 
    condition: 'At least 8 Characters',
    passed: computed(()=> fields[2].value.value.length >= 8)
  }, {
    condition: 'One uppercase character',
    passed: computed(()=> /[A-Z]/.test(fields[2].value.value))
  }, {
    condition: 'One number eg. 1,2,3',
    passed: computed(() => /\d/.test(fields[2].value.value))
  }]

const confirmPassword = computed(()=> fields[3].value.value === fields[2].value.value);

watch(
  fields[0].value,
  (newValue, oldValue) => {
    if(newValue.length > 25){
      console.log('exceed25');
      fields[0].value.value = oldValue;
    }
  }
)

const inputsValue = computed(()=> fields.map((field) => field.value.value));

watch(
  inputsValue,
  (newValue, oldValue) => {
    newValue.forEach((newVal, index) => {
      const oldVal = oldValue[index];
      if (newVal != oldVal) {
        fields[index].error.value = '';
        console.log('what');
      }
    });
  }
)

const router = useRouter();
const publicStore = usePublicStore();

async function register() {

  const submissionData = new FormData();
  
  for (const field of fields) {
    if (field.value.value.length == 0) {
        field.error.value = field.name + " is empty";
        return;
      }
    if (field.test && !field.test.test(field.value.value)){
      
      if(field.name == 'name'){
        field.error.value += field.name + " can't have leading or trailing whitespaces";
        return;
      }
      field.error.value = field.name + " doesn't meet requirements";
        return;
      }
  }
  try {

    fields.forEach((field) => {
      if (field.required){
        console.log(field)
        submissionData.append(
              field.name,
              field.value.value
            );
      }
    })
    submissionData.append(
      "account_type", accountType.value
    )
    
    await publicStore.register(submissionData);
    alert('Account Created, Please Login')
    router.push('/login');
  } 
  catch (e){
    alert(e);
    console.log(e);
  }
}
definePageMeta({
  layout: 'guest',
  
})
</script>

<style>

</style>
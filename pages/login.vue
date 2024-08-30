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
                </ClientOnly>
              </template>
            </UInput>
            <div aria-live="polite" aria-atomic="true" class="text-red-400 text-sm text-wrap" v-if="field.error.value">
               {{ field.error.value }}
            </div>
          </div>
          <button class="p-1 bg-slate-400" type="submit">
            Login
          </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/

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

const fields = [
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
    visibility: ref(false),
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


const publicStore = usePublicStore();
const router = useRouter();

async function register() {

  const submissionData = new FormData();
  
  for (const field of fields) {
    if (field.value.value.length == 0) {
        field.error.value = field.name + " is empty";
        return;
      }
  }
  try {

    fields.forEach((field) => {
      if (field.required){
        submissionData.append(
              field.name,
              field.value.value
            );
      }
    })

    await publicStore.logIn(submissionData);
    const type = useCookie('type');
    console.log(type.value);
    router.push(`/${type.value}`);
    
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
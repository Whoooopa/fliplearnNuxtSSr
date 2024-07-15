<template>
  <div class="w-full h-full mt-10 items-center flex flex-col gap-10">
    <div
    v-for="s in 4"
    class="w-5/6 h-20 border-t-[1px] border-t-slate-500">
    <div class="w-full h-full flex flex-row justify-between">
      <div class="w-1/2 h-full flex flex-col mt-2 justify-center gap-2">
        <USkeleton class="w-full h-1/2"/>
        <div class="w-full h-1/2 flex flex-row gap-x-5">
          <USkeleton v-for="s in 3" class="w-32 h-5/6" />
        </div>
      </div>
      <div class="w-32 h-full flex flex-row items-center justify-around">
        <USkeleton class="w-10 h-1/2"/>
        <USkeleton class="w-10 h-1/2"/>
      </div>
      
    </div>


    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
<template>
  <div class="h-screen bg-softbackground md:px-2 px-10 mb-10 flex lg:flex-row flex-col justify-center items-center gap-28">
    <span class="text-accent md:text-5xl text-2xl font-extrabold md:w-1/2">Share your personalized deck with students</span>
    <div class="relative w-80 h-80">
      <CardLearn class="absolute top-0 z-40" />
      <CardLearn class="absolute md:top-5 md:right-10 top-2 right-1 z-30" />
      <CardLearn class="absolute md:top-5 md:left-10 top-2 left-1 z-30" />
      <CardLearn class="absolute md:top-10 md:right-20 top-4 right-2 z-20" />
      <CardLearn class="absolute md:top-10 md:left-20 top-4 left-2 z-20" />
      <CardShadow class="absolute md:top-12 md:right-[4.8rem] top-5 right-3 z-10"/>
      <CardShadow class="absolute md:top-12 md:left-[5.5rem] top-5 left-3 z-10"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
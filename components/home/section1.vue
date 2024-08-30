<template>
  <div class="h-screen bg-softbackground flex justify-center items-center md:px-2 px-10">
    <div class="flex flex-col md:w-3/4 w-full md:pr-20 gap-10">
      <span class="md:text-5xl md:font-extrabold text-2xl font-semibold md:text-start text-center  text-accent">
        We aim to leverage your learning experience to the best it can be
      </span>
      <div class="flex flex-row gap-5 md:justify-start justify-center">
        <NuxtLink to="/about">
          <button>Learn More</button>
        </NuxtLink>
        <NuxtLink to="/register">
          <button>Join Us</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
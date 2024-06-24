<template>
  <div>
    <HomeSection1 class="section" />
    <HomeSection2 class="section" />
    <HomeSection3 class="section" />
    <HomeSection4 class="section" />
    <HomeSection5 class="section" />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'guest'
})

</script>

<style>

.section {
  scroll-snap-align: start;
}
</style>
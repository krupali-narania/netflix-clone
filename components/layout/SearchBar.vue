<template>

<input
  v-model="query"
  placeholder="Search movies..."
  class="p-2 rounded text-black"
  @keyup.enter="search"
/>

</template>

<script setup>

const query = ref("")

const router = useRouter()

const search = () => {

  router.push(`/search?q=${query.value}`)

}

</script>
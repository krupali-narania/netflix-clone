<template>
  <div class="p-10">
    <h1 class="text-2xl mb-6"></h1>

    <div class="grid grid-cols-5 gap-6">
      <MovieCard v-for="movie in results" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import MovieCard from "~/components/movie/MovieCard.vue";

const route = useRoute();

const config = useRuntimeConfig();

const { data } = await useFetch(`${config.public.tmdbBaseUrl}/search/movie`, {
  query: {
    api_key: config.public.tmdbApiKey,
    query: route.query.q,
  },
});

const results = data.value.results;
</script>

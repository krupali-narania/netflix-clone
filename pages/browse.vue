<template>

<div>

  <HeroBanner />

  <MovieRow title="Trending Now" :movies="trending" />
  <MovieRow title="Popular" :movies="popular" />

</div>

</template>

<script setup>

definePageMeta({
  middleware: "auth"
})

import HeroBanner from "~/components/movie/HeroBanner.vue"
import MovieRow from "~/components/movie/MovieRow.vue"

const { getTrendingMovies, getPopularMovies } = useMovies()

const trendingData = await getTrendingMovies()
const popularData = await getPopularMovies()

const trending = trendingData.value.results
const popular = popularData.value.results

</script>
<template>
  <div>
    <HeroBanner />

    <MovieRow title="Trending Now" :movies="trending" />
    <MovieRow title="Popular on Netflix" :movies="popular" />
    <MovieRow title="Top Rated" :movies="topRated" />
    <MovieRow title="Now Playing" :movies="nowPlaying" />

    <MovieRow title="Action & Adventure" :movies="action" />
    <MovieRow title="Comedy" :movies="comedy" />
    <MovieRow title="Horror" :movies="horror" />
    <MovieRow title="Romance" :movies="romance" />
    <MovieRow title="Documentaries" :movies="documentaries" />
    <MovieRow title="Animation" :movies="animation" />
    <MovieRow title="Thrillers" :movies="thrillers" />
  </div>
</template>

<script setup>
import HeroBanner from "~/components/movie/HeroBanner.vue";
import MovieRow from "~/components/movie/MovieRow.vue";

const {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,

  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getDocumentaries,
  getAnimationMovies,
  getThrillerMovies,
} = useMovies();

const [
  trendingData,
  popularData,
  topRatedData,
  nowPlayingData,

  actionData,
  comedyData,
  horrorData,
  romanceData,
  docsData,
  animationData,
  thrillerData,
] = await Promise.all([
  getTrendingMovies(),
  getPopularMovies(),
  getTopRatedMovies(),
  getNowPlayingMovies(),

  getActionMovies(),
  getComedyMovies(),
  getHorrorMovies(),
  getRomanceMovies(),
  getDocumentaries(),
  getAnimationMovies(),
  getThrillerMovies(),
]);

const trending = trendingData?.value?.results ?? [];
const popular = popularData?.value?.results ?? [];
const topRated = topRatedData?.value?.results ?? [];
const nowPlaying = nowPlayingData?.value?.results ?? [];

const action = actionData?.value?.results ?? [];
const comedy = comedyData?.value?.results ?? [];
const horror = horrorData?.value?.results ?? [];
const romance = romanceData?.value?.results ?? [];
const documentaries = docsData?.value?.results ?? [];
const animation = animationData?.value?.results ?? [];
const thrillers = thrillerData?.value?.results ?? [];
</script>

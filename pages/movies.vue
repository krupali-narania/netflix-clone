<template>
  <div class="bg-[#141414] text-white">
    <!-- Movies + Genre bar -->
    <div
      class="fixed z-[99] w-full flex items-center gap-4 px-[4%] py-3 transition-colors duration-300"
      :class="
        subScrolled ? 'bg-[#141414] top-[68px]' : 'bg-transparent top-[68px]'
      "
    >
      <h2 class="text-[28px] font-extrabold">Movies</h2>
      <div class="relative">
        <select
          v-model="selectedGenre"
          class="appearance-none bg-transparent border border-white/50 text-white text-sm px-4 py-1.5 pr-8 rounded-sm cursor-pointer outline-none"
        >
          <option value="" class="bg-[#141414]">Genres</option>
          <option
            v-for="g in genres"
            :key="g.id"
            :value="g.id"
            class="bg-[#141414]"
          >
            {{ g.name }}
          </option>
        </select>
        <svg
          class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
          viewBox="0 0 20 20"
          fill="white"
          width="12"
          height="12"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </div>

      <!-- View toggle buttons -->
      <div
        class="ml-auto flex items-center border border-white/40 rounded overflow-hidden"
      >
        <button
          class="flex items-center justify-center w-9 h-8 transition-colors"
          :class="
            viewMode === 'rows'
              ? 'bg-white/20'
              : 'bg-transparent hover:bg-white/10'
          "
          @click="viewMode = 'rows'"
          title="Row view"
        >
          <svg viewBox="0 0 20 20" fill="white" width="16" height="16">
            <rect x="2" y="3" width="16" height="3" rx="1" />
            <rect x="2" y="8.5" width="16" height="3" rx="1" />
            <rect x="2" y="14" width="16" height="3" rx="1" />
          </svg>
        </button>
        <button
          class="flex items-center justify-center w-9 h-8 border-l border-white/40 transition-colors"
          :class="
            viewMode === 'grid'
              ? 'bg-white/20'
              : 'bg-transparent hover:bg-white/10'
          "
          @click="viewMode = 'grid'"
          title="Grid view"
        >
          <svg viewBox="0 0 20 20" fill="white" width="16" height="16">
            <rect x="2" y="2" width="7" height="7" rx="1" />
            <rect x="11" y="2" width="7" height="7" rx="1" />
            <rect x="2" y="11" width="7" height="7" rx="1" />
            <rect x="11" y="11" width="7" height="7" rx="1" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ROWS MODE: hero + rows with titles -->
    <template v-if="viewMode === 'rows'">
      <!-- Full-page Hero Banner -->
      <div
        v-if="heroMovie"
        class="relative h-[100vh] flex items-end pb-24"
        :style="{
          backgroundImage: `url('${imageUrl}${heroMovie.backdrop_path}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }"
      >
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent"
        ></div>
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-transparent to-transparent"
        ></div>
        <div class="relative z-[2] px-[4%] max-w-[600px]">
          <h1
            class="text-[clamp(32px,5vw,64px)] font-extrabold leading-tight mb-3 drop-shadow-[2px_2px_8px_rgba(0,0,0,0.8)]"
          >
            {{ heroMovie.title }}
          </h1>
          <p
            class="text-[15px] text-[#e5e5e5] leading-relaxed mb-5 max-w-[480px] line-clamp-3"
          >
            {{ heroMovie.overview }}
          </p>
          <div class="flex gap-3">
            <button
              class="flex items-center gap-2 bg-white text-black font-semibold px-7 py-[10px] rounded border-none cursor-pointer hover:opacity-80 transition"
              @click="navigateTo(`/movie/${heroMovie.id}`)"
            >
              <svg viewBox="0 0 24 24" fill="black" width="20" height="20">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
            <button
              class="flex items-center gap-2 bg-[rgba(109,109,110,0.7)] text-white font-semibold px-7 py-[10px] rounded border-none cursor-pointer hover:opacity-80 transition"
              @click="selectedMovie = heroMovie"
            >
              <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>

      <!-- Rows with titles (genre filtered or all) -->
      <div v-if="!selectedGenre">
        <MovieRow title="Popular on Netflix" :movies="popular" />
        <MovieRow title="Trending Now" :movies="trending" />
        <MovieRow title="Top Rated" :movies="topRated" />
        <MovieRow title="Now Playing" :movies="nowPlaying" />
        <MovieRow title="Action & Adventure" :movies="action" />
        <MovieRow title="Comedy" :movies="comedy" />
        <MovieRow title="Horror" :movies="horror" />
        <MovieRow title="Romance" :movies="romance" />
        <MovieRow title="Thrillers" :movies="thrillers" />
      </div>
      <div v-else class="px-[4%] pb-16 pt-4">
        <div v-if="loading" class="flex justify-center py-20">
          <svg
            class="animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            width="40"
            height="40"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="rgba(255,255,255,.2)"
              stroke-width="3"
            />
            <path
              d="M4 12a8 8 0 018-8"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div
          v-else
          class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          <div
            v-for="movie in filteredMovies"
            :key="movie.id"
            class="relative group cursor-pointer overflow-hidden rounded"
            @click="selectedMovie = movie"
          >
            <img
              :src="imageUrl + (movie.backdrop_path || movie.poster_path)"
              :alt="movie.title"
              class="w-full h-[110px] object-cover transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
            <div
              v-if="movie.vote_average >= 7.5"
              class="absolute top-1 right-1 flex flex-col items-center rounded-[2px] bg-[#e50914] px-[4px] py-[2px] leading-none"
            >
              <span class="text-[5px] font-black text-white">TOP</span>
              <span class="text-[9px] font-black text-white">10</span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- GRID MODE: no hero, flat grid no scroll rows -->
    <template v-else>
      <div class="px-[4%] pb-16" style="padding-top: calc(68px + 52px)">
        <div v-if="loading" class="flex justify-center py-20">
          <svg
            class="animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            width="40"
            height="40"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="rgba(255,255,255,.2)"
              stroke-width="3"
            />
            <path
              d="M4 12a8 8 0 018-8"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div
          v-else
          class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        >
          <div
            v-for="movie in selectedGenre ? filteredMovies : allMovies"
            :key="movie.id"
            class="relative group cursor-pointer overflow-hidden rounded"
            @click="selectedMovie = movie"
          >
            <img
              :src="imageUrl + (movie.backdrop_path || movie.poster_path)"
              :alt="movie.title"
              class="w-full h-[110px] object-cover transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
            <div
              v-if="movie.vote_average >= 7.5"
              class="absolute top-1 right-1 flex flex-col items-center rounded-[2px] bg-[#e50914] px-[4px] py-[2px] leading-none"
            >
              <span class="text-[5px] font-black text-white">TOP</span>
              <span class="text-[9px] font-black text-white">10</span>
            </div>
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-end p-2 opacity-0 group-hover:opacity-100"
            >
              <p class="text-[11px] font-semibold leading-tight line-clamp-2">
                {{ movie.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- MovieModal -->
    <ClientOnly>
      <MovieModal
        :movie="selectedMovie"
        @close="selectedMovie = null"
        @trailer="(id) => navigateTo(`/movie/${id}`)"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import MovieRow from "~/components/movie/MovieRow.vue";
import MovieModal from "~/components/movie/MovieModal.vue";

const config = useRuntimeConfig();
const imageUrl = config.public.tmdbImageUrl;

const {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getThrillerMovies,
} = useMovies();

const [
  popularData,
  trendingData,
  topRatedData,
  nowPlayingData,
  actionData,
  comedyData,
  horrorData,
  romanceData,
  thrillerData,
] = await Promise.all([
  getPopularMovies(),
  getTrendingMovies(),
  getTopRatedMovies(),
  getNowPlayingMovies(),
  getActionMovies(),
  getComedyMovies(),
  getHorrorMovies(),
  getRomanceMovies(),
  getThrillerMovies(),
]);

const popular = popularData?.value?.results ?? [];
const trending = trendingData?.value?.results ?? [];
const topRated = topRatedData?.value?.results ?? [];
const nowPlaying = nowPlayingData?.value?.results ?? [];
const action = actionData?.value?.results ?? [];
const comedy = comedyData?.value?.results ?? [];
const horror = horrorData?.value?.results ?? [];
const romance = romanceData?.value?.results ?? [];
const thrillers = thrillerData?.value?.results ?? [];

const heroMovie = computed(() => popular[0] ?? null);

const allMovies = computed(() =>
  [
    popular,
    trending,
    topRated,
    nowPlaying,
    action,
    comedy,
    horror,
    romance,
    thrillers,
  ]
    .flat()
    .filter((m, i, self) => self.findIndex((x) => x.id === m.id) === i),
);

const selectedMovie = ref(null);
const selectedGenre = ref("");
const loading = ref(false);
const filteredMovies = ref([]);
const subScrolled = ref(false);
const viewMode = ref("rows");

onMounted(() => {
  window.addEventListener("scroll", () => {
    subScrolled.value = window.scrollY > 60;
  });
});

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

watch(selectedGenre, async (genreId) => {
  if (!genreId) return;
  loading.value = true;
  try {
    const res = await fetch(
      `${config.public.tmdbBaseUrl}/discover/movie?` +
        new URLSearchParams({
          api_key: config.public.tmdbApiKey,
          with_genres: genreId,
          sort_by: "popularity.desc",
        }),
    );
    const data = await res.json();
    filteredMovies.value = data.results ?? [];
  } finally {
    loading.value = false;
  }
});
</script>

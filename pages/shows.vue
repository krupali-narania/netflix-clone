<template>
  <div class="bg-[#141414] text-white">
    <!-- Shows + Genre bar -->
    <div
      class="fixed z-[99] w-full flex items-center gap-4 px-[4%] py-3 transition-colors duration-300"
      :class="
        subScrolled ? 'bg-[#141414] top-[68px]' : 'bg-transparent top-[68px]'
      "
    >
      <h2 class="text-[28px] font-extrabold">Shows</h2>
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
      <div
        class="ml-auto flex items-center border border-white/40 rounded overflow-hidden"
      >
        <button
          class="flex items-center justify-center w-9 h-8 transition-colors"
          :class="viewMode === 'rows' ? 'bg-white/20' : 'hover:bg-white/10'"
          @click="viewMode = 'rows'"
        >
          <svg viewBox="0 0 20 20" fill="white" width="16" height="16">
            <rect x="2" y="3" width="16" height="3" rx="1" />
            <rect x="2" y="8.5" width="16" height="3" rx="1" />
            <rect x="2" y="14" width="16" height="3" rx="1" />
          </svg>
        </button>
        <button
          class="flex items-center justify-center w-9 h-8 border-l border-white/40 transition-colors"
          :class="viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'"
          @click="viewMode = 'grid'"
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

    <!-- ROWS MODE -->
    <template v-if="viewMode === 'rows'">
      <div
        v-if="heroShow"
        class="relative h-[100vh] flex items-end pb-24"
        :style="{
          backgroundImage: `url('${imageUrl}${heroShow.backdrop_path}')`,
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
            {{ heroShow.title }}
          </h1>
          <p
            class="text-[15px] text-[#e5e5e5] leading-relaxed mb-5 max-w-[480px] line-clamp-3"
          >
            {{ heroShow.overview }}
          </p>
          <div class="flex gap-3">
            <button
              class="flex items-center gap-2 bg-white text-black font-semibold px-7 py-[10px] rounded cursor-pointer hover:opacity-80 transition"
            >
              <svg viewBox="0 0 24 24" fill="black" width="20" height="20">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
            <button
              class="flex items-center gap-2 bg-[rgba(109,109,110,0.7)] text-white font-semibold px-7 py-[10px] rounded cursor-pointer hover:opacity-80 transition"
              @click="selectedShow = heroShow"
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

      <div v-if="!selectedGenre">
        <MovieRow title="Popular on Netflix" :movies="popular" />
        <MovieRow title="Trending Now" :movies="trending" />
        <MovieRow title="Top Rated" :movies="topRated" />
        <MovieRow title="Drama" :movies="drama" />
        <MovieRow title="Comedy" :movies="comedy" />
        <MovieRow title="Crime" :movies="crime" />
        <MovieRow title="Sci-Fi & Fantasy" :movies="scifi" />
        <MovieRow title="Action & Adventure" :movies="action" />
        <MovieRow title="Documentary" :movies="documentary" />
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
            v-for="show in filteredShows"
            :key="show.id"
            class="relative group cursor-pointer overflow-hidden rounded"
            @click="selectedShow = show"
          >
            <img
              :src="imageUrl + (show.backdrop_path || show.poster_path)"
              :alt="show.title"
              class="w-full h-[110px] object-cover transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
            <div
              v-if="show.vote_average >= 7.5"
              class="absolute top-1 right-1 flex flex-col items-center rounded-[2px] bg-[#e50914] px-[4px] py-[2px] leading-none"
            >
              <span class="text-[5px] font-black text-white">TOP</span
              ><span class="text-[9px] font-black text-white">10</span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- GRID MODE -->
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
            v-for="show in selectedGenre ? filteredShows : allShows"
            :key="show.id"
            class="relative group cursor-pointer overflow-hidden rounded"
            @click="selectedShow = show"
          >
            <img
              :src="imageUrl + (show.backdrop_path || show.poster_path)"
              :alt="show.title"
              class="w-full h-[110px] object-cover transition-transform duration-200 group-hover:scale-105"
              loading="lazy"
            />
            <div
              v-if="show.vote_average >= 7.5"
              class="absolute top-1 right-1 flex flex-col items-center rounded-[2px] bg-[#e50914] px-[4px] py-[2px] leading-none"
            >
              <span class="text-[5px] font-black text-white">TOP</span
              ><span class="text-[9px] font-black text-white">10</span>
            </div>
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-end p-2 opacity-0 group-hover:opacity-100"
            >
              <p class="text-[11px] font-semibold leading-tight line-clamp-2">
                {{ show.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <ClientOnly>
      <MovieModal
        :movie="selectedShow"
        @close="selectedShow = null"
        @trailer="() => {}"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import MovieRow from "~/components/movie/MovieRow.vue";
import MovieModal from "~/components/movie/MovieModal.vue";

const config = useRuntimeConfig();
const base = config.public.tmdbBaseUrl;
const key = config.public.tmdbApiKey;
const imageUrl = config.public.tmdbImageUrl;

// Normalize TV show to look like a movie (title instead of name, tv media_type for video endpoint)
const normalize = (shows) =>
  shows.map((s) => ({
    ...s,
    title: s.name || s.title,
    media_type: "tv",
  }));

const fetchTV = (path, params = {}) =>
  useFetch(`${base}${path}`, { query: { api_key: key, ...params } }).then(
    ({ data }) => normalize(data?.value?.results ?? []),
  );

const [
  popular,
  trending,
  topRated,
  drama,
  comedy,
  crime,
  scifi,
  action,
  documentary,
] = await Promise.all([
  fetchTV("/tv/popular"),
  fetchTV("/trending/tv/week"),
  fetchTV("/tv/top_rated"),
  fetchTV("/discover/tv", { with_genres: 18, sort_by: "popularity.desc" }),
  fetchTV("/discover/tv", { with_genres: 35, sort_by: "popularity.desc" }),
  fetchTV("/discover/tv", { with_genres: 80, sort_by: "popularity.desc" }),
  fetchTV("/discover/tv", { with_genres: 10765, sort_by: "popularity.desc" }),
  fetchTV("/discover/tv", { with_genres: 10759, sort_by: "popularity.desc" }),
  fetchTV("/discover/tv", { with_genres: 99, sort_by: "popularity.desc" }),
]);

const heroShow = computed(() => popular[0] ?? null);
const allShows = computed(() =>
  [
    popular,
    trending,
    topRated,
    drama,
    comedy,
    crime,
    scifi,
    action,
    documentary,
  ]
    .flat()
    .filter((s, i, self) => self.findIndex((x) => x.id === s.id) === i),
);

const selectedShow = ref(null);
const selectedGenre = ref("");
const loading = ref(false);
const filteredShows = ref([]);
const subScrolled = ref(false);
const viewMode = ref("rows");

onMounted(() => {
  window.addEventListener("scroll", () => {
    subScrolled.value = window.scrollY > 60;
  });
});

const genres = [
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10759, name: "Action & Adventure" },
  { id: 99, name: "Documentary" },
  { id: 9648, name: "Mystery" },
  { id: 10762, name: "Kids" },
  { id: 10764, name: "Reality" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

watch(selectedGenre, async (genreId) => {
  if (!genreId) return;
  loading.value = true;
  try {
    const res = await fetch(
      `${base}/discover/tv?` +
        new URLSearchParams({
          api_key: key,
          with_genres: genreId,
          sort_by: "popularity.desc",
        }),
    );
    const data = await res.json();
    filteredShows.value = normalize(data.results ?? []);
  } finally {
    loading.value = false;
  }
});
</script>

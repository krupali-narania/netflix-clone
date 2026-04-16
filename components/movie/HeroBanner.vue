<template>
  <div
    class="relative flex min-h-[480px] h-[90vh] items-end pb-20"
    :style="heroStyle"
  >
    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"
    ></div>
    <div
      class="pointer-events-none absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-[#141414]/85 via-[#141414]/30 to-transparent"
    ></div>

    <div class="relative z-[2] max-w-[520px] px-[4%]">
      <div class="mb-[14px] flex items-center gap-[10px]">
        <div
          class="flex flex-col items-center rounded-[2px] bg-[#e50914] px-[7px] py-[3px] leading-none"
        >
          <span class="text-[7px] font-black tracking-[0.5px]">TOP</span>
          <span class="text-[13px] font-black">10</span>
        </div>
        <ClientOnly>
          <span class="text-base font-semibold"
            >#{{ rankNumber }} in Movies Today</span
          >
          <template #fallback>
            <span class="text-base font-semibold">#1 in Movies Today</span>
          </template>
        </ClientOnly>
      </div>

      <h1
        class="mb-[14px] text-[clamp(32px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-1px] drop-shadow-[2px_2px_8px_rgba(0,0,0,0.5)]"
      >
        {{ featuredMovie?.title || "Featured Movie" }}
      </h1>
      <p class="mb-5 max-w-[460px] text-[15px] leading-[1.55] text-[#e5e5e5]">
        {{
          featuredMovie?.overview ||
          "Watch the latest blockbuster movies and TV shows from around the world."
        }}
      </p>

      <div class="flex gap-[10px]">
        <button
          class="flex cursor-pointer items-center gap-2 rounded border-none bg-white px-[26px] py-[9px] text-base font-semibold text-black transition duration-200 hover:opacity-[0.82]"
          @click="navigateTo(`/movie/${featuredMovie?.id}`)"
        >
          <svg viewBox="0 0 24 24" fill="black" width="20" height="20">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </button>

        <button
          class="flex cursor-pointer items-center gap-2 rounded border-none bg-[rgba(109,109,110,0.7)] px-[26px] py-[9px] text-base font-semibold text-white transition duration-200 hover:opacity-[0.82]"
          @click="showModal = true"
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

    <div class="absolute bottom-20 right-[4%] z-[2]">
      <span
        class="border border-white/30 border-l-[3px] border-l-white/60 px-[10px] py-[3px] text-[13px] text-white"
        >U/A 13+</span
      >
    </div>

    <ClientOnly>
      <MovieModal
        :movie="showModal ? featuredMovie : null"
        @close="showModal = false"
        @trailer="(id) => navigateTo(`/movie/${id}`)"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import MovieModal from "~/components/movie/MovieModal.vue";

const config = useRuntimeConfig();
const imageUrl = config.public.tmdbImageUrl;
const { getTrendingMovies } = useMovies();
const trendingData = await getTrendingMovies();
const featuredMovie = trendingData?.value?.results?.[0] || null;

const showModal = ref(false);
const rankNumber = featuredMovie ? (featuredMovie.id % 10) + 1 : 1;

const heroStyle = computed(() => ({
  backgroundImage: featuredMovie?.backdrop_path
    ? `url('${imageUrl}${featuredMovie.backdrop_path}')`
    : `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba')`,
  backgroundSize: "cover",
  backgroundPosition: "center top",
}));
</script>

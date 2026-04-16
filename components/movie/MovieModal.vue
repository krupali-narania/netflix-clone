<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="movie"
        class="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-5"
        @click.self="$emit('close')"
      >
        <div
          class="relative max-h-[90vh] w-full max-w-[860px] overflow-y-auto rounded-lg bg-[#181818] scrollbar-hide"
        >
          <!-- Close button -->
          <button
            class="absolute right-[14px] top-[14px] z-10 flex h-9 w-9 items-center justify-center rounded-full border-none bg-[#181818] p-0 cursor-pointer"
            @click="$emit('close')"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2.5"
              width="20"
              height="20"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <!-- Hero area: trailer or backdrop -->
          <div class="relative h-[480px] w-full bg-black">
            <!-- Backdrop image — fades out once trailer ready -->
            <img
              :src="imageUrl + movie.backdrop_path"
              class="block h-full w-full rounded-t-lg object-cover transition-opacity duration-700"
              :class="trailerReady ? 'opacity-0' : 'opacity-100'"
              :alt="movie.title"
            />

            <!-- Trailer iframe — muted autoplay, same as card popup -->
            <iframe
              v-if="trailerKey"
              :src="`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${trailerKey}&rel=0&iv_load_policy=3`"
              class="absolute inset-0 h-full w-full rounded-t-lg transition-opacity duration-700"
              :class="trailerReady ? 'opacity-100' : 'opacity-0'"
              allow="autoplay; encrypted-media"
              allowfullscreen
              frameborder="0"
              title="trailer"
              @load="trailerReady = true"
            />

            <!-- Spinner while fetching -->
            <div
              v-if="loadingTrailer && !trailerKey"
              class="absolute inset-0 flex items-center justify-center"
            >
              <svg
                class="animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                width="32"
                height="32"
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
              class="absolute inset-0 rounded-t-lg bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent"
            ></div>

            <!-- Title + buttons -->
            <div class="absolute bottom-[30px] left-10">
              <h1
                class="mb-4 text-[40px] font-extrabold text-white drop-shadow-[2px_2px_12px_rgba(0,0,0,0.9)]"
              >
                {{ movie.title }}
              </h1>
              <div class="flex gap-[10px]">
                <!-- Play → navigates to full trailer page -->
                <button
                  class="flex cursor-pointer items-center gap-2 rounded border-none bg-white px-[26px] py-[9px] text-base font-semibold text-black transition duration-200 hover:opacity-[0.82]"
                  @click="playTrailer"
                >
                  <svg viewBox="0 0 24 24" fill="black" width="20" height="20">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play
                </button>
                <button
                  class="flex cursor-pointer items-center gap-2 rounded border-none bg-[rgba(109,109,110,0.7)] px-[26px] py-[9px] text-base font-semibold text-white transition duration-200 hover:opacity-[0.82]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    width="18"
                    height="18"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  My List
                </button>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="grid grid-cols-1 gap-5 px-10 pb-9 pt-5 md:grid-cols-2">
            <div>
              <div class="mb-3 flex flex-wrap items-center gap-[10px]">
                <span class="font-bold text-[#46d369]"
                  >{{ matchPercent }}% Match</span
                >
                <span class="text-sm text-white/80">{{ releaseYear }}</span>
                <span
                  class="border border-white/40 px-[6px] py-px text-[11px] text-white/70"
                  >U/A 13+</span
                >
                <span class="text-sm text-white/80"
                  >{{ Math.floor((movie.runtime || 100) / 60) }}h
                  {{ (movie.runtime || 100) % 60 }}m</span
                >
                <span
                  class="border border-white/40 px-[6px] py-px text-[11px] text-white/70"
                  >HD</span
                >
              </div>
              <p class="text-sm leading-relaxed text-white/85">
                {{ movie.overview }}
              </p>
            </div>
            <div>
              <p class="mb-[6px] text-[13px] text-white/85">
                <span class="text-white/40">Genres: </span>Drama, Thriller
              </p>
              <p class="text-[13px] text-white/85">
                <span class="text-white/40">Rating: </span
                >{{ movie.vote_average?.toFixed(1) }}/10
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({ movie: Object });
const emit = defineEmits(["close", "trailer"]);
const config = useRuntimeConfig();
const imageUrl = config.public.tmdbImageUrl;

const trailerKey = ref(null);
const trailerReady = ref(false);
const loadingTrailer = ref(false);

// Fetch trailer whenever the movie changes (modal opens with a new movie)
watch(
  () => props.movie,
  async (newMovie) => {
    trailerKey.value = null;
    trailerReady.value = false;
    if (!newMovie) return;

    loadingTrailer.value = true;
    try {
      const res = await fetch(
        `${config.public.tmdbBaseUrl}/movie/${newMovie.id}/videos?api_key=${config.public.tmdbApiKey}`,
      );
      const data = await res.json();
      const trailer =
        data.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube",
        ) || data.results?.find((v) => v.site === "YouTube");
      trailerKey.value = trailer?.key || null;
    } catch {
      trailerKey.value = null;
    } finally {
      loadingTrailer.value = false;
    }
  },
  { immediate: true },
);

// Play button → full page (unmuted, with controls)
const playTrailer = () => emit("trailer", props.movie.id);

const matchPercent = computed(() =>
  Math.floor(60 + (props.movie?.vote_average || 7) * 4),
);
const releaseYear = computed(
  () => props.movie?.release_date?.slice(0, 4) || "",
);
</script>

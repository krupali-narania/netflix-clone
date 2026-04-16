<template>
  <div
    ref="cardRef"
    class="group relative w-[220px] flex-shrink-0 cursor-pointer"
    @mouseenter="startHover"
    @mouseleave="endHover"
  >
    <div
      class="relative overflow-hidden rounded transition-transform duration-200 group-hover:scale-[1.04]"
      @click="openModal"
    >
      <img
        :src="backdropSrc"
        class="block h-[124px] w-full object-cover"
        :alt="movie.title"
        loading="lazy"
      />
      <div
        v-if="movie.vote_average >= 7.5"
        class="absolute right-[5px] top-[5px] flex flex-col items-center rounded-[2px] bg-[#e50914] px-[5px] py-[2px] leading-none"
      >
        <span class="text-[6px] font-black text-white">TOP</span>
        <span class="text-[11px] font-black text-white">10</span>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="popup">
        <div
          v-if="showPopup"
          class="pointer-events-auto overflow-hidden rounded-lg bg-[#181818] shadow-[0_12px_60px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08)]"
          :style="popupStyle"
          @mouseenter="cancelClose"
          @mouseleave="endHover"
          @click.stop
        >
          <!-- Video / thumbnail area -->
          <div class="relative h-[158px] w-full bg-black">
            <!-- Thumbnail shown while trailer loads or if no trailer -->
            <img
              :src="backdropSrc"
              class="block h-full w-full object-cover transition-opacity duration-500"
              :class="trailerReady ? 'opacity-0' : 'opacity-100'"
              :alt="movie.title"
            />

            <!-- YouTube iframe — only mounted when popup is open -->
            <iframe
              v-if="trailerKey"
              :src="`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${trailerKey}&rel=0&iv_load_policy=3&disablekb=1`"
              class="absolute inset-0 h-full w-full transition-opacity duration-500"
              :class="trailerReady ? 'opacity-100' : 'opacity-0'"
              allow="autoplay; encrypted-media"
              allowfullscreen
              frameborder="0"
              title="trailer"
              @load="trailerReady = true"
            />

            <!-- Loading spinner while fetching trailer key -->
            <div
              v-if="loadingTrailer && !trailerKey"
              class="absolute inset-0 flex items-center justify-center"
            >
              <svg
                class="animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                width="24"
                height="24"
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
              class="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#181818] to-transparent"
            ></div>
          </div>

          <!-- Info -->
          <div class="px-[14px] pb-[14px] pt-[10px]">
            <div class="mb-[10px] flex items-center gap-[6px]">
              <button
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-white bg-white p-0"
                @click="openModal"
              >
                <svg viewBox="0 0 24 24" fill="black" width="16" height="16">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <button
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/40 bg-[#282828]/95 p-0 transition-colors duration-150 hover:border-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2.5"
                  width="14"
                  height="14"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <button
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/40 bg-[#282828]/95 p-0 transition-colors duration-150 hover:border-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  width="14"
                  height="14"
                >
                  <path
                    d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"
                  />
                  <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                </svg>
              </button>
              <div class="flex-1"></div>
              <button
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] border-white/40 bg-[#282828]/95 p-0 transition-colors duration-150 hover:border-white"
                @click="openModal"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2.5"
                  width="14"
                  height="14"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
            <p class="mb-[6px] truncate text-[13px] font-bold text-white">
              {{ movie.title }}
            </p>
            <div class="mb-[7px] flex flex-wrap items-center gap-[7px]">
              <span class="text-xs font-bold text-[#46d369]"
                >{{ matchPercent }}% Match</span
              >
              <span class="text-xs text-[#bcbcbc]">{{ releaseYear }}</span>
              <span
                class="rounded-[2px] border border-white/40 px-1 text-[10px] leading-relaxed text-[#bcbcbc]"
                >HD</span
              >
            </div>
            <div class="flex flex-wrap gap-[2px] text-[11px] text-[#bcbcbc]">
              <span v-for="(g, i) in genres" :key="i">
                <span v-if="i > 0" class="mx-1 text-[#555]">·</span>{{ g }}
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
const props = defineProps({ movie: Object, rank: Number });
const config = useRuntimeConfig();
const imageUrl = config.public.tmdbImageUrl;
const emit = defineEmits(["open"]);

const cardRef = ref(null);
const showPopup = ref(false);
const popupPos = ref({ top: 0, left: 0 });
const trailerKey = ref(null);
const trailerReady = ref(false);
const loadingTrailer = ref(false);

let hoverTimer = null;
let closeTimer = null;
const POPUP_WIDTH = 290;

const openModal = () => {
  showPopup.value = false;
  emit("open", props.movie);
};

const fetchTrailer = async () => {
  if (trailerKey.value) return; // already fetched
  loadingTrailer.value = true;
  try {
    const res = await fetch(
      `${config.public.tmdbBaseUrl}/movie/${props.movie.id}/videos?api_key=${config.public.tmdbApiKey}`,
    );
    const data = await res.json();
    const trailer =
      data.results?.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
      data.results?.find((v) => v.site === "YouTube");
    trailerKey.value = trailer?.key || null;
  } catch {
    trailerKey.value = null;
  } finally {
    loadingTrailer.value = false;
  }
};

const startHover = () => {
  clearTimeout(closeTimer);
  hoverTimer = setTimeout(() => {
    if (!cardRef.value) return;
    const rect = cardRef.value.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let left = rect.left + scrollX + rect.width / 2 - POPUP_WIDTH / 2;
    left = Math.max(
      8,
      Math.min(left, window.innerWidth + scrollX - POPUP_WIDTH - 8),
    );

    const popupHeight = 310;
    const top = rect.top + scrollY + rect.height / 2 - popupHeight / 2;

    popupPos.value = { top, left };
    trailerReady.value = false;
    showPopup.value = true;
    fetchTrailer();
  }, 500); // 500ms delay like Netflix
};

const endHover = () => {
  clearTimeout(hoverTimer);
  closeTimer = setTimeout(() => {
    showPopup.value = false;
    trailerReady.value = false;
  }, 200);
};

const cancelClose = () => clearTimeout(closeTimer);

const popupStyle = computed(() => ({
  position: "absolute",
  top: `${popupPos.value.top}px`,
  left: `${popupPos.value.left}px`,
  width: `${POPUP_WIDTH}px`,
  zIndex: 9999,
}));

const backdropSrc = computed(() => {
  if (props.movie?.backdrop_path)
    return `${imageUrl}${props.movie.backdrop_path}`;
  if (props.movie?.poster_path) return `${imageUrl}${props.movie.poster_path}`;
  return "";
});

const matchPercent = computed(() =>
  Math.min(99, Math.floor(60 + (props.movie?.vote_average || 7) * 4)),
);

const releaseYear = computed(
  () => props.movie?.release_date?.slice(0, 4) || "",
);

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  27: "Horror",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const genres = computed(() =>
  (props.movie?.genre_ids || [])
    .slice(0, 3)
    .map((id) => genreMap[id])
    .filter(Boolean),
);
</script>

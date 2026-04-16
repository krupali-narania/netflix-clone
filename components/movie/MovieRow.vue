<template>
  <div class="mb-9 px-[4%]">
    <h2
      v-if="title"
      class="mb-[10px] text-xl font-bold tracking-[0.3px] text-[#e5e5e5]"
    >
      {{ title }}
    </h2>

    <!-- Row wrapper with relative positioning for arrows -->
    <div class="group/row relative">
      <!-- Left arrow -->
      <button
        v-if="canScrollLeft"
        class="absolute left-0 top-0 z-10 flex h-full w-10 -translate-x-full items-center justify-center bg-black/50 opacity-0 transition-all duration-200 group-hover/row:opacity-100 hover:bg-black/80 border-none cursor-pointer"
        @click="scroll('left')"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2.5"
          width="20"
          height="20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 18l-6-6 6-6"
          />
        </svg>
      </button>

      <!-- Scrollable track -->
      <div
        ref="trackRef"
        class="scrollbar-hide flex gap-[5px] overflow-x-auto overflow-y-visible pb-1 pt-[10px] mt-[-10px]"
        @scroll="updateScrollState"
      >
        <MovieCard
          v-for="(movie, index) in movies"
          :key="movie.id"
          :movie="movie"
          :rank="index + 1"
          @open="openMovie"
        />
      </div>

      <!-- Right arrow -->
      <button
        v-if="canScrollRight"
        class="absolute right-0 top-0 z-10 flex h-full w-10 translate-x-full items-center justify-center bg-black/50 opacity-0 transition-all duration-200 group-hover/row:opacity-100 hover:bg-black/80 border-none cursor-pointer"
        @click="scroll('right')"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2.5"
          width="20"
          height="20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 18l6-6-6-6"
          />
        </svg>
      </button>
    </div>

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
import MovieCard from "~/components/movie/MovieCard.vue";
import MovieModal from "~/components/movie/MovieModal.vue";

defineProps({ title: String, movies: Array });

const selectedMovie = ref(null);
const trackRef = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

const openMovie = (movie) => {
  selectedMovie.value = movie;
};

const updateScrollState = () => {
  if (!trackRef.value) return;
  const { scrollLeft, scrollWidth, clientWidth } = trackRef.value;
  canScrollLeft.value = scrollLeft > 0;
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 1;
};

const scroll = (dir) => {
  if (!trackRef.value) return;
  trackRef.value.scrollBy({
    left: dir === "right" ? 700 : -700,
    behavior: "smooth",
  });
};

onMounted(() => updateScrollState());
</script>

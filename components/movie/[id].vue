<template>
  <div
    class="min-h-screen bg-[#141414] flex flex-col items-center justify-center p-10"
  >
    <div v-if="loading" class="text-white text-xl">Loading trailer...</div>

    <div v-else-if="!trailer" class="text-center">
      <p class="text-[#aaa] text-lg mb-2">No trailer found.</p>
      <p class="text-[#555] text-sm mb-6">Movie ID: {{ route.params.id }}</p>
      <button
        class="bg-[#e50914] hover:bg-[#f40612] text-white font-bold px-6 py-3 rounded cursor-pointer transition-colors border-none"
        @click="$router.back()"
      >
        Go Back
      </button>
    </div>

    <div v-else class="w-full max-w-5xl">
      <button
        class="mb-6 flex items-center gap-2 text-[#aaa] hover:text-white transition-colors cursor-pointer bg-transparent border-none"
        @click="$router.back()"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          width="18"
          height="18"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </button>

      <iframe
        width="100%"
        height="560"
        :src="`https://www.youtube.com/embed/${trailer.key}?autoplay=1`"
        title="Movie Trailer"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
        "
        allowfullscreen
        class="rounded-lg"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: "auth" });

const route = useRoute();
const config = useRuntimeConfig();

const loading = ref(true);
const trailer = ref(null);

onMounted(async () => {
  try {
    const url = `${config.public.tmdbBaseUrl}/movie/${route.params.id}/videos`;
    console.log("[trailer] fetching:", url);

    const res = await fetch(`${url}?api_key=${config.public.tmdbApiKey}`);
    const data = await res.json();

    console.log("[trailer] response:", data);

    trailer.value =
      data.results?.find((v) => v.type === "Trailer" && v.site === "YouTube") ??
      null;

    console.log("[trailer] found:", trailer.value);
  } catch (err) {
    console.error("[trailer] error:", err);
  } finally {
    loading.value = false;
  }
});
</script>

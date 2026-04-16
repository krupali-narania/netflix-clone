<template>
  <nav
    class="fixed top-0 z-[100] flex h-[68px] w-full items-center justify-between px-[4%] transition-colors duration-300"
    :class="
      scrolled
        ? 'bg-[#141414]'
        : 'bg-gradient-to-b from-black/90 to-transparent'
    "
  >
    <div class="flex items-center gap-[25px]">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        class="h-7 flex-shrink-0"
        alt="Netflix"
      />
      <ul class="hidden items-center gap-[18px] text-sm text-[#e5e5e5] lg:flex">
        <li
          class="cursor-pointer transition-colors duration-200"
          :class="
            route.path === '/'
              ? 'font-semibold text-white'
              : 'hover:text-[#b3b3b3]'
          "
          @click="$router.push('/')"
        >
          Home
        </li>
        <li
          class="cursor-pointer transition-colors duration-200 hover:text-[#b3b3b3]"
          @click="$router.push('/shows')"
        >
          Shows
        </li>
        <li
          class="cursor-pointer transition-colors duration-200"
          :class="
            route.path === '/movies'
              ? 'font-semibold text-white'
              : 'hover:text-[#b3b3b3]'
          "
          @click="$router.push('/movies')"
        >
          Movies
        </li>
        <li
          class="cursor-pointer transition-colors duration-200 hover:text-[#b3b3b3]"
          @click="$router.push('/')"
        >
          Games
        </li>
        <li
          class="cursor-pointer transition-colors duration-200 hover:text-[#b3b3b3]"
          @click="$router.push('/')"
        >
          New & Popular
        </li>
        <li
          class="cursor-pointer transition-colors duration-200 hover:text-[#b3b3b3]"
          @click="$router.push('/')"
        >
          My List
        </li>
        <li
          class="cursor-pointer transition-colors duration-200 hover:text-[#b3b3b3]"
          @click="$router.push('/')"
        >
          Browse by Languages
        </li>
      </ul>
    </div>

    <div class="flex items-center gap-[18px]">
      <div class="flex items-center gap-2">
        <button class="flex items-center p-0 text-white" @click="toggleSearch">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </button>
        <input
          v-if="searchOpen"
          ref="searchInput"
          v-model="query"
          placeholder="Titles, people, genres"
          class="w-[200px] border border-white bg-black/75 px-[10px] py-1 text-[13px] text-white outline-none"
          @keyup.enter="search"
        />
      </div>

      <span class="hidden cursor-pointer text-[13px] text-[#e5e5e5] md:inline"
        >Children</span
      >

      <button class="flex items-center p-0 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="20"
          height="20"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0"
          />
        </svg>
      </button>

      <div
        class="relative flex cursor-pointer items-center gap-1"
        @click="showProfileMenu = !showProfileMenu"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded bg-[#e5a00d]"
        >
          <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
            <path
              d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
            />
          </svg>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="12"
          height="12"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
        <div
          v-if="showProfileMenu"
          class="absolute right-0 top-[calc(100%+10px)] min-w-[180px] rounded border border-white/15 bg-black/90 py-2"
        >
          <div
            v-if="auth.user"
            class="flex cursor-pointer items-center gap-2 whitespace-nowrap px-4 py-[10px] text-[13px] text-[#e5e5e5] hover:bg-white/10"
            @click="logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              width="16"
              height="16"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign out of Netflix
          </div>
          <div
            v-else
            class="cursor-pointer whitespace-nowrap px-4 py-[10px] text-[13px] text-[#e5e5e5] hover:bg-white/10"
            @click="$router.push('/login')"
          >
            Sign In
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const scrolled = ref(false);
const searchOpen = ref(false);
const showProfileMenu = ref(false);
const query = ref("");
const searchInput = ref(null);

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrolled.value = window.scrollY > 50;
  });
});

const toggleSearch = async () => {
  searchOpen.value = !searchOpen.value;
  if (searchOpen.value) {
    await nextTick();
    searchInput.value?.focus();
  }
};
const search = () => {
  if (query.value.trim()) {
    router.push(`/search?q=${query.value}`);
    searchOpen.value = false;
    query.value = "";
  }
};
const logout = () => {
  auth.logout();
  router.push("/");
};
</script>

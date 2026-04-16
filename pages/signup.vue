<template>
  <div class="bg-black min-h-screen text-white font-sans">
    <!-- ── HERO ── -->
    <section class="relative min-h-screen flex flex-col overflow-hidden">
      <!-- Mosaic background -->
      <div
        class="absolute inset-0 z-0 grid grid-cols-5 grid-rows-4 gap-[3px] -skew-y-2 scale-105"
      >
        <div
          v-for="(movie, i) in mosaicMovies"
          :key="i"
          class="bg-cover bg-center bg-[#111]"
          :style="
            movie?.poster_path
              ? { backgroundImage: `url(${imageUrl}${movie.poster_path})` }
              : {}
          "
        ></div>
      </div>

      <!-- Overlays -->
      <div class="absolute inset-0 z-[1] bg-black/60"></div>
      <div
        class="absolute bottom-0 left-0 right-0 z-[2] h-[300px] bg-gradient-to-t from-black via-black/90 to-transparent"
      ></div>

      <!-- Arc -->
      <div
        class="absolute bottom-[-1px] left-0 right-0 z-[4] overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 50"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          class="block w-full h-[50px]"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="transparent" />
              <stop offset="30%" stop-color="#b00610" />
              <stop offset="50%" stop-color="#e50914" />
              <stop offset="70%" stop-color="#b00610" />
              <stop offset="100%" stop-color="transparent" />
            </linearGradient>
          </defs>
          <path d="M0,20 Q720,55 1440,20 L1440,50 L0,50 Z" fill="#000" />
          <path
            d="M0,20 Q720,55 1440,20"
            fill="none"
            stroke="url(#arcGrad)"
            stroke-width="1"
            filter="url(#glow)"
          />
        </svg>
      </div>

      <!-- Navbar -->
      <nav
        class="relative z-10 flex items-center justify-between px-[10%] py-6"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          class="h-[34px]"
          alt="Netflix"
        />
        <div class="flex items-center gap-3">
          <!-- Language select -->
          <div
            class="flex items-center gap-1.5 border border-white/50 px-3 py-1.5 rounded-sm text-white text-sm"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              />
            </svg>
            <select
              class="bg-transparent border-none text-white text-sm cursor-pointer outline-none"
            >
              <option class="text-black">English</option>
              <option class="text-black">हिन्दी</option>
            </select>
            <!-- <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12">
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg> -->
          </div>
          <button
            class="bg-[#e50914] hover:bg-[#f40612] text-white font-bold px-[18px] py-2 text-sm rounded-sm border-none cursor-pointer transition-colors"
            @click="$router.push('/login')"
          >
            Sign In
          </button>
        </div>
      </nav>

      <!-- Hero content -->
      <div
        class="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 pb-[120px]"
      >
        <h1 class="text-[clamp(34px,5.5vw,58px)] font-black leading-tight mb-5">
          Unlimited movies,<br />shows, and more
        </h1>
        <p class="text-[22px] font-medium mb-3">
          Starts at ₹149. Cancel at any time.
        </p>
        <p class="text-[17px] text-[#eee] mb-5">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form
          class="flex w-full max-w-[580px] flex-col gap-2 sm:flex-row"
          @submit.prevent="startSignup"
        >
          <input
            v-model="heroEmail"
            type="email"
            placeholder="Email address"
            class="flex-1 bg-black/80 border border-white/35 text-white px-[18px] py-[17px] text-base outline-none placeholder-[#999]"
          />
          <button
            type="submit"
            class="flex items-center gap-2 bg-[#e50914] hover:bg-[#f40612] text-white font-bold px-[26px] py-[17px] text-lg border-none cursor-pointer whitespace-nowrap transition-colors"
          >
            Get Started
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              width="14"
              height="14"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </form>
      </div>
    </section>

    <!-- ── TRENDING ── -->
    <section class="bg-black py-5">
      <div class="relative px-[10%]">
        <h2 class="text-xl font-bold mb-3 tracking-wide">Trending Now</h2>
        <div class="flex items-center gap-2">
          <!-- Left arrow — outside the track -->
          <button
            class="flex-shrink-0 w-8 h-[120px] bg-[#141414]/85 hover:bg-[#282828]/95 border-none cursor-pointer flex items-center justify-center rounded-r transition-colors"
            @click="scrollTrending(-1)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2.5"
              width="18"
              height="18"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 18l-6-6 6-6"
              />
            </svg>
          </button>
          <!-- Spacer so track stays left-aligned when left arrow is hidden -->
          <div v-show="scrollLeft === 0" class="flex-shrink-0 w-8"></div>

          <!-- Track -->
          <div
            ref="trendingTrack"
            class="scrollbar-hide flex gap-0 overflow-x-scroll overflow-y-hidden"
          >
            <div
              v-for="(movie, i) in trendingMovies"
              :key="movie.id"
              class="relative flex-shrink-0 cursor-pointer"
              :style="{
                paddingLeft: i === 0 ? '0' : '30px',
                boxSizing: 'content-box',
              }"
            >
              <!-- Number — outlined text, handled via inline style (webkit-text-stroke not in Tailwind) -->
              <img
                :src="imageUrl + movie.poster_path"
                :alt="movie.title"
                class="relative z-[2] w-[155px] h-[225px] object-cover rounded-md block transition-transform duration-200 hover:scale-105"
              />
              <span
                v-if="i > -1"
                class="text-stroke-trending pointer-events-none absolute bottom-0 left-[-4px] z-[2] select-none text-[140px] font-black leading-none tracking-[-6px] text-[#0a0a0a]"
                >{{ i + 1 }}</span
              >
            </div>
          </div>

          <!-- Right arrow — outside the track -->
          <button
            class="flex-shrink-0 w-8 h-[120px] bg-[#141414]/85 hover:bg-[#282828]/95 border-none cursor-pointer flex items-center justify-center rounded-l transition-colors"
            @click="scrollTrending(1)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2.5"
              width="18"
              height="18"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 18l6-6-6-6"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- ── MORE REASONS ── -->
    <section class="bg-black py-[50px]">
      <div class="max-w-[1200px] mx-auto px-[4%]">
        <h2 class="text-[32px] font-extrabold mb-6 tracking-wide">
          More reasons to join
        </h2>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="r in reasons"
            :key="r.title"
            class="rounded-lg p-7 flex flex-col justify-between min-h-[220px] overflow-hidden"
            :style="{ background: r.bg }"
          >
            <div>
              <h3 class="text-[22px] font-extrabold leading-tight mb-3">
                {{ r.title }}
              </h3>
              <p class="text-sm text-[#ccc] leading-relaxed">{{ r.desc }}</p>
            </div>
            <img
              :src="r.img"
              :alt="r.title"
              class="w-[68px] h-[68px] object-contain self-end mt-4"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ── FAQ ── -->
    <section class="bg-black py-[50px] pb-[60px]">
      <div class="max-w-[820px] mx-auto px-[4%]">
        <h2 class="text-[32px] font-extrabold mb-6 text-center tracking-wide">
          Frequently Asked Questions
        </h2>
        <div class="flex flex-col gap-2 mb-10">
          <div v-for="(f, i) in faqs" :key="i" class="bg-[#2d2d2d]">
            <button
              class="w-full flex items-center justify-between px-[26px] py-[22px] bg-transparent border-none text-white text-xl text-left cursor-pointer gap-4 hover:bg-[#404040] transition-colors"
              @click="openFaq = openFaq === i ? null : i"
            >
              <span>{{ f.q }}</span>
              <svg
                class="flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="32"
                height="32"
              >
                <path v-if="openFaq === i" d="M19 13H5v-2h14v2z" />
                <path v-else d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </button>
            <transition name="faq-slide">
              <div
                v-if="openFaq === i"
                class="px-[26px] pb-[22px] pt-0.5 text-[18px] text-[#ddd] leading-relaxed border-t-2 border-[#111]"
              >
                {{ f.a }}
              </div>
            </transition>
          </div>
        </div>
        <p class="text-center text-base mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form
          class="mt-3 flex flex-col justify-center gap-2 sm:flex-row"
          @submit.prevent="startSignup"
        >
          <input
            v-model="heroEmail"
            type="email"
            placeholder="Email address"
            class="flex-1 max-w-xs bg-[#333] border border-[#555] text-white px-[18px] py-[17px] text-base outline-none placeholder-[#999]"
          />
          <button
            type="submit"
            class="flex items-center gap-2 bg-[#e50914] hover:bg-[#f40612] text-white font-bold px-[26px] py-[17px] text-lg border-none cursor-pointer whitespace-nowrap transition-colors"
          >
            Get Started
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              width="14"
              height="14"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </form>
      </div>
    </section>

    <!-- ── FOOTER ── -->
    <footer class="border-t border-white/5 px-[5%] py-7">
      <p class="text-sm text-[#737373] mb-4">
        Questions? Call <a href="#" class="underline">000-800-919-1743</a>
      </p>
      <div
        class="mb-4 grid max-w-[900px] grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-4"
      >
        <a
          v-for="l in footerLinks"
          :key="l"
          href="#"
          class="text-xs text-[#737373] hover:underline"
          >{{ l }}</a
        >
      </div>
      <div
        class="inline-flex items-center gap-2 border border-[#555] px-3 py-1.5 text-[#737373] rounded-sm mb-3"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
          />
        </svg>
        <select
          class="bg-transparent border-none text-[#737373] text-sm cursor-pointer outline-none"
        >
          <option>English</option>
          <option>हिन्दी</option>
        </select>
      </div>
      <p class="text-xs text-[#737373]">Netflix India</p>
    </footer>

    <!-- ── SIGNUP MODAL ── -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/75 z-[200] flex items-center justify-center p-5"
          @click.self="showModal = false"
        >
          <div class="bg-black w-full max-w-[460px] rounded-lg overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between px-7 pt-7 pb-0">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                class="h-7"
                alt="Netflix"
              />
              <button
                class="bg-transparent border-none text-white cursor-pointer flex p-0"
                @click="showModal = false"
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
            </div>

            <!-- Step dots -->
            <div class="flex justify-center gap-[7px] pt-[22px]">
              <div
                v-for="i in 3"
                :key="i"
                class="w-[34px] h-[5px] rounded-[3px] transition-colors duration-300"
                :class="i <= step ? 'bg-white' : 'bg-[#444]'"
              ></div>
            </div>
            <p class="text-center text-xs text-[#777] mt-1.5">
              Step {{ step }} of 3
            </p>

            <!-- Body -->
            <div class="px-10 py-6">
              <!-- Step 1 -->
              <template v-if="step === 1">
                <h2 class="text-2xl font-extrabold mb-2">
                  Finish setting up<br />your account
                </h2>
                <p class="text-sm text-[#aaa] mb-5">
                  Netflix is personalized for you. Create a password to start
                  watching Netflix.
                </p>
                <form @submit.prevent="goStep2" class="flex flex-col gap-4">
                  <div class="flex flex-col gap-1">
                    <input
                      v-model="email"
                      type="email"
                      placeholder="Email address"
                      class="w-full bg-[#333] border text-white px-4 py-4 text-base rounded outline-none transition-colors"
                      :class="
                        errors.email
                          ? 'border-[#e87c03]'
                          : 'border-[#444] focus:border-[#aaa]'
                      "
                    />
                    <p v-if="errors.email" class="text-[#e87c03] text-xs">
                      {{ errors.email }}
                    </p>
                  </div>
                  <button
                    type="submit"
                    class="w-full bg-[#e50914] hover:bg-[#f40612] text-white font-bold py-4 text-lg rounded border-none cursor-pointer transition-colors"
                  >
                    Next
                  </button>
                </form>
                <p class="text-sm text-[#aaa] mt-4">
                  Already have an account?
                  <a
                    class="text-white font-bold cursor-pointer hover:underline"
                    @click="
                      showModal = false;
                      $router.push('/login');
                    "
                    >Sign in.</a
                  >
                </p>
              </template>

              <!-- Step 2 -->
              <template v-else-if="step === 2">
                <button
                  class="flex items-center gap-1 bg-transparent border-none text-[#aaa] text-sm cursor-pointer mb-4 p-0 hover:text-white transition-colors"
                  @click="step = 1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    width="15"
                    height="15"
                  >
                    <path d="M15 18l-6-6 6-6" /></svg
                  >Back
                </button>
                <h2 class="text-2xl font-extrabold mb-2">Create a password</h2>
                <p class="text-sm text-[#aaa] mb-5">
                  Just a few more steps and you're done!
                </p>
                <form @submit.prevent="goStep3" class="flex flex-col gap-4">
                  <div class="flex flex-col gap-1">
                    <input
                      v-model="name"
                      type="text"
                      placeholder="Full Name"
                      class="w-full bg-[#333] border text-white px-4 py-4 text-base rounded outline-none transition-colors"
                      :class="
                        errors.name
                          ? 'border-[#e87c03]'
                          : 'border-[#444] focus:border-[#aaa]'
                      "
                    />
                    <p v-if="errors.name" class="text-[#e87c03] text-xs">
                      {{ errors.name }}
                    </p>
                  </div>
                  <div class="flex flex-col gap-1">
                    <div class="relative">
                      <input
                        v-model="password"
                        :type="showPw ? 'text' : 'password'"
                        placeholder="Add a password"
                        class="w-full bg-[#333] border text-white px-4 py-4 pr-[68px] text-base rounded outline-none transition-colors"
                        :class="
                          errors.password
                            ? 'border-[#e87c03]'
                            : 'border-[#444] focus:border-[#aaa]'
                        "
                      />
                      <button
                        type="button"
                        class="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#aaa] text-[11px] font-bold tracking-widest cursor-pointer"
                        @click="showPw = !showPw"
                      >
                        {{ showPw ? "HIDE" : "SHOW" }}
                      </button>
                    </div>
                    <p v-if="errors.password" class="text-[#e87c03] text-xs">
                      {{ errors.password }}
                    </p>
                    <div v-if="password" class="mt-2">
                      <div class="flex gap-1 mb-1">
                        <div
                          v-for="i in 4"
                          :key="i"
                          class="flex-1 h-[3px] rounded-sm transition-colors duration-300"
                          :style="{
                            background: i <= pwStrength ? pwColor : '#444',
                          }"
                        ></div>
                      </div>
                      <p class="text-[11px]" :style="{ color: pwColor }">
                        {{ pwLabel }}
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="w-full bg-[#e50914] hover:bg-[#f40612] text-white font-bold py-4 text-lg rounded border-none cursor-pointer transition-colors"
                  >
                    Next
                  </button>
                </form>
              </template>

              <!-- Step 3 -->
              <template v-else-if="step === 3">
                <button
                  class="flex items-center gap-1 bg-transparent border-none text-[#aaa] text-sm cursor-pointer mb-4 p-0 hover:text-white transition-colors"
                  @click="step = 2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    width="15"
                    height="15"
                  >
                    <path d="M15 18l-6-6 6-6" /></svg
                  >Back
                </button>
                <h2 class="text-2xl font-extrabold mb-2">Choose how to pay</h2>
                <p class="text-sm text-[#aaa] mb-5">
                  Your payment is encrypted and you can change how you pay
                  anytime.
                </p>

                <div class="bg-[#2b2b2b] border border-[#444] rounded p-5 mb-4">
                  <div
                    v-for="(row, i) in [
                      ['Name', name],
                      ['Email', email],
                      ['Plan', 'Standard with Ads — ₹149/mo'],
                    ]"
                    :key="i"
                    class="flex justify-between text-sm py-1.5"
                    :class="i === 2 ? 'border-t border-[#444] mt-1.5 pt-3' : ''"
                  >
                    <span class="text-[#aaa]">{{ row[0] }}</span>
                    <span class="max-w-[200px] truncate">{{ row[1] }}</span>
                  </div>
                </div>

                <div
                  v-if="signupErr"
                  class="bg-[#e87c03]/15 border border-[#e87c03]/50 rounded p-3 text-sm text-[#f5a623] mb-4"
                >
                  {{ signupErr }}
                </div>

                <button
                  class="w-full bg-[#e50914] hover:bg-[#f40612] disabled:bg-[#7a0007] text-white font-bold py-4 text-lg rounded border-none cursor-pointer transition-colors flex items-center justify-center gap-2"
                  @click="handleSignup"
                  :disabled="loading"
                >
                  <svg
                    v-if="loading"
                    class="animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    width="18"
                    height="18"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="rgba(255,255,255,.3)"
                      stroke-width="4"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="white"
                      stroke-width="4"
                      stroke-linecap="round"
                    />
                  </svg>
                  {{ loading ? "Creating account..." : "Start Membership" }}
                </button>
                <p
                  class="text-[11px] text-[#666] text-center mt-3 leading-relaxed"
                >
                  By clicking "Start Membership", you agree to our
                  <a href="#" class="text-[#aaa] underline">Terms of Use</a> and
                  <a href="#" class="text-[#aaa] underline">Privacy Statement</a
                  >.
                </p>
              </template>
            </div>

            <p class="text-xs text-[#8c8c8c] px-7 pb-5 leading-loose">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
              <a href="#" class="text-white font-bold hover:underline"
                >Learn more</a
              >
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
definePageMeta({ layout: false });

const router = useRouter();
const config = useRuntimeConfig();
const auth = useAuthStore();
const imageUrl = config.public.tmdbImageUrl;

const mosaicMovies = ref(Array(20).fill(null));
const trendingMovies = ref([]);

const { getTrendingMovies, getPopularMovies } = useMovies();
const [td, pd] = await Promise.all([getTrendingMovies(), getPopularMovies()]);
const all = [...(td?.value?.results || []), ...(pd?.value?.results || [])];
all.slice(0, 20).forEach((m, i) => {
  mosaicMovies.value[i] = m;
});
trendingMovies.value = all.slice(0, 10);

const trendingTrack = ref(null);
const scrollTrending = (dir) =>
  trendingTrack.value?.scrollBy({ left: dir * 320, behavior: "smooth" });

const showModal = ref(false);
const heroEmail = ref("");
const step = ref(1);
const email = ref("");
const name = ref("");
const password = ref("");
const showPw = ref(false);
const loading = ref(false);
const signupErr = ref("");
const errors = ref({ email: "", name: "", password: "" });
const openFaq = ref(null);

const startSignup = () => {
  email.value = heroEmail.value;
  step.value = 1;
  showModal.value = true;
};

const pwStrength = computed(() => {
  const p = password.value;
  if (!p) return 0;
  return [
    p.length >= 8,
    /[A-Z]/.test(p),
    /[0-9]/.test(p),
    /[^A-Za-z0-9]/.test(p),
  ].filter(Boolean).length;
});
const pwColor = computed(
  () => ["", "#ef4444", "#f97316", "#eab308", "#22c55e"][pwStrength.value],
);
const pwLabel = computed(
  () => ["", "Weak", "Fair", "Good", "Strong"][pwStrength.value],
);

const goStep2 = () => {
  errors.value.email = "";
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = "Please enter a valid email address.";
    return;
  }
  step.value = 2;
};
const goStep3 = () => {
  errors.value.name = "";
  errors.value.password = "";
  let ok = true;
  if (!name.value.trim()) {
    errors.value.name = "Please enter your name.";
    ok = false;
  }
  if (!password.value || password.value.length < 4) {
    errors.value.password = "Password must be at least 4 characters.";
    ok = false;
  }
  if (ok) step.value = 3;
};
const handleSignup = async () => {
  signupErr.value = "";
  loading.value = true;
  try {
    await auth.signup(name.value, email.value, password.value);
    showModal.value = false;
    router.push("/");
  } catch (e) {
    signupErr.value = e.message || "Something went wrong.";
    step.value = 2;
  } finally {
    loading.value = false;
  }
};

const reasons = [
  {
    title: "Enjoy on your TV",
    desc: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU9fFsS4wdBcaZ6-yvDMIMa0m67P6MbQtwnA&s",
    bg: "linear-gradient(135deg,#1a1a3e 0%,#0d0d1a 100%)",
  },
  {
    title: "Download your shows to watch offline",
    desc: "Save your favourites easily and always have something to watch.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRrvzCXsgyXS6xMs4TW77XJOcNRGzPdUgjvQ&s",
    bg: "linear-gradient(135deg,#1a1a3e 0%,#0d0d1a 100%)",
  },
  {
    title: "Watch everywhere",
    desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    img: "https://cdn-icons-png.flaticon.com/512/4221/4221419.png",
    bg: "linear-gradient(135deg,#1a1a3e 0%,#0d0d1a 100%)",
  },
  {
    title: "Create profiles for kids",
    desc: "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6IWRetXXe5WQZNJskv4LnO6H3buSI7u0XtA&s",
    bg: "linear-gradient(135deg,#1a1a3e 0%,#0d0d1a 100%)",
  },
];
const faqs = [
  {
    q: "What is Netflix?",
    a: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.",
  },
  {
    q: "How much does Netflix cost?",
    a: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans start at ₹149/month.",
  },
  {
    q: "Where can I watch?",
    a: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app.",
  },
  {
    q: "How do I cancel?",
    a: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.",
  },
  {
    q: "What can I watch on Netflix?",
    a: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.",
  },
  {
    q: "Is Netflix good for kids?",
    a: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.",
  },
];
const footerLinks = [
  "FAQ",
  "Investor Relations",
  "Privacy",
  "Speed Test",
  "Help Centre",
  "Jobs",
  "Cookie Preferences",
  "Legal Notices",
  "Account",
  "Ways to Watch",
  "Corporate Information",
  "Only on Netflix",
  "Media Centre",
  "Terms of Use",
  "Contact Us",
];

useHead({
  title: "Netflix India - Watch TV Shows Online, Watch Movies Online",
});
</script>

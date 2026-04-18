<template>
  <div class="relative flex min-h-screen flex-col font-sans text-white">
    <img
      src="https://occ.a.nflxso.net/dnm/api/v6/iMyKkw5SVrkCXbCfSBEb_Pjar5Y/AAAAQBTxE26zgLJoqZnmxUCfZtVJ2HbJUsVonZ_9Uo-pn68zarPK.png"
      class="absolute inset-0 z-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 z-0 bg-black/60"></div>

    <header class="relative z-[1] px-[10%] py-[18px]">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        class="h-[34px] cursor-pointer"
        alt="Netflix"
        @click="$router.push('/')"
      />
    </header>

    <main
      class="relative z-[1] flex flex-1 items-center justify-center px-5 py-10"
    >
      <div class="w-full max-w-[460px] bg-black/10 px-8 py-12 md:px-[42px]">
        <template v-if="step === 1">
          <h1 class="mb-6 text-[32px] font-extrabold">Sign In</h1>

          <form @submit.prevent="goStep2" class="mb-5 flex flex-col gap-3">
            <div class="relative flex flex-col">
              <input
                v-model="email"
                type="text"
                placeholder="Email or mobile number"
                autocomplete="email"
                class="w-full rounded-[6px] border bg-[#222] px-[18px] py-[18px] text-base text-white outline-none transition-colors placeholder:text-[#888]"
                :class="
                  errors.email
                    ? 'border-[#e87c03]'
                    : 'border-[#444] focus:border-[#888]'
                "
              />
              <p
                v-if="errors.email"
                class="mt-[5px] pl-[2px] text-xs text-[#e87c03]"
              >
                {{ errors.email }}
              </p>
            </div>
            <button
              type="submit"
              class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] border-none bg-[#e50914] p-[18px] text-lg font-bold text-white transition-colors duration-200 hover:bg-[#f40612] disabled:cursor-not-allowed disabled:bg-[#7a0007]"
            >
              Continue
            </button>
          </form>

          <div
            class="mb-3 inline-flex cursor-pointer select-none items-center gap-1.5 text-base"
            @click="helpOpen = !helpOpen"
          >
            <span>Get Help</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              width="16"
              height="16"
              class="transition-transform duration-200"
              :class="helpOpen ? 'rotate-180' : ''"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <div v-if="helpOpen" class="flex flex-col gap-[10px] pb-1 pt-3">
            <a
              href="#"
              class="text-[15px] text-[#aaa] no-underline hover:text-white hover:underline"
              >Forgotten password?</a
            >
            <a
              href="#"
              class="text-[15px] text-[#aaa] no-underline hover:text-white hover:underline"
              >Use a sign-in code</a
            >
          </div>

          <p class="mt-6 text-base text-[#737373]">
            New to Netflix?
            <button
              type="button"
              class="border-none bg-transparent p-0 font-semibold text-white cursor-pointer hover:underline"
              @click="$router.push('/signup')"
            >
              Sign up now.
            </button>
          </p>

          <p class="mt-6 text-xs leading-[1.7] text-[#666]">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <a
              href="#"
              class="font-bold text-[#aaa] no-underline hover:underline"
              >Learn more</a
            >
          </p>
        </template>

        <template v-else-if="step === 2">
          <button
            class="mb-[18px] inline-flex items-center gap-1.5 bg-transparent p-0 text-[13px] text-[#aaa] transition-colors duration-200 hover:text-white"
            @click="step = 1"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              width="16"
              height="16"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </button>

          <h1 class="mb-6 text-[32px] font-extrabold">Sign In</h1>
          <p class="-mt-[10px] mb-5 text-[15px] text-[#aaa]">{{ email }}</p>

          <div
            v-if="loginError"
            class="mb-4 flex items-start gap-2 rounded border border-[#e87c03]/50 bg-[#e87c03]/15 px-[14px] py-3 text-sm leading-[1.5] text-[#f5a623]"
          >
            <svg viewBox="0 0 24 24" fill="#e50914" width="16" height="16">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            </svg>
            {{ loginError }}
          </div>

          <form @submit.prevent="handleLogin" class="mb-5 flex flex-col gap-3">
            <div class="relative flex flex-col">
              <input
                v-model="password"
                :type="showPw ? 'text' : 'password'"
                placeholder="Password"
                autocomplete="current-password"
                class="w-full rounded-[6px] border bg-[#222] px-[18px] py-[18px] pr-[72px] text-base text-white outline-none transition-colors placeholder:text-[#888]"
                :class="
                  errors.password
                    ? 'border-[#e87c03]'
                    : 'border-[#444] focus:border-[#888]'
                "
              />
              <button
                type="button"
                class="absolute right-[14px] top-1/2 -translate-y-1/2 bg-transparent p-0 text-[11px] font-bold tracking-[1px] text-[#aaa]"
                @click="showPw = !showPw"
              >
                {{ showPw ? "HIDE" : "SHOW" }}
              </button>
              <p
                v-if="errors.password"
                class="mt-[5px] pl-[2px] text-xs text-[#e87c03]"
              >
                {{ errors.password }}
              </p>
            </div>
            <button
              type="submit"
              class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] border-none bg-[#e50914] p-[18px] text-lg font-bold text-white transition-colors duration-200 hover:bg-[#f40612] disabled:cursor-not-allowed disabled:bg-[#7a0007]"
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
              {{ loading ? "Signing in..." : "Sign In" }}
            </button>
          </form>

          <div class="mb-5 flex items-center justify-between">
            <label
              class="flex cursor-pointer items-center gap-[7px] text-sm text-[#aaa]"
            >
              <input
                type="checkbox"
                v-model="rememberMe"
                class="accent-[#e50914]"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              class="text-sm text-[#aaa] no-underline hover:text-white hover:underline"
              >Forgot password?</a
            >
          </div>

          <p class="mb-5 text-base text-[#737373]">
            New to Netflix?
            <button
              type="button"
              class="border-none bg-transparent p-0 font-semibold text-white cursor-pointer hover:underline"
              @click="$router.push('/signup')"
            >
              Sign up now.
            </button>
          </p>

          <p class="text-xs leading-[1.7] text-[#666]">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <a
              href="#"
              class="font-bold text-[#aaa] no-underline hover:underline"
              >Learn more</a
            >
          </p>
        </template>
      </div>
    </main>

    <footer
      class="relative z-[1] border-t border-white/5 bg-transparent px-[5%] py-7"
    >
      <div class="mx-auto max-w-[1000px]">
        <p class="mb-5 text-sm text-[#737373]">
          Questions? Call <a href="#" class="underline">000-800-919-1694</a>
        </p>
        <div class="mb-[18px] flex flex-wrap gap-y-[6px] gap-x-5">
          <a
            v-for="l in footerLinks"
            :key="l"
            href="#"
            class="text-[13px] text-[#737373] no-underline hover:text-[#aaa] hover:underline"
            >{{ l }}</a
          >
        </div>
        <div
          class="mb-[14px] inline-flex items-center gap-[7px] rounded-[2px] border border-[#555] px-3 py-1.5 text-[#737373]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
            />
          </svg>
          <select
            class="cursor-pointer bg-transparent text-[13px] text-[#737373] outline-none"
          >
            <option>English</option>
            <option>??????</option>
          </select>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({ layout: false });

const router = useRouter();
const auth = useAuthStore();

const step = ref(1);
const email = ref("");
const password = ref("");
const showPw = ref(false);
const rememberMe = ref(false);
const loading = ref(false);
const loginError = ref("");
const helpOpen = ref(false);
const errors = ref({ email: "", password: "" });

const goStep2 = () => {
  errors.value.email = "";
  if (!email.value.trim()) {
    errors.value.email = "Please enter a valid email or phone number.";
    return;
  }
  step.value = 2;
};

const handleLogin = async () => {
  errors.value.password = "";
  loginError.value = "";
  if (!password.value) {
    errors.value.password =
      "Your password must contain between 4 and 60 characters.";
    return;
  }
  loading.value = true;
  try {
    await auth.login(email.value, password.value);
    router.push("/browse");
  } catch (err) {
    loginError.value = err.message || "Incorrect password. Please try again.";
  } finally {
    loading.value = false;
  }
};

const footerLinks = [
  "FAQ",
  "Help Centre",
  "Terms of Use",
  "Privacy",
  "Cookie Preferences",
  "Corporate Information",
];
useHead({ title: "Netflix - Sign In" });
</script>

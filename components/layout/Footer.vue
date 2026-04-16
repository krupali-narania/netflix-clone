<template>
  <footer class="bg-[#141414] px-[10%] pt-10 pb-8 text-[#737373]">
    <!-- Social icons -->
    <div class="mb-6 flex items-center gap-5">
      <a
        href="#"
        aria-label="Facebook"
        class="transition-colors hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path
            d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
          />
        </svg>
      </a>
      <a
        href="#"
        aria-label="Instagram"
        class="transition-colors hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          width="24"
          height="24"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </a>
      <a
        href="#"
        aria-label="Twitter"
        class="transition-colors hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path
            d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
          />
        </svg>
      </a>
      <a
        href="#"
        aria-label="YouTube"
        class="transition-colors hover:text-white"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path
            d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"
          />
          <polygon
            points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
            fill="#141414"
          />
        </svg>
      </a>
    </div>

    <!-- Links grid — 4 columns like Netflix -->
    <div class="mb-6 grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-4">
      <a
        v-for="link in links"
        :key="link"
        href="#"
        class="text-[13px] transition-colors hover:text-white hover:underline"
        >{{ link }}</a
      >
    </div>

    <!-- Language selector -->
    <div
      class="mb-5 inline-flex items-center gap-2 border border-[#555] px-3 py-1.5 text-[#737373] rounded-sm"
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
        <option>हिन्दी</option>
      </select>
    </div>

    <p class="text-[13px]">
      © 1997–{{ new Date().getFullYear() }} Netflix, Inc.
    </p>
  </footer>
</template>

<script setup>
const links = [
  "Audio Description",
  "Help Centre",
  "Gift Cards",
  "Media Centre",
  "Investor Relations",
  "Jobs",
  "Terms of Use",
  "Privacy",
  "Legal Notices",
  "Cookie Preferences",
  "Corporate Information",
  "Contact Us",
];
</script>

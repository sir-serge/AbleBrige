<template>
  <div>
    <HeroSection />
    <section id="problem" class="bg-darker py-20 px-5">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
            THE PROBLEM WE ARE SOLVING
          </h1>
          <h2 class="text-2xl md:text-3xl font-semibold text-amber mb-8">
            Millions need help. No one is connecting them.
          </h2>
          <p
            class="text-lg text-light-green-text max-w-3xl mx-auto leading-relaxed"
          >
            Every year, millions of people with disabilities struggle to access
            essential assistive equipment. At the same time, countless families
            have unused wheelchairs, hearing aids, and mobility devices
            gathering dust at home. The gap between need and availability has
            never been wider.
          </p>
        </div>

        <!-- Problem Cards -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="problem-card">
            <div class="text-4xl mb-4 text-center">
              <svg
                class="w-10 h-10 mx-auto text-amber"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-amber mb-4 text-center">
              No Affordable Access
            </h3>
            <p class="text-light-green-text leading-relaxed text-center">
              Millions of people with disabilities in low-income countries
              cannot afford essential assistive equipment - wheelchairs, hearing
              aids, canes, and more.
            </p>
          </div>

          <div class="problem-card">
            <div class="text-4xl mb-4 text-center">
              <svg
                class="w-10 h-10 mx-auto text-amber"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-amber mb-4 text-center">
              Equipment Goes to Waste
            </h3>
            <p class="text-light-green-text leading-relaxed text-center">
              Recovered patients, caregivers, and families are left with
              equipment gathering dust at home. It ends up in landfill while
              others can do without.
            </p>
          </div>

          <div class="problem-card">
            <div class="text-4xl mb-4 text-center">
              <svg
                class="w-10 h-10 mx-auto text-amber"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                />
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-amber mb-4 text-center">
              No Trusted Channel
            </h3>
            <p class="text-light-green-text leading-relaxed text-center">
              There is no simple, safe, and trusted platform where donors and
              recipients can connect directly - no middleman, no cost, no
              barrier.
            </p>
          </div>

          <div class="problem-card">
            <div class="text-4xl mb-4 text-center">
              <svg
                class="w-10 h-10 mx-auto text-amber"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="M12 2a10 10 0 010 20"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-amber mb-4 text-center">
              Geographic Isolation
            </h3>
            <p class="text-light-green-text leading-relaxed text-center">
              Even when equipment exists nearby, people do not know about it.
              Location-based access to aid is almost non-existent in underserved
              regions.
            </p>
          </div>
        </div>
      </div>

      <!-- Testimonial Section -->
      <div class="max-w-3xl mx-auto mt-16">
        <div class="problem-card p-6 md:p-8">
          <div class="text-4xl text-light-green-text mb-4 text-center">"</div>
          <p
            class="text-white text-lg md:text-xl italic leading-relaxed mb-4 text-center"
          >
            I had a wheelchair for two years after my accident. When I
            recovered, I asked everyone I knew — no one knew how to find someone
            who needed it. It sat in my garage until it fell apart.
          </p>
          <p class="text-light-green-text text-base text-center">
            — James M., Kigali - Former donor, now AbleBridge volunteer
          </p>
        </div>
      </div>
    </section>

    <!-- Who We Are Section -->
    <section id="who" class="bg-off py-20 px-5">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-dark mb-6">
          Who We Are
        </h1>
        <p class="text-lg text-text max-w-3xl mx-auto leading-relaxed">
          AbleBridge is a volunteer-driven nonprofit committed to closing the
          gap between unused assistive devices and people who need them. Our
          team spans donors, recipients, and technologists united by a shared
          mission of accessibility and compassion.
        </p>
      </div>
    </section>

    <OurSolution />
    <OurStories />

    <!-- Get Started Section -->
    <section id="get-started" class="bg-teal py-20 px-5">
      <div class="max-w-6xl mx-auto text-center text-white">
        <h2 class="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p class="mb-8">
          List an item or find equipment – it’s completely free. Join our
          community today.
        </p>
        <button @click="$router.push('/auth')" class="bg-amber text-teal font-bold py-3 px-6 rounded-full">
          Get Started
        </button>
      </div>
    </section>
    <OurStories />
    <AppFooter />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import HeroSection from "../components/HeroSection.vue";
import OurSolution from "../components/OurSolution.vue";
import OurStories from "../components/OurStories.vue";
import AppFooter from "../components/AppFooter.vue";

const router = useRouter()
</script>

<style scoped>
.problem-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 28px 22px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.25s;
}
.problem-card:hover {
  border-color: rgba(212, 130, 10, 0.4);
}
.problem-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--amber);
}
</style>

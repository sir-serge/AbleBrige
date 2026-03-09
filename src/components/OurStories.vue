<template>
  <!-- Stories Section - Displays user testimonials and success stories from AbleBridge platform -->
  <section id="stories-section" class="px-12 py-20">
    <!-- Section intro with title and description -->
    <div class="flex items-end justify-between gap-12 mb-14">
      <div>
        <p
          class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-3"
        >
          Real Stories
        </p>
        <h2 class="font-fraunces text-5xl font-bold text-dark leading-tight">
          The people <em class="not-italic text-teal">behind every item</em>
        </h2>
      </div>
      <p class="text-[15px] text-gray-500 leading-relaxed max-w-md">
        Behind every donation is a real person who no longer needed their
        equipment. Behind every request is a real person whose life it changed.
      </p>
    </div>

    <!-- Stories grid - 3 column layout with featured story spanning 2 columns -->
    <div class="grid grid-cols-3 gap-6">
      <!-- FEATURED STORY (Claudine) - spans 2 columns with image on left, content on right -->
      <div
        class="story-card col-span-2 grid grid-cols-2 bg-white rounded-2xl overflow-hidden border border-teal/10"
      >
        <!-- Left: Large visual panel with wheelchair emoji and gradient background -->
        <div
          class="flex items-center justify-center text-[80px] bg-gradient-to-br from-teal-pale to-[#C5E4DC]"
        >
          ♿
        </div>

        <!-- Right: Story content with meta, quote, and item chip -->
        <div class="p-7 flex flex-col justify-between">
          <!-- Meta section: avatar, name, location, and recipient tag -->
          <div class="flex items-center gap-3 mb-5">
            <!-- Avatar with wheelchair emoji -->
            <div
              class="w-10 h-10 rounded-full bg-teal-pale flex items-center justify-center text-xl"
            >
              👩
            </div>
            <!-- Name and location -->
            <div>
              <p class="text-sm font-semibold text-dark">Claudine Uwase</p>
              <p class="text-xs text-muted">Kigali, Rwanda</p>
            </div>
            <!-- Recipient tag with teal background -->
            <span
              class="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-teal-pale text-teal"
            >
              Recipient
            </span>
          </div>

          <!-- Quote in Fraunces serif font, italic -->
          <blockquote
            class="font-fraunces text-[17px] italic text-dark leading-relaxed mb-4"
          >
            "I had not left my house in eight months. The wheelchair changed
            everything."
          </blockquote>

          <!-- Story text with more details -->
          <p class="text-[13px] text-gray-500 leading-relaxed mb-5">
            Claudine was injured in a road accident and could not afford a
            wheelchair after her insurance ran out. Her family had searched for
            months with no result. A neighbour told her about AbleBridge. Within
            4 days she had a match with a donor just 12km away. Three weeks
            later she returned to work.
          </p>

          <!-- Equipment chip with icon and details -->
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-pale text-teal text-xs font-semibold w-fit"
          >
            ♿ Manual Wheelchair · Donated by Jean-Paul M.
          </div>
        </div>
      </div>

      <!-- STORY 2 (Samuel) - Standard single column layout -->
      <div
        class="story-card bg-white rounded-2xl overflow-hidden border border-teal/10 flex flex-col"
      >
        <!-- Image panel with hearing aid emoji and gradient background -->
        <div
          class="h-48 flex items-center justify-center text-[64px] bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2]"
        >
          👂
        </div>
        <!-- Content section with full height flex -->
        <div class="p-6 flex flex-col flex-1">
          <!-- Meta with avatar, name, location, and donor tag -->
          <div class="flex items-center gap-3 mb-4">
            <!-- Avatar with hearing aid emoji -->
            <div
              class="w-9 h-9 rounded-full bg-[#FFF3E0] flex items-center justify-center text-lg"
            >
              👦
            </div>
            <!-- Name and location -->
            <div>
              <p class="text-sm font-semibold text-dark">Samuel Otieno</p>
              <p class="text-xs text-muted">Nairobi, Kenya</p>
            </div>
            <!-- Donor tag with amber background -->
            <span
              class="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF3E0] text-amber"
            >
              Donor
            </span>
          </div>
          <!-- Quote about mother's hearing aids -->
          <blockquote
            class="font-fraunces text-[15px] italic text-dark leading-relaxed mb-3"
          >
            "My mother passed away. Her hearing aids were brand new. I could not
            just throw them away."
          </blockquote>
          <!-- Story text with matching details -->
          <p class="text-[12px] text-gray-500 leading-relaxed flex-1">
            Samuel found AbleBridge through a community group. He listed aids
            the same afternoon. They were matched to a 9-year-old boy within 48
            hours.
          </p>
          <!-- Equipment chip with matching details -->
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-pale text-teal text-xs font-semibold w-fit mt-4"
          >
            👂 Hearing Aid Pair · Matched to child in Kisumu
          </div>
        </div>
      </div>

      <!-- STORY 3 (Moses) - Standard single column layout -->
      <div
        class="story-card bg-white rounded-2xl overflow-hidden border border-teal/10 flex flex-col"
      >
        <!-- Image panel with cane emoji and gradient background -->
        <div
          class="h-48 flex items-center justify-center text-[64px] bg-gradient-to-br from-teal-pale to-[#B2DFDB]"
        >
          🦯
        </div>
        <!-- Content section with full height flex -->
        <div class="p-6 flex flex-col flex-1">
          <!-- Meta with avatar, name, location, and recipient tag -->
          <div class="flex items-center gap-3 mb-4">
            <!-- Avatar with white cane emoji -->
            <div
              class="w-9 h-9 rounded-full bg-teal-pale flex items-center justify-center text-lg"
            >
              👴
            </div>
            <!-- Name and location -->
            <div>
              <p class="text-sm font-semibold text-dark">Moses Byaruhanga</p>
              <p class="text-xs text-muted">Kampala, Uganda</p>
            </div>
            <!-- Recipient tag -->
            <span
              class="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-teal-pale text-teal"
            >
              Recipient
            </span>
          </div>
          <!-- Quote about fear and hope -->
          <blockquote
            class="font-fraunces text-[15px] italic text-dark leading-relaxed mb-3"
          >
            "I was afraid no one would help. AbleBridge proved me wrong."
          </blockquote>
          <!-- Story text with recovery details -->
          <p class="text-[12px] text-gray-500 leading-relaxed flex-1">
            Moses gradually lost his sight and could no longer afford a white
            cane. He found one on AbleBridge within a week — collected free from
            a donor two streets away.
          </p>
          <!-- Equipment chip with collection details -->
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-pale text-teal text-xs font-semibold w-fit mt-4"
          >
            🦯 White Cane · Collected locally
          </div>
        </div>
      </div>

      <!-- STORY 4 (Fatima) - Standard single column layout -->
      <div
        class="story-card bg-white rounded-2xl overflow-hidden border border-teal/10 flex flex-col"
      >
        <!-- Image panel with crutches emoji and gradient background -->
        <div
          class="h-48 flex items-center justify-center text-[64px] bg-gradient-to-br from-[#FFF8EE] to-[#FFECB3]"
        >
          🩼
        </div>
        <!-- Content section with full height flex -->
        <div class="p-6 flex flex-col flex-1">
          <!-- Meta with avatar, name, location, and donor tag -->
          <div class="flex items-center gap-3 mb-4">
            <!-- Avatar with crutches emoji -->
            <div
              class="w-9 h-9 rounded-full bg-[#FFF3E0] flex items-center justify-center text-lg"
            >
              👩
            </div>
            <!-- Name and location -->
            <div>
              <p class="text-sm font-semibold text-dark">Fatima Diallo</p>
              <p class="text-xs text-muted">Dakar, Senegal</p>
            </div>
            <!-- Donor tag with amber background -->
            <span
              class="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF3E0] text-amber"
            >
              Donor
            </span>
          </div>
          <!-- Quote about multiple crutches -->
          <blockquote
            class="font-fraunces text-[15px] italic text-dark leading-relaxed mb-3"
          >
            "I had three pairs of crutches in my cupboard. In one week all three
            found homes."
          </blockquote>
          <!-- Story text with surgery recovery details -->
          <p class="text-[12px] text-gray-500 leading-relaxed flex-1">
            After recovering from two surgeries, Fatima had accumulated multiple
            sets of crutches. She listed all three and every one was matched
            before the week was out.
          </p>
          <!-- Equipment chip with matching details -->
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-pale text-teal text-xs font-semibold w-fit mt-4"
          >
            🩼 3× Crutches · All matched in 6 days
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No reactive data needed - static stories displayed directly in template
</script>

<style scoped>
/* Story Card Styles - Base styling for all story cards */
.story-card {
  transition:
    transform 0.25s,
    box-shadow 0.25s;
}
.story-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(26, 92, 82, 0.13);
}
</style>

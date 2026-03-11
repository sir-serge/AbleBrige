<template>
  <div
    class="min-h-screen bg-[#F9F5F0] font-sans flex items-center justify-center p-4 sm:p-6"
    role="main"
  >
    <!-- ══════════════ MAIN CARD ══════════════ -->
    <div
      class="w-full max-w-6xl lg:max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[620px]"
      role="dialog"
      aria-labelledby="auth-title"
    >
      <!-- ── LEFT PANEL (branding) ── -->
      <div
        class="w-full lg:w-[42%] bg-dark relative overflow-hidden flex flex-col justify-between p-6 lg:p-10 dot-bg order-2 lg:order-1"
        aria-hidden="true"
      >
        <!-- Glow blobs -->
        <div
          class="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
          style="
            background: radial-gradient(circle, #d4820a, transparent 70%);
            transform: translate(30%, -30%);
          "
        ></div>
        <div
          class="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10"
          style="
            background: radial-gradient(circle, #4a9d8f, transparent 70%);
            transform: translate(-30%, 30%);
          "
        ></div>

        <!-- Logo -->
        <div class="relative z-10">
          <div class="font-fraunces text-3xl font-bold text-white">
            Able<span class="text-amber">Bridge</span>
          </div>
          <p class="text-muted text-sm mt-1 tracking-wide">
            Connecting Aid. Restoring Dignity.
          </p>
        </div>

        <!-- Center text — switches with panel -->
        <div class="relative z-10 flex-1 flex flex-col justify-center">
          <div id="left-login" :class="{ hidden: !isLogin }">
            <p
              class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-4"
            >
              Welcome Back
            </p>
            <h2
              class="font-fraunces text-4xl font-bold text-white leading-tight mb-5"
            >
              Good to see<br />you again
            </h2>
            <p class="text-[#AECCC7] text-sm leading-relaxed">
              Log in to continue connecting people with the assistive equipment
              they need — completely free.
            </p>
            <!-- mini stats -->
            <div class="mt-8 flex gap-6">
              <div class="border-l-2 border-amber/40 pl-4">
                <div class="font-fraunces text-2xl text-amber font-bold">
                  1,240+
                </div>
                <div class="text-xs text-muted mt-0.5">Items Donated</div>
              </div>
              <div class="border-l-2 border-amber/40 pl-4">
                <div class="font-fraunces text-2xl text-amber font-bold">
                  830
                </div>
                <div class="text-xs text-muted mt-0.5">Lives Changed</div>
              </div>
            </div>
          </div>

          <div id="left-signup" :class="{ hidden: isLogin }">
            <p
              class="text-xs font-semibold tracking-[3px] uppercase text-muted mb-4"
            >
              Join Us
            </p>
            <h2
              class="font-fraunces text-4xl font-bold text-white leading-tight mb-5"
            >
              <span v-if="selectedRole === 'donor'"
                >Start making<br />a
                <span class="text-amber">difference</span></span
              >
              <span v-else
                >Find the <span class="text-amber">help</span> you need</span
              >
            </h2>
            <p class="text-[#AECCC7] text-sm leading-relaxed">
              <span v-if="selectedRole === 'donor'"
                >Create a free account in under a minute. Donate unused
                equipment or find what you need.</span
              >
              <span v-else
                >Access assistive equipment completely free. Join our community
                and get the support you deserve.</span
              >
            </p>
            <!-- testimonial snippet -->
            <div class="mt-8 bg-white/5 border border-white/10 rounded-xl p-4">
              <p
                class="font-fraunces text-sm italic text-[#AECCC7] leading-relaxed"
              >
                <span v-if="selectedRole === 'donor'"
                  >I signed up in two minutes. My wheelchair found a home the
                  next day.</span
                >
                <span v-else
                  >AbleBridge gave me hope when I needed it most. I found my
                  mobility aid within days.</span
                >
              </p>
              <p class="text-xs text-muted mt-2">
                <span v-if="selectedRole === 'donor'"
                  >— Claudine U., Kigali</span
                >
                <span v-else>— Maria S., Nairobi</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom links -->
        <div class="relative z-10">
          <div class="flex gap-6 text-xs text-muted">
            <a
              href="#"
              class="cursor-pointer hover:text-white transition-colors"
              aria-label="Privacy Policy"
              >Privacy Policy</a
            >
            <a
              href="#"
              class="cursor-pointer hover:text-white transition-colors"
              aria-label="Terms of Use"
              >Terms of Use</a
            >
            <a
              href="#"
              class="cursor-pointer hover:text-white transition-colors"
              aria-label="Help"
              >Help</a
            >
          </div>
          <p class="text-xs text-muted/50 mt-2">
            © 2025 AbleBridge. Free forever.
          </p>
        </div>
      </div>

      <!-- ── RIGHT PANEL (forms) ── -->
      <div class="flex-1 flex flex-col order-1 lg:order-2">
        <!-- Tab bar -->
        <div class="flex border-b border-gray-100" role="tablist">
          <button
            id="tab-login"
            @click="switchTo('login')"
            :class="[
              'flex-1 py-5 text-sm font-semibold transition-all border-b-2',
              isLogin
                ? 'text-teal border-teal'
                : 'text-gray-400 border-transparent',
            ]"
            role="tab"
            :aria-selected="isLogin"
            aria-controls="panel-login"
          >
            Log In
          </button>
          <button
            id="tab-signup"
            @click="switchTo('signup')"
            :class="[
              'flex-1 py-5 text-sm font-semibold transition-all border-b-2',
              !isLogin
                ? 'text-teal border-teal'
                : 'text-gray-400 border-transparent',
            ]"
            role="tab"
            :aria-selected="!isLogin"
            aria-controls="panel-signup"
          >
            Sign Up
          </button>
        </div>

        <div
          class="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-8 relative"
        >
          <!-- ════════ LOGIN FORM ════════ -->
          <div
            id="panel-login"
            :class="['auth-panel', isLogin ? 'visible-panel' : 'hidden-panel']"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <h3
              class="font-fraunces text-2xl font-bold text-dark mb-1"
              id="auth-title"
            >
              Welcome back
            </h3>
            <p class="text-sm text-gray-400 mb-7">
              Enter your details to continue
            </p>

            <form @submit.prevent="handleLogin" class="space-y-4">
              <div>
                <label
                  for="login-email"
                  class="block text-xs font-semibold text-teal mb-1.5 tracking-wide"
                  >Email Address</label
                >
                <input
                  id="login-email"
                  v-model="loginEmail"
                  class="ab-input"
                  type="email"
                  placeholder="you@email.com"
                  required
                  aria-describedby="login-email-error"
                />
                <p
                  id="login-email-error"
                  class="text-xs text-red-400 mt-1 hidden"
                >
                  Please enter a valid email
                </p>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1.5">
                  <label
                    for="login-pw"
                    class="text-xs font-semibold text-teal tracking-wide"
                    >Password</label
                  >
                  <a
                    href="#"
                    class="text-xs text-amber cursor-pointer hover:underline font-medium"
                    aria-label="Forgot password"
                    >Forgot password?</a
                  >
                </div>
                <div class="pw-wrap">
                  <input
                    id="login-pw"
                    v-model="loginPw"
                    class="ab-input pr-10"
                    type="password"
                    placeholder="Your password"
                    required
                  />
                  <button
                    type="button"
                    class="eye-btn"
                    @click="togglePw('login-pw')"
                    aria-label="Toggle password visibility"
                  >
                    👁️
                  </button>
                </div>
              </div>

              <!-- Remember me -->
              <label
                class="flex items-center gap-2.5 cursor-pointer select-none"
              >
                <div
                  class="w-4 h-4 border-2 border-teal/30 rounded flex items-center justify-center"
                  id="remember-box"
                  @click="toggleCheck('remember')"
                  :aria-checked="rememberMe"
                  role="checkbox"
                >
                  <span
                    v-if="rememberMe"
                    style="color: #1a5c52; font-size: 11px; font-weight: 700"
                    >✓</span
                  >
                </div>
                <span class="text-xs text-gray-500"
                  >Remember me on this device</span
                >
              </label>

              <button
                type="submit"
                class="ab-btn bg-teal text-white mt-2"
                aria-label="Log in to your account"
              >
                Log In →
              </button>

              <div class="relative flex items-center gap-3 py-1">
                <div class="flex-1 h-px bg-gray-100"></div>
                <span class="text-xs text-gray-300 font-medium"
                  >or continue with</span
                >
                <div class="flex-1 h-px bg-gray-100"></div>
              </div>

              <!-- Social -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="loginWithGoogle"
                  class="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
                  aria-label="Log in with Google"
                >
                  <span>🌐</span> Google
                </button>
                <button
                  type="button"
                  @click="loginWithFacebook"
                  class="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
                  aria-label="Log in with Facebook"
                >
                  <span>📘</span> Facebook
                </button>
              </div>
            </form>

            <p class="text-center text-xs text-gray-400 mt-6">
              Don't have an account?
              <button
                type="button"
                class="text-teal font-semibold cursor-pointer hover:underline"
                @click="switchTo('signup')"
                aria-label="Switch to sign up"
              >
                Sign up free
              </button>
            </p>
          </div>

          <!-- ════════ SIGNUP FORM ════════ -->
          <div
            id="panel-signup"
            :class="['auth-panel', !isLogin ? 'visible-panel' : 'hidden-panel']"
            role="tabpanel"
            aria-labelledby="tab-signup"
          >
            <h3 class="font-fraunces text-2xl font-bold text-dark mb-1">
              Create your account
            </h3>
            <p class="text-sm text-gray-400 mb-6">
              Free forever — takes 60 seconds
            </p>

            <!-- Role selector -->
            <div class="mb-6">
              <p class="text-xs font-semibold text-teal tracking-wide mb-3">
                I am joining as a…
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  :class="[
                    'role-card',
                    selectedRole === 'donor' ? 'selected' : '',
                    'border-2 rounded-xl p-4 bg-gray-50 relative transition-all duration-300 ease-in-out',
                  ]"
                  :style="{
                    borderColor:
                      selectedRole === 'donor' ? '#1A5C52' : '#E5E7EB',
                    background:
                      selectedRole === 'donor' ? '#E8F4F1' : '#F9FAFB',
                  }"
                  id="role-donor"
                  @click="selectRole('donor')"
                  role="radio"
                  :aria-checked="selectedRole === 'donor'"
                  aria-describedby="donor-desc"
                >
                  <div
                    :class="[
                      'role-check absolute top-3 right-3 w-5 h-5 rounded-full bg-teal flex items-center justify-center text-white text-xs transition-opacity duration-300',
                    ]"
                    :style="{ opacity: selectedRole === 'donor' ? '1' : '0' }"
                  >
                    ✓
                  </div>
                  <div class="text-2xl mb-2">📦</div>
                  <div class="text-sm font-semibold text-dark">Donor</div>
                  <div class="text-xs text-gray-400 mt-0.5" id="donor-desc">
                    I have equipment to give
                  </div>
                </div>
                <div
                  :class="[
                    'role-card',
                    selectedRole === 'recipient' ? 'selected' : '',
                    'border-2 rounded-xl p-4 bg-gray-50 relative transition-all duration-300 ease-in-out',
                  ]"
                  :style="{
                    borderColor:
                      selectedRole === 'recipient' ? '#1A5C52' : '#E5E7EB',
                    background:
                      selectedRole === 'recipient' ? '#E8F4F1' : '#F9FAFB',
                  }"
                  id="role-recipient"
                  @click="selectRole('recipient')"
                  role="radio"
                  :aria-checked="selectedRole === 'recipient'"
                  aria-describedby="recipient-desc"
                >
                  <div
                    :class="[
                      'role-check absolute top-3 right-3 w-5 h-5 rounded-full bg-teal flex items-center justify-center text-white text-xs transition-opacity duration-300',
                    ]"
                    :style="{
                      opacity: selectedRole === 'recipient' ? '1' : '0',
                    }"
                  >
                    ✓
                  </div>
                  <div class="text-2xl mb-2">🙏</div>
                  <div class="text-sm font-semibold text-dark">Recipient</div>
                  <div class="text-xs text-gray-400 mt-0.5" id="recipient-desc">
                    I need assistive equipment
                  </div>
                </div>
              </div>
            </div>

            <form @submit.prevent="handleSignup" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    for="first-name"
                    class="block text-xs font-semibold text-teal mb-1.5 tracking-wide"
                    >First Name</label
                  >
                  <input
                    id="first-name"
                    v-model="firstName"
                    class="ab-input"
                    type="text"
                    placeholder="Amara"
                    required
                  />
                </div>
                <div>
                  <label
                    for="last-name"
                    class="block text-xs font-semibold text-teal mb-1.5 tracking-wide"
                    >Last Name</label
                  >
                  <input
                    id="last-name"
                    v-model="lastName"
                    class="ab-input"
                    type="text"
                    placeholder="Nziza"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  for="signup-email"
                  class="block text-xs font-semibold text-teal mb-1.5 tracking-wide"
                  >Email Address</label
                >
                <input
                  id="signup-email"
                  v-model="signupEmail"
                  class="ab-input"
                  type="email"
                  placeholder="you@email.com"
                  required
                  @input="validateEmail"
                  aria-describedby="signup-email-error"
                />
                <p
                  id="signup-email-error"
                  class="text-xs text-red-400 mt-1 hidden"
                >
                  Please enter a valid email
                </p>
              </div>

              <div>
                <label
                  for="location"
                  class="block text-xs font-semibold text-teal mb-1.5 tracking-wide"
                  >Location</label
                >
                <input
                  id="location"
                  v-model="location"
                  class="ab-input"
                  type="text"
                  placeholder="e.g. Kigali, Rwanda"
                  required
                />
              </div>

              <!-- Recipient specific fields -->
              <div v-if="selectedRole === 'recipient'">
                <label
                  for="disability-type"
                  class="block text-xs font-semibold text-teal mb-1.5 tracking-wide"
                  >Type of Disability</label
                >
                <select
                  id="disability-type"
                  v-model="disabilityType"
                  class="ab-input"
                  required
                  aria-describedby="disability-type-desc"
                >
                  <option value="">Select disability type</option>
                  <option value="mobility">
                    Mobility (wheelchair, walker, cane)
                  </option>
                  <option value="hearing">
                    Hearing (hearing aids, cochlear implants)
                  </option>
                  <option value="vision">
                    Vision (white cane, braille equipment)
                  </option>
                  <option value="prosthetic">Prosthetic limbs</option>
                  <option value="orthotic">
                    Orthotic devices (braces, splints)
                  </option>
                  <option value="communication">
                    Communication aids (speech devices)
                  </option>
                </select>
                <p id="disability-type-desc" class="text-xs text-gray-400 mt-1">
                  Select the type of assistive equipment you need
                </p>
              </div>

              <div v-if="selectedRole === 'recipient'">
                <label
                  for="disability-cause"
                  class="block text-xs font-semibold text-teal mb-1.5 tracking-wide"
                  >How did you acquire this disability?</label
                >
                <select
                  id="disability-cause"
                  v-model="disabilityCause"
                  class="ab-input"
                  required
                >
                  <option value="">Select cause</option>
                  <option value="congenital">Congenital (born with it)</option>
                  <option value="accident">Accident or injury</option>
                  <option value="illness">Illness or disease</option>
                  <option value="aging">Age-related</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  for="signup-pw"
                  class="block text-xs font-semibold text-teal mb-1.5 tracking-wide"
                  >Password</label
                >
                <div class="pw-wrap">
                  <input
                    id="signup-pw"
                    v-model="signupPw"
                    class="ab-input pr-10"
                    type="password"
                    placeholder="Create a strong password"
                    required
                    @input="checkStrength"
                  />
                  <button
                    type="button"
                    class="eye-btn"
                    @click="togglePw('signup-pw')"
                    aria-label="Toggle password visibility"
                  >
                    👁️
                  </button>
                </div>
                <!-- strength meter -->
                <div class="mt-2 flex gap-1.5">
                  <div class="str-bar flex-1 bg-gray-200" id="s1"></div>
                  <div class="str-bar flex-1 bg-gray-200" id="s2"></div>
                  <div class="str-bar flex-1 bg-gray-200" id="s3"></div>
                  <div class="str-bar flex-1 bg-gray-200" id="s4"></div>
                </div>
                <p class="text-xs text-gray-400 mt-1" id="str-label">
                  Enter a password
                </p>
              </div>

              <!-- Terms -->
              <label
                class="flex items-start gap-2.5 cursor-pointer select-none"
              >
                <div
                  class="w-4 h-4 mt-0.5 border-2 border-teal/30 rounded flex-shrink-0 flex items-center justify-center"
                  id="terms-box"
                  @click="toggleCheck('terms')"
                  :aria-checked="agreeTerms"
                  role="checkbox"
                >
                  <span
                    v-if="agreeTerms"
                    style="color: #1a5c52; font-size: 11px; font-weight: 700"
                    >✓</span
                  >
                </div>
                <span class="text-xs text-gray-500 leading-relaxed">
                  I agree to AbleBridge's
                  <a
                    href="#"
                    class="text-teal font-semibold cursor-pointer hover:underline"
                    aria-label="Terms of Use"
                    >Terms of Use</a
                  >
                  and
                  <a
                    href="#"
                    class="text-teal font-semibold cursor-pointer hover:underline"
                    aria-label="Privacy Policy"
                    >Privacy Policy</a
                  >
                </span>
              </label>

              <button
                type="submit"
                class="ab-btn bg-amber text-dark mt-1"
                aria-label="Create free account"
              >
                Create Free Account →
              </button>

              <div class="relative flex items-center gap-3 py-1">
                <div class="flex-1 h-px bg-gray-100"></div>
                <span class="text-xs text-gray-300 font-medium"
                  >or sign up with</span
                >
                <div class="flex-1 h-px bg-gray-100"></div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  @click="loginWithGoogle"
                  class="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
                  aria-label="Sign up with Google"
                >
                  <span>🌐</span> Google
                </button>
                <button
                  type="button"
                  @click="loginWithFacebook"
                  class="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
                  aria-label="Sign up with Facebook"
                >
                  <span>📘</span> Facebook
                </button>
              </div>
            </form>

            <p class="text-center text-xs text-gray-400 mt-6 mb-2">
              Already have an account?
              <button
                type="button"
                class="text-teal font-semibold cursor-pointer hover:underline"
                @click="switchTo('login')"
                aria-label="Switch to log in"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ════════ SUCCESS OVERLAY ════════ -->
    <div
      class="success-overlay"
      :class="{ show: showSuccess }"
      id="success-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div
        class="bg-white rounded-2xl p-10 text-center max-w-sm mx-auto shadow-2xl"
      >
        <div class="text-5xl mb-4" id="success-icon">{{ successIcon }}</div>
        <h3
          class="font-fraunces text-2xl font-bold text-dark mb-2"
          id="success-title"
        >
          {{ successTitle }}
        </h3>
        <p class="text-sm text-gray-500 mb-6" id="success-msg">
          {{ successMsg }}
        </p>
        <button
          @click="closeSuccess"
          class="bg-teal text-white px-8 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-all"
          aria-label="Go to dashboard"
        >
          Go to Dashboard →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const router = useRouter();
const authStore = useAuthStore();

// Reactive data
const isLogin = ref(true);
const selectedRole = ref("donor");
const loginEmail = ref("");
const loginPw = ref("");
const rememberMe = ref(false);
const firstName = ref("");
const lastName = ref("");
const signupEmail = ref("");
const location = ref("");
const signupPw = ref("");
const agreeTerms = ref(false);
const showSuccess = ref(false);
const successIcon = ref("");
const successTitle = ref("");
const successMsg = ref("");
const disabilityType = ref("");
const disabilityCause = ref("");

// Switch between login / signup
const switchTo = (panel) => {
  isLogin.value = panel === "login";
};

// Role selector
const selectRole = (role) => {
  selectedRole.value = role;
  // Reset recipient fields when switching away
  if (role !== "recipient") {
    disabilityType.value = "";
    disabilityCause.value = "";
  }
};

// Password visibility toggle
const togglePw = (id) => {
  const input = document.getElementById(id);
  const btn = input.nextElementSibling;
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  btn.textContent = show ? "🙈" : "👁️";
};

// Checkbox toggle
const toggleCheck = (type) => {
  if (type === "remember") {
    rememberMe.value = !rememberMe.value;
  } else if (type === "terms") {
    agreeTerms.value = !agreeTerms.value;
  }
};

// Password strength
const checkStrength = () => {
  const val = signupPw.value;
  const bars = ["s1", "s2", "s3", "s4"].map((id) =>
    document.getElementById(id),
  );
  const label = document.getElementById("str-label");
  const colors = ["#EF4444", "#F97316", "#EAB308", "#22C55E"];
  const labels = [
    "Too weak",
    "Could be stronger",
    "Getting better",
    "Strong password ✓",
  ];

  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  bars.forEach((b, i) => {
    b.style.background = i < score ? colors[score - 1] : "#E5E7EB";
  });
  label.textContent = val.length
    ? labels[score - 1] || "Too weak"
    : "Enter a password";
  label.style.color = val.length ? colors[score - 1] : "#9CA3AF";
};

// Email validation
const validateEmail = () => {
  const input = document.getElementById("signup-email");
  const err = document.getElementById("signup-email-error");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail.value);
  err.classList.toggle("hidden", !signupEmail.value || valid);
  input.style.borderColor = !signupEmail.value || valid ? "#D0E8E3" : "#EF4444";
};

// Form submissions
const handleLogin = () => {
  if (!loginEmail.value || !loginPw.value) {
    shake("panel-login");
    return;
  }

  // Create user data object
  const userData = {
    email: loginEmail.value,
    role: selectedRole.value,
    firstName: firstName.value || "",
    lastName: lastName.value || "",
    location: location.value || "",
  };

  // Store user in auth store
  authStore.login(userData);

  showSuccessOverlay(
    "👋",
    "Welcome back!",
    "You are now logged in to AbleBridge.",
  );
};

const handleSignup = () => {
  if (!signupEmail.value || !signupPw.value) {
    shake("panel-signup");
    return;
  }
  if (
    selectedRole.value === "recipient" &&
    (!disabilityType.value || !disabilityCause.value)
  ) {
    shake("panel-signup");
    return;
  }

  // Create user data object
  const userData = {
    email: signupEmail.value,
    role: selectedRole.value,
    firstName: firstName.value,
    lastName: lastName.value,
    location: location.value,
    disabilityType: disabilityType.value,
    disabilityCause: disabilityCause.value,
  };

  // Store user in auth store
  authStore.login(userData);

  const roleLabel = selectedRole.value === "donor" ? "Donor" : "Recipient";
  showSuccessOverlay(
    "🎉",
    "Account created!",
    `Welcome to AbleBridge as a ${roleLabel}. Your journey starts now.`,
  );
};

// Success overlay
const showSuccessOverlay = (icon, title, msg) => {
  successIcon.value = icon;
  successTitle.value = title;
  successMsg.value = msg;
  showSuccess.value = true;
};

const closeSuccess = () => {
  showSuccess.value = false;
  // Navigate to dashboard instead of home page
  router.push("/dashboard");
};

// Social login handlers
const loginWithGoogle = () => {
  // In a real app, this would integrate with Google OAuth
  alert("Google login integration would be implemented here with OAuth 2.0");
  showSuccessOverlay(
    "🔵",
    "Google Login",
    "Google authentication would redirect here",
  );
};

const loginWithFacebook = () => {
  // In a real app, this would integrate with Facebook OAuth
  alert("Facebook login integration would be implemented here with OAuth 2.0");
  showSuccessOverlay(
    "📘",
    "Facebook Login",
    "Facebook authentication would redirect here",
  );
};

onMounted(() => {
  // Initialize strength check
  checkStrength();
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "DM Sans", sans-serif;
}

/* panel slide transition */
.auth-panel {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}
.auth-panel.hidden-panel {
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
  position: absolute;
  inset: 0;
}
.auth-panel.visible-panel {
  opacity: 1;
  pointer-events: all;
  transform: translateY(0);
  position: relative;
}

/* input focus ring */
.ab-input {
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #d0e8e3;
  border-radius: 8px;
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  color: #2a2a2a;
  background: #fff;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.ab-input:focus {
  border-color: #1a5c52;
  box-shadow: 0 0 0 3px rgba(26, 92, 82, 0.1);
}
.ab-input::placeholder {
  color: #aac5bf;
}

/* password eye toggle */
.pw-wrap {
  position: relative;
}
.pw-wrap .eye-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #7a9e96;
}

/* dot pattern */
.dot-bg {
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.12) 1.5px,
    transparent 1.5px
  );
  background-size: 24px 24px;
}

/* hover lift on role cards */
.role-card {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  transform: scale(1);
}
.role-card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.role-card.selected {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(26, 92, 82, 0.2);
}

/* strength bar */
.str-bar {
  height: 4px;
  border-radius: 2px;
  transition:
    width 0.3s,
    background 0.3s;
}

/* submit btn */
.ab-btn {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 8px;
  font-family: "DM Sans", sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.ab-btn:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}
.ab-btn:active {
  transform: translateY(0);
}

/* success overlay */
.success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 46, 41, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.success-overlay.show {
  opacity: 1;
  pointer-events: all;
}
</style>

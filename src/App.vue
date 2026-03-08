<script setup>
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div id="app">
    <Navigation />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
:root {
  --teal:        #1A5C52;
  --teal-mid:    #2D7A6E;
  --teal-light:  #4A9D8F;
  --teal-pale:   #E8F4F1;
  --amber:       #D4820A;
  --amber-light: #F0A030;
  --dark:        #1A2E29;
  --darker:      #0F1E1A;
  --cream:       #F5EDE3;
  --off:         #F9F5F0;
  --muted:       #7A9E96;
  --text:        #2A2A2A;
  --white:       #FEFEFE;
}

html,body,#app { height: 100%; margin: 0; }
main { min-height: calc(100vh - 72px); }
</style>

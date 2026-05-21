<script setup lang="ts">
// import { Disclosure, DisclosureButton,  } from '@headlessui/vue'
// import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
// import Fixtures from './components/Fixtures.vue';
/*
const navigation = [
  { name: 'Senior Fixtures', to: '/seniors', current: true },
  { name: 'Junior Fixtures', to: '/juniors', current: false },
  { name: 'Miniroo Fixtures', to: '/miniroos', current: false },
]
*/
</script>

<template>
  <div class="min-h-full">
    <div>
      <main>
        <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <RouterView />
          <!-- 
          <Fixtures />

          -->
        </div>
      </main>
    </div>
  </div>
</template>

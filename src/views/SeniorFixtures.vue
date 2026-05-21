<script setup lang="ts">
    import Fixtures from '../components/Fixtures.vue';
    const comps =  [{ name: "VETO Sports State League Men's", selected: true } ]
</script>
<template>
    
    <Fixtures :matches="comps" />

    
</template>

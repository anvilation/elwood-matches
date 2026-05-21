<script setup lang="ts">
    import Fixtures from '../components/Fixtures.vue';
    const comps =  [
        "Junior Girls Sunday (U12 - U18)",
        "Junior Mixed Sunday (U12 - U16)",
        "Junior Boys Sunday (U17 - U18)"
    ]
</script>
<template>
    <Fixtures :matches="comps" />
</template>
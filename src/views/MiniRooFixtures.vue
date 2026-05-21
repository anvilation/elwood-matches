<script setup lang="ts">
    import Fixtures from '../components/Fixtures.vue';
    const comps =  ["Coles MiniRoos Mixed Saturday (U6 - U11)",
        "Coles MiniRoos Girls' Sunday (U6 - U11)"
    ]
</script>
<template>
        <Fixtures :matches="comps" />
</template>
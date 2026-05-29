<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFixtureStore } from '../stores/fixturestore'

import Fixture from './Fixture.vue';
const props = defineProps({
    matches: Array<any>,
})
const data = ref(null)
const allFixtures: any[] = [];
const comps = ref(["All Competitions", "Coles MiniRoos Mixed Saturday (U6 - U11)", "Coles MiniRoos Girls' Sunday (U6 - U11)", "Junior Girls Sunday (U12 - U18)", "Junior Mixed Sunday (U12 - U16)", "Junior Boys Sunday (U17 - U18)", "VETO Sports State League Men's"])
const currentFilter = ref("All Competitions");
const error = ref(null)
const loading = ref(true)
/*
const fvBaseUrl = "https://fv.dribl.com";


function dayConvert(fixturedate: string) {
    const fixtureDate = new Date(fixturedate);
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(fixtureDate);
}

function dateConvert(fixturedate: string) {
    const fixtureDate = new Date(fixturedate);
    return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" }).format(fixtureDate);
}

function timeConvert(fixturedate: string) {
    const fixtureDate = new Date(fixturedate);
    return new Intl.DateTimeFormat("en-US", { timeStyle: "short", }).format(fixtureDate);
}
*/

function listComps(fixtures: any[]) {
    const competitions: any = [];
    for (let index = 0; index < fixtures.length; index++) {
        const fixture = fixtures[index];
        let compCheck = competitions.filter((c: any) => {
            if (c === fixture.attributes.competition_name) {
                return c;
            }
        })

        if (compCheck.length === 0) {
            competitions.push(fixture.attributes.competition_name)
        }

    }

    comps.value = competitions.toSorted()
}
const filterComps = (filter: string) => {
        currentFilter.value = filter;
        if (filter === 'All Competitions') {
            data.value = allFixtures
   
        } else {
            const filtered = allFixtures.filter((f: any) => {
                if (f.attributes.competition_name === filter) {
                    return f;
                }
            });
            data.value = filtered
    
        }
}




onMounted(async() => {
    const fixtureStore = useFixtureStore();
    await fixtureStore.fetchInitialData();
    if (props.matches) {

       fixtureStore.selectedComps(props.matches)
       listComps(fixtureStore.data)
       data.value = fixtureStore.data;
       allFixtures.push(... fixtureStore.data)

    } else {
       //  let fixtureData = fixtureStore.allComps()
       fixtureStore.allComps()

       listComps(fixtureStore.alldata)
       data.value = fixtureStore.alldata;
       allFixtures.push(... fixtureStore.alldata)
        
    }

   loading.value = false;


})
</script>

<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
        <div>

        
            <div class="p-3">
                <h1 class="font-bold">Competitions</h1>
                <span v-for="comp in comps" @click="filterComps(comp)"
                    class="inline-flex items-center rounded-full m-1 px-2 py-1 text-xs font-medium inset-ring"
                    :class="[comp === currentFilter ? 'bg-blue-50 text-blue-700 inset-ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:inset-ring-blue-400/30' : 'bg-gray-50 font-medium text-gray-600 inset-ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:inset-ring-gray-400/20']">{{
                        comp }}
                    {{ }}</span>




            </div>
            <!-- 
            <div class="p-3">
                <h1 class="font-bold">Competitions</h1>
                <span v-for="comp in allcomps" @click="selectedComp(comp)"
                    class="inline-flex items-center rounded-full m-1 px-2 py-1 text-xs font-medium inset-ring"
                    :class="[comp.selected ? 'bg-blue-50 text-blue-700 inset-ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:inset-ring-blue-400/30' : 'bg-gray-50 font-medium text-gray-600 inset-ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:inset-ring-gray-400/20']">{{
                        comp.name }}
                    {{ }}</span>




            </div>
            -->
            <hr>
            <h1 class="font-bold p-3">Fixtures</h1>
            <div v-for="fixture in data" :key="fixture.hash_id">
                <Fixture :fixture="fixture" />

            </div>

        </div>


    </div>
</template>

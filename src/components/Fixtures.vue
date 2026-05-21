<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFixtureStore } from '../stores/fixturestore'
const props = defineProps({
    matches: Array<any>,
})
const data = ref(null)
const allFixtures: any[] = [];
const comps = ref(["All Competitions", "Coles MiniRoos Mixed Saturday (U6 - U11)", "Coles MiniRoos Girls' Sunday (U6 - U11)", "Junior Girls Sunday (U12 - U18)", "Junior Mixed Sunday (U12 - U16)", "Junior Boys Sunday (U17 - U18)", "VETO Sports State League Men's"])
/*
const allcomps = ref([
    { name: "All Competitions", selected: true },
    { name: "Coles MiniRoos Mixed Saturday (U6 - U11)", selected: false },
    { name: "Coles MiniRoos Girls' Sunday (U6 - U11)", selected: false },
    { name: "Junior Girls Sunday (U12 - U18)", selected: false },
    { name: "Junior Mixed Sunday (U12 - U16)", selected: false },
    { name: "Junior Boys Sunday (U17 - U18)", selected: false },
    { name: "VETO Sports State League Men's", selected: false }])
const selectedComps = ref(["All Competitions"]);
*/
const currentFilter = ref("All Competitions");
const error = ref(null)
const loading = ref(true)

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

/*
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


/*
const selectedComp = (fixtures:any[], comp: any) => {
        let filteredFixtures:any[] = [];
        fixtures.forEach((f: any) => {
            const check = comp.filter((c: any) => {
                if (f.attributes.competition_name === c) {
                    return c
                }
            })
            if (check.length > 0) {
                filteredFixtures.push(f)
            }
        });
        return filteredFixtures;
    // allcomps
}
    */




onMounted(async() => {
    const fixtureStore = useFixtureStore();
    await fixtureStore.fetchInitialData();
    if (props.matches) {
        // filter fixtures

        /*
        console.log(props.matches)
        const filteredFixtures = selectedComp(fixtureStore.data, props.matches)
        console.log(filteredFixtures)
        listComps(filteredFixtures)
        data.value = [];
        data.value = filteredFixtures 
        allFixtures.push(... filteredFixtures) 
        */
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

   //  data.value = fixtureStore.data;


    /*
    fetchData(url)

    if (!props.matches) {
      //  filterComps('All Competitions')
      allcomps.value = [
    { name: "All Competitions", selected: true },
    { name: "Coles MiniRoos Mixed Saturday (U6 - U11)", selected: false },
    { name: "Coles MiniRoos Girls' Sunday (U6 - U11)", selected: false },
    { name: "Junior Girls Sunday (U12 - U18)", selected: false },
    { name: "Junior Mixed Sunday (U12 - U16)", selected: false },
    { name: "Junior Boys Sunday (U17 - U18)", selected: false },
    { name: "VETO Sports State League Men's", selected: false }]
    } else {
        allcomps.value = props.matches

    }
        */
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
                <div class="flex flex-row lg:px-7.5 w-full relative text-sm bg-white">
                    <div class="w-full flex flex-row items-center py-5.5 lg:py-8 px-3 border-color-1 border-b">

                        <div class="hidden lg:flex flex-col items-center w-36 pt-8">
                            <div class="text-level-1"><span class="font-semibold">{{ dayConvert(fixture.attributes.date)
                                    }}</span>&nbsp;<span class="font-normal">{{ dateConvert(fixture.attributes.date)
                                    }}</span></div>
                            <div class="text-level-3 pt-2">{{ timeConvert(fixture.attributes.date) }}</div>
                            <div class="text-level-3 pt-2"
                                v-if="fixture.attributes.competition_name.includes('MiniRoos')">


                            </div>
                            <div class="text-level-3 pt-2"
                                v-if="!fixture.attributes.competition_name.includes('MiniRoos')">
                                <div v-if="!fixture.attributes.bye_flag">
                                    <v-icon label="Referee Allocated" title="Referee Allocated"
                                        v-if="fixture.attributes.allocated_center_referee" name="gi-whistle"
                                        fill="green">
                                        Referee Allocated
                                    </v-icon>

                                    <v-icon label="No Referee Allocated" title="No Referee Allocated"
                                        v-if="!fixture.attributes.allocated_center_referee">
                                        <v-icon name="gi-whistle" />
                                        <v-icon name="fa-ban" scale="2" fill="#fC644d" />
                                    </v-icon>
                                    <br>
                                </div>



                            </div>
                        </div>


                        <!-- No Bye -->
                        <div class="flex-1" v-if="!fixture.attributes.bye_flag">
                            <div class="flex-row pb-1 flex items-center justify-center font-medium">
                                <div class="flex-col no-underline text-black items-center justify-center"></div>
                            </div>

                            <div class="flex-row flex items-center">

                                <div class="flex-1 flex flex-row justify-end text-end md:pr-5 pr-3">
                                    <span class="text-level-1 font-medium">{{ fixture.attributes.home_team_name
                                        }}</span>
                                </div>
                                <div class="md:w-9 md:h-9 h-5.5 w-5.5">
                                    <img :src="fixture.attributes.home_logo" class="md:w-9 md:h-9 h-5.5 w-5.5" />
                                </div>
                                <div
                                    class="w-15 md:w-18.75 flex flex-row items-center justify-center md:text-[20px] text-black">
                                    <div class="text-center"> <span
                                            class="lg:flex hidden font-bold text-base">-</span><span
                                            class="flex lg:hidden text-center md:text-lg font-semibold">{{
                                                timeConvert(fixture.attributes.date) }}</span>
                                    </div>
                                </div>

                                <div class="md:w-9 md:h-9 h-5.5 w-5.5">
                                    <img :src="fixture.attributes.away_logo" class="md:w-9 md:h-9 h-5.5 w-5.5" />
                                </div>

                                <div class="flex-1 md:pl-5 pl-3"><span class="text-level-1 font-medium">{{
                                    fixture.attributes.away_team_name }}</span>
                                </div>

                            </div>


                            <div class="flex flex-col items-center">
                                <span class="font-medium text-level-2 mt-4">{{ fixture.attributes.competition_name }} |
                                    {{ fixture.attributes.league_name }}</span>
                                <div
                                    class="flex flex-row justify-between w-100 mt-4.5 items-center font-normal text-level-3 text-level-3-anchor">
                                    <div>

                                    </div>
                                    <div>
                                        <a :href="`https://maps.google.com/maps?z=10&amp;q=${fixture.attributes.ground_latitude}+${fixture.attributes.ground_longitude}`"
                                            target="_blank" class="text-decoration-none">
                                            <v-icon name="co-location-pin" /> {{ fixture.attributes.ground_name }} - {{
                                                fixture.attributes.field_name }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END No Bye -->
                        <!-- Bye Bye -->
                        <div class="flex-1" v-if="fixture.attributes.bye_flag">
                            <div class="flex-row pb-1 flex items-center justify-center font-medium">
                                <div class="flex-col no-underline text-black items-center justify-center"></div>
                            </div>
                            <div class="flex-row flex items-center">
                                <div class="flex-1 flex flex-row justify-end text-end md:pr-5 pr-3">
                                    <span class="text-level-1 font-medium" v-if="fixture.attributes.home_team_name">{{
                                        fixture.attributes.home_team_name }}</span>
                                    <span class="text-level-1 font-medium"
                                        v-if="!fixture.attributes.home_team_name">BYE</span>

                                </div>
                                <div class="md:w-9 md:h-9 h-5.5 w-5.5" v-if="fixture.attributes.home_team_name">
                                    <img :src="fixture.attributes.home_logo" class="md:w-9 md:h-9 h-5.5 w-5.5" />
                                </div>
                                <div class="md:w-9 md:h-9 h-5.5 w-5.5" v-if="!fixture.attributes.home_team_name">

                                </div>
                                <div
                                    class="w-15 md:w-18.75 flex flex-row items-center justify-center md:text-[20px] text-black">
                                    <div class="text-center"> <span
                                            class="lg:flex hidden font-bold text-base">-</span><span
                                            class="flex lg:hidden text-center md:text-lg font-semibold">{{
                                                timeConvert(fixture.attributes.date) }}</span>
                                    </div>
                                </div>

                                <div class="md:w-9 md:h-9 h-5.5 w-5.5" v-if="fixture.attributes.away_team_name">
                                    <img :src="fixture.attributes.away_logo" class="md:w-9 md:h-9 h-5.5 w-5.5" />
                                </div>
                                <div class="md:w-9 md:h-9 h-5.5 w-5.5" v-if="!fixture.attributes.away_team_name">

                                </div>

                                <div class="flex-1 md:pl-5 pl-3">
                                    <span class="text-level-1 font-medium" v-if="fixture.attributes.away_team_name">{{
                                        fixture.attributes.away_team_name }}</span>
                                    <span class="text-level-1 font-medium"
                                        v-if="!fixture.attributes.away_team_name">BYE</span>
                                </div>

                            </div>


                            <div class="flex flex-col items-center">
                                <span class="font-medium text-level-2 mt-4">{{ fixture.attributes.competition_name }} |
                                    {{ fixture.attributes.league_name }}</span>
                                <div
                                    class="flex flex-row justify-between w-100 mt-4.5 items-center font-normal text-level-3 text-level-3-anchor">
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END Bye Bye -->
                        <div class="hidden lg:flex w-35 h-full flex-col align-center items-center">
                            <span class="text-level-1 font-semibold mb-8">{{ fixture.attributes.full_round }}</span>
                            <div>


                                <a :href="`${fvBaseUrl}/matchcentre?m=${fixture.attributes.match_hash_id}`"
                                    target="_blank"
                                    class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-black inset-ring inset-ring-gray-500/10 dark:bg-gray-400/10 dark:text-black  dark:inset-ring-gray-400/20"
                                    v-if="!fixture.attributes.bye_flag">
                                    <span class="font-medium text-center w-full">Match Centre</span>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>


    </div>
</template>

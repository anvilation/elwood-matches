<script setup lang="ts">
// import { ref, onMounted } from 'vue'
const props = defineProps({
    fixture: null,
})


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



</script>

<template>

    <div>
        <div class="flex flex-row lg:px-[30px] w-full relative text-sm bg-white">
            <div class="w-full flex flex-row items-center py-[22px] lg:py-8 px-3 border-color-1">
                <div class="hidden lg:flex flex-col items-center w-36 pt-8">
                    <div class="text-level-1">
                        <span class="font-semibold">
                            {{ dayConvert(fixture.attributes.date) }}
                        </span>&nbsp;
                        <span class="font-normal">
                            {{ dateConvert(fixture.attributes.date) }}
                        </span>
                    </div>
                    <div class="text-level-3 pt-2">
                        {{ timeConvert(fixture.attributes.date) }}
                    </div>
                    <div class="text-level-3 pt-2" v-if="fixture.attributes.competition_name.includes('MiniRoos')">


                    </div>
                    <div class="text-level-3 pt-2" v-if="!fixture.attributes.competition_name.includes('MiniRoos')">
                        <div v-if="!fixture.attributes.bye_flag">
                            <span data-count="1" class="fa-stack">
                                <v-icon label="Referee Allocated" title="Referee Allocated" name="gi-whistle"
                                    class="svg-inline--fa fa-whistle" v-if="fixture.attributes.allocated_center_referee"
                                    fill="green">
                                    Referee Allocated
                                </v-icon>
                                <v-icon label="No Referee Allocated" title="No Referee Allocated"
                                    class="svg-inline--fa fa-whistle"
                                    v-if="!fixture.attributes.allocated_center_referee">
                                    <v-icon name="gi-whistle" />
                                    <v-icon name="fa-ban" scale="2" fill="#fC644d" />
                                </v-icon>

                                <!-- 
                    <svg aria-hidden="true"
                                focusable="false" data-prefix="fas" data-icon="whistle" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                                class="svg-inline--fa fa-whistle">
                                <path fill="currentColor"
                                    d="M44.1 188.8C18.5 180.5 0 156.4 0 128C0 92.7 28.7 64 64 64c23.4 0 43.8 12.5 55 31.2C149.2 75.5 185.2 64 224 64c7.8 0 15.4 .5 22.9 1.4c.5 0 1.1 0 1.7 .1c37.8 4.5 73.8 19.4 103.9 43.2l69.8 55.2c5 4 7.2 10.6 5.5 16.8l-6.5 24c-3.2 11.7 1.1 24.2 10.8 31.5c9.6 7.2 22.7 7.9 33 1.7l19.3-11.6c5.7-3.4 12.9-3 18.2 1.2l127 100.4c6.6 5.2 10.5 13.2 10.5 21.6c0 6.9-2.6 13.5-7.2 18.5l-63.3 69.6c-6.1 6.7-14.7 10.5-23.7 10.5l-2 0c-5.2 0-10.2-1.2-14.8-3.6L380.7 367c-34.8 49-92 81-156.7 81C118 448 32 362 32 256c0-23.6 4.3-46.3 12.1-67.2zM80 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zM224 320a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
                                    class=""></path>
                            </svg>

                            -->
                            </span>

                        </div>


                    </div>
                </div>
                <!-- No Bye -->
                <div class="flex-1" v-if="!fixture.attributes.bye_flag">
                    <div class="flex-row pb-1 flex items-center justify-center font-medium">
                        <div class="flex-col no-underline text-black items-center justify-center">

                        </div>
                    </div>
                    <div class="flex-row flex items-center">
                        <div class="flex-1 flex flex-row justify-end text-end md:pr-5 pr-3">
                            <span class="text-level-1 font-medium">
                                {{ fixture.attributes.home_team_name }}
                            </span>
                        </div>
                        <div class="md:w-9 md:h-9 h-[22px] w-[22px]">
                            <img :src="fixture.attributes.home_logo" class="md:w-9 md:h-9 h-[22px] w-[22px]">
                        </div>
                        <div
                            class="w-[60px] md:w-[75px] flex flex-row items-center justify-center md:text-[20px] text-black">
                            <div class="text-center">
                                <span class="lg:flex hidden font-bold text-base">-</span>
                                <span class="flex lg:hidden text-center md:text-lg font-semibold">
                                    {{ timeConvert(fixture.attributes.date) }}
                                </span>
                            </div>
                        </div>
                        <div class="md:w-9 md:h-9 h-[22px] w-[22px]">
                            <img :src="fixture.attributes.away_logo" class="md:w-9 md:h-9 h-[22px] w-[22px]">
                        </div>
                        <div class="flex-1 md:pl-5 pl-3">
                            <span class="text-level-1 font-medium">
                                {{ fixture.attributes.away_team_name }}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="font-medium text-level-2 mt-4">
                            {{ fixture.attributes.competition_name }} | {{ fixture.attributes.league_name }}
                        </span>

                        <div
                            class="flex flex-row justify-between w-100 mt-[18px] items-center font-normal text-level-3 text-level-3-anchor">
                            <div v-if="!fixture.attributes.competition_name.includes('MiniRoos')">

                            </div>
                            <div v-if="!fixture.attributes.competition_name.includes('MiniRoos')">

                                <!-- -->
                                <div v-if="!fixture.attributes.bye_flag" class="flex lg:hidden">
                                    <span data-count="1" class="fa-stack">
                                        <v-icon label="Referee Allocated" title="Referee Allocated" name="gi-whistle"
                                            class="svg-inline--fa fa-whistle"
                                            v-if="fixture.attributes.allocated_center_referee" fill="green">
                                            Referee Allocated
                                        </v-icon>
                                        <v-icon label="No Referee Allocated" title="No Referee Allocated"
                                            class="svg-inline--fa fa-whistle"
                                            v-if="!fixture.attributes.allocated_center_referee">
                                            <v-icon name="gi-whistle" />
                                            <v-icon name="fa-ban" scale="2" fill="#fC644d" />
                                        </v-icon>

                                    </span>
                                </div>

                            </div>
                            <div>
                                <a :href="`https://maps.google.com/maps?z=10&amp;q=${fixture.attributes.ground_latitude}+${fixture.attributes.ground_longitude}`"
                                    target="_blank" class="lg:mr-3" style="text-decoration: none;">

                                    <v-icon name="co-location-pin" class="svg-inline--fa fa-location-dot" />
                                    <!-- 
                                    <svg aria-hidden="true"
                                        focusable="false" data-prefix="fas" data-icon="location-dot" role="img"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                        class="svg-inline--fa fa-location-dot">
                                        <path fill="currentColor"
                                            d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                                            class=""></path>
                                    </svg>
                                    -->

                                </a>
                                <a :href="`https://maps.google.com/maps?z=10&amp;q=${fixture.attributes.ground_latitude}+${fixture.attributes.ground_longitude}`"
                                    target="_blank" class="text-decoration-none">
                                    {{ fixture.attributes.ground_name }}<span> - {{
                                        fixture.attributes.field_name }}</span>
                                </a>
                            </div>
                            <div>
                                &nbsp;
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END No Bye -->
                <div class="flex-1" v-if="fixture.attributes.bye_flag">
                    <div class="flex-row pb-1 flex items-center justify-center font-medium">
                        <div class="flex-col no-underline text-black items-center justify-center"></div>
                    </div>
                    <div class="flex-row flex items-center">
                        <div class="flex-1 flex flex-row justify-end text-end md:pr-5 pr-3">
                            <span class="text-level-1 font-medium" v-if="fixture.attributes.home_team_name">{{
                                fixture.attributes.home_team_name }}</span>
                            <span class="text-level-1 font-medium" v-if="!fixture.attributes.home_team_name">BYE</span>

                        </div>
                        <div class="md:w-9 md:h-9 h-5.5 w-5.5" v-if="fixture.attributes.home_team_name">
                            <img :src="fixture.attributes.home_logo" class="md:w-9 md:h-9 h-5.5 w-5.5" />
                        </div>
                        <div class="md:w-9 md:h-9 h-5.5 w-5.5" v-if="!fixture.attributes.home_team_name">

                        </div>
                        <div
                            class="w-15 md:w-18.75 flex flex-row items-center justify-center md:text-[20px] text-black">
                            <div class="text-center"> <span class="lg:flex hidden font-bold text-base">-</span><span
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
                            <span class="text-level-1 font-medium" v-if="!fixture.attributes.away_team_name">BYE</span>
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

                <div class="hidden lg:flex w-[140px] h-full flex-col align-center items-center">
                    <span class="text-level-1 font-semibold mb-8">
                        {{ fixture.attributes.full_round }}
                    </span>
                    <div>
                        <a :href="`${fvBaseUrl}/matchcentre?m=${fixture.attributes.match_hash_id}`" target="_blank"
                            class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-black inset-ring inset-ring-gray-500/10 dark:bg-gray-400/10 dark:text-black  dark:inset-ring-gray-400/20"
                            v-if="!fixture.attributes.bye_flag">
                            <span class="font-medium text-center w-full">Match Centre</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
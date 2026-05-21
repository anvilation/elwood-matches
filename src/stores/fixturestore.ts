import { defineStore } from "pinia";




export const useFixtureStore = defineStore('fixtureStore', {
    state: () => ({
        data: [],
        loaded: false,
        baseurl: `https://mc-api.dribl.com/api/fixtures?date_range=default`,
        seasoncode: 'nPmrj2rmow',
        clubCode: 'k2KpRw5zmY',
        fvCode: 'w8zdBWPmBX',
        fvbaseurl: 'https://fv.dribl.com'
    }),
    actions: {
        async fetchInitialData() {
            const url = `${this.baseurl}&season=${this.seasoncode}&club=${this.clubCode}&tenant=${this.fvCode}&timezone=Australia%2FSydney`;
            if (this.loaded) {
                return;
            } else {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                } else {
                    const fixtures = await response.json();
                    this.data = fixtures.data;
                    this.loaded = true;

                    // listComps(fixtures.data);

                }
            }
        }
    }
})
import { defineStore } from "pinia";

export const useFixtureStore = defineStore('fixtureStore', {
    state: () => ({
        data: [] as any[],
        loaded: false,
        baseurl: `https://mc-api.dribl.com/api/fixtures?date_range=default`,
        seasoncode: 'nPmrj2rmow',
        clubCode: 'k2KpRw5zmY',
        fvCode: 'w8zdBWPmBX',
        fvbaseurl: 'https://fv.dribl.com',
        alldata: [] as any[]
    }),
    actions: {
        async fetchInitialData() {
            const url = `${this.baseurl}&season=${this.seasoncode}&club=${this.clubCode}&tenant=${this.fvCode}&timezone=Australia%2FSydney`;
            console.log(`Requesting from ${url}`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok')
            } else {
                const fixtures = await response.json();
                console.log(`useFixtureStore: data returned`)
                console.log(fixtures.data)
                this.alldata = fixtures.data;
                this.loaded = true;
                // listComps(fixtures.data);

            }
        },
        async selectedComps(comp: any[]) {
            let filteredFixtures: any[] = [];
            this.alldata.forEach((f: any) => {
                const check = comp.filter((c: any) => {
                    if (f.attributes.competition_name === c) {
                        return c
                    }
                })
                if (check.length > 0) {
                    filteredFixtures.push(f)
                }
            });
            this.data = filteredFixtures;
        },
        allComps() {
            this.data = this.alldata;
        }
    }
})
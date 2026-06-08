import { defineStore } from "pinia";

export const useFixtureStore = defineStore('fixtureStore', {
    state: () => ({
        data: [] as any[],
        loaded: false,
        // baseurl: `https://mc-api.dribl.com/api/fixtures?date_range=default`,
        baseurl: `https://mc-api.dribl.com`,
        seasoncode: 'nPmrj2rmow',
        clubCode: 'k2KpRw5zmY',
        fvCode: 'w8zdBWPmBX',
        fvbaseurl: 'https://fv.dribl.com',
        alldata: [] as any[]
    }),
    actions: {
        async fetchInitialData() {
            // get Monday and Sunday
            const current = new Date();
            const dayOfWeek = current.getDay();
            const distanceToMonday = current.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
            const firstDay = new Date(current.setDate(distanceToMonday));
            const lastDay = new Date(firstDay);
            lastDay.setDate(firstDay.getDate() + 6);



            // let url = `${this.baseurl}/api/fixtures?date_range=date-range&date=${firstDay.toLocaleDateString('en-CA')}&date=${lastDay.toLocaleDateString('en-CA')}&season=${this.seasoncode}&club=${this.clubCode}&tenant=${this.fvCode}&timezone=Australia%2FSydney`;

            let url = `${this.baseurl}/api/fixtures?date_range=date-range&date%5B%5D=${firstDay.toLocaleDateString('en-CA')}&date%5B%5D=${lastDay.toLocaleDateString('en-CA')}&season=${this.seasoncode}&club=${this.clubCode}&tenant=${this.fvCode}&timezone=Australia%2FSydney`

            // const url = `${this.baseurl}&season=${this.seasoncode}&club=${this.clubCode}&tenant=${this.fvCode}&timezone=Australia%2FSydney`;

            // https://mc-api.dribl.com/api/fixtures?date_range=date-range&date%5B%5D=2026-06-08&date%5B%5D=2026-06-14&season=nPmrj2rmow&club=k2KpRw5zmY&type_round=roundrobin_11&tenant=w8zdBWPmBX&timezone=Australia%2FSydney
            console.log(`Requesting from ${url}`);
            // console.log('https://mc-api.dribl.com/api/fixtures?date_range=date-range&date%5B%5D=2026-06-08&date%5B%5D=2026-06-14&season=nPmrj2rmow&club=k2KpRw5zmY&type_round=roundrobin_11&tenant=w8zdBWPmBX&timezone=Australia%2FSydney')
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
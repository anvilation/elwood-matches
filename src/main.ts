import { createApp } from 'vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import './style.css'
import App from './App.vue'
import router from './router'
import { VueUmamiPlugin } from '@jaseeey/vue-umami-plugin';
import {CoLocationPin , GiWhistle, FaBan, CoCalendar  } from "oh-vue-icons/icons"
import { createPinia } from 'pinia'
addIcons(CoLocationPin , GiWhistle, FaBan, CoCalendar  );



const analyticsConfig = {
    websiteID: 'd88e6cbd-c996-4267-8a39-16307d55800b',
    scriptSrc: 'https://analytics.anvilation.com/script.js',
    router: router,
    allowLocalhost: true,
    extraDataAttributes: {
        'data-host-url': 'https://nextgame.elwoodcitysc.com.au',
        'data-domains': 'nextgame.elwoodcitysc.com.au,nextgame.elwoodcitysc.com'
    }

};

const pinia = createPinia()
const app = createApp(App)
app.use(VueUmamiPlugin(analyticsConfig));
app.use(router)
app.use(pinia)
app.component("v-icon", OhVueIcon);
app.mount('#app')



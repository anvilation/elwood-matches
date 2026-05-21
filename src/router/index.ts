import { createRouter, createWebHistory } from 'vue-router'
import SeniorFixtures from '../views/SeniorFixtures.vue'
import MiniRoosFixtures from '../views/MiniRooFixtures.vue'
import JuniorsFixtures from '../views/JuniorFixtures.vue'
import AllFixtures from '../views/AllFixtures.vue'
import NotFoundView from '../views/NotFoundView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AllFixtures,
    },
        {
      path: '/seniors',
      name: 'seniors',
      component: SeniorFixtures,
    },
        {
      path: '/miniroos',
      name: 'miniroos',
      component: MiniRoosFixtures,
    },
    {
      path: '/juniors',
      name: 'juniors',
      component: JuniorsFixtures,
    },

    
    {
      path: '/:pathMatch(.*)*', // For Vue Router 4
      // path: '*', // For Vue Router 3
      name: 'NotFoundView',
      component: NotFoundView,
      meta: { hideHeader: false },
    }
  ],
})

export default router

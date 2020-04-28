import Vue from 'vue'
import VueRouter from 'vue-router'
import cours from '../views/cours.vue'
import gestion from '../views/gestion.vue'
import etudiants from '../views/etudiants.vue'
import school from "@/components/global/school.vue"
import professeurs from '../views/professeurs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: school
  },
  {
    path: '/cours',
    name: 'cours',
    component: cours
  },
  {
    path: '/gestion',
    name: 'gestion',
    component: gestion
  },
  {
    path: '/etudiants',
    name: 'etudiants',
    component: etudiants
  },
  {
    path: '/professeurs',
    name: 'professeurs',
    component: professeurs
  },
]

const router = new VueRouter({

  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

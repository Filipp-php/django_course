import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import(/* webpackChunkName: "editor" */ '../views/editor/EditorView.vue')
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import(/* webpackChunkName: "catalog" */ '../views/catalog/CatalogView.vue')
  },
  {
    path: '/workout/:pk',
    name: 'workout',
    component: () => import(/* webpackChunkName: "workout" */ '../views/catalog/WorkoutDetailView.vue'),
    props: true
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: () => import(/* webpackChunkName: "exercises" */ '../views/exercises/ExercisesView.vue')
  },
  {
    path: '/exercise/:pk',
    name: 'exercise',
    component: () => import(/* webpackChunkName: "exercise" */ '../views/exercises/ExerciseDetailView.vue'),
    props: true
  },
  {
    path: '/complexes',
    name: 'complexes',
    component: () => import(/* webpackChunkName: "exercicomplexesses" */ '../views/complexes/ComplexesView.vue')
  },
  {
    path: '/complex/:pk',
    name: 'complex',
    component: () => import(/* webpackChunkName: "complex" */ '../views/complexes/ComplexDetailView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

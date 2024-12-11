import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import NewLinkView from "./views/NewLinkView.vue";
import Stats from "./views/Stats.vue";



const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path:'/create',
        component: NewLinkView
    },
    {
        path: '/stats',
        component: Stats
    }



]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  

  export { router };
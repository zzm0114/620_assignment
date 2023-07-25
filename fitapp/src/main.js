import { createApp } from 'vue'
import App from './App.vue'
import Welcome from './components/Welcome.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
       { path: '/', component:Welcome},
    ],
  });

  const app  = createApp(App)
  app.use(router)
  app.mount('#app')



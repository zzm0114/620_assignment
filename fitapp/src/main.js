import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import Welcome from './components/Welcome.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'element-plus/dist/index.css'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
       { path: '/', component:Welcome},
    ],
  });

  const app  = createApp(App)
  app.use(router)
  app.use(ElementPlus)
  app.mount('#app')



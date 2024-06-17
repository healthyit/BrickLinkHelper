import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .directive('focus', {
    // When the bound element is mounted into the DOM...
    mounted(el) {
      // Focus the element
      el.focus()
    }
  })
  .mount('#app')


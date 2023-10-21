import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

function dataListener(data) {
  console.log('来自基座应用的数据', data)
  if (data.type === 'nav') {
    const path = data.path || '/'
    router.push(path).catch(() => { })
  }
}

window.microApp && window.microApp.addDataListener(dataListener,)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

<template>
  <div id="app">
    <header class="header">

      <h3>子应用:</h3>
      <div :class="`header-item ${currentSubAppName === subApp.name ? 'active' : ''}`" v-for="subApp of subAppList"
        :key="subApp.name" @click="handleSelectSubApp(subApp.name)">

        {{ subApp.name }}
      </div>
    </header>
    <div class="main">
      <div class="left">
        <h4>路由菜单:</h4>
        <div :class="`route-item ${route.path == currentPath ? 'active' : ''}`"
          v-for="route of routeList" :key="route.path" @click="handleNav(route.path)">
          {{ route.name }}
        </div>
      </div>
      <div class="right">
        <micro-app :name='subAppInfo.name' :url='subAppInfo.url' baseroute="/"></micro-app>
      </div>
    </div>
  </div>
</template>
<script>
import microApp from '@micro-zoe/micro-app'

const isDev = process.env.NODE_ENV === 'development'


export default {
  name: "App",
  data() {
    return {
      subAppList: [
        {
          name: "sub-a",
          url: isDev ? 'http://localhost:8082' : location.origin + '/' + 'sub-a',
          routeList: [
            {
              path: '/',
              name: 'sub-a page 1',
            },

            {
              path: '/about',
              name: 'sub-a page 2',
            },

          ]
        },

        {
          name: "sub-b",
          url: isDev ? 'http://localhost:8081' : location.origin + '/' + 'sub-b',
          routeList: [
            {
              path: '/',
              name: 'sub-b page 1',
            },

            {
              path: '/about',
              name: 'sub-b page 2',
            },

          ]
        }
      ],
      currentSubAppName: '',
      currentPath: '',
    }
  },
  computed: {
    routeList() {
      if (!this.currentSubAppName) return []
      return this.subAppList.find(subApp => subApp.name == this.currentSubAppName)?.routeList || []
    },
    subAppInfo() {
      if (!this.currentSubAppName) return {}
      const subAppInfo = this.subAppList.find(subApp => subApp.name == this.currentSubAppName)
      return subAppInfo || {}
    }
  },
  watch: {
    $route: {
      handler($route) {
        /**
             * 
             * 可以从$route.fullPath上解析得到当前子应用的 name, path
             * 
             * /?[name]=[path]
             * 
             */
        try {

          const { fullPath } = $route
          const subAppNameEqualHashPathStr = decodeURIComponent(fullPath).split("?")[1]
          const [subAppName, hashPath] = subAppNameEqualHashPathStr.split("=")

          const path = hashPath.split("/#")[1]
          if (!subAppName || !path) return
          console.info(`当前子应用: ${subAppName}\n当前path: ${path}`)

          this.handleSelectSubApp(subAppName)
          this.handleNav(path)


        } catch (error) {
          console.warn(error.stack)
        }
      },
      immediate: true
    }


  },
  methods: {
    handleSelectSubApp(subAppName) {
      this.currentSubAppName = subAppName
    },
    handleNav(path) {
      this.currentPath = path
      microApp.setData(this.currentSubAppName, { type: 'nav', path, })
    },
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  gap: 16px;
  padding: 16px;
  align-items: center;
  background: gainsboro;
  border: 1px solid #000;
}

.header-item {
  color: #2c3e50;
  cursor: pointer;
}

.active {
  color: deeppink !important;
}

.main {

  display: grid;
  grid-template-columns: 100px auto;
}

.left {
  background: gainsboro;
  border: 1px solid #000;
}

.route-item {
  padding: 16px;
  cursor: pointer;
}
</style>

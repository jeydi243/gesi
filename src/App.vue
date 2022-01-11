<template>
  <div id="app" class="container">
    <!-- <transition name="fade" mode="out-in"> -->
    <Layout v-if="layout == 'main'" key="main" class="h-screen w-screen">
      <!-- Current layout is {{ layout }} -->
      <transition name="fadeSlide" mode="out-in">
        <router-view />
      </transition>
    </Layout>
    <Auth v-else-if="layout == 'auth'" key="auth">
      <!-- Current layout is {{ layout }} -->
      <transition name="fadeSlide" mode="out-in">
        <router-view />
      </transition>
    </Auth>
    <!-- </transition> -->
  </div>
</template>
<script>
import Layout from "@/router/layouts/main";
import Auth from "@/router/layouts/auth";
import { mapActions, mapGetters, mapMutations } from "vuex"
export default {
  name: "App",
  components: { Layout, Auth },
  computed: {
    ...mapGetters({
      layout: "getLayout"
    })
  },
  watch: {
    "$route": function ({ meta, path, fullPath }) {
      if (meta.layout == "main") {
        this.changeLayout("main")
      } else if (meta.layout == "auth") {
        this.changeLayout(meta.layout)
      }
      this.changeActive(fullPath.split("/")[1])
      console.log(`%cPath name: ${path}`, "color: rgb(16,185,129) ; font-weight: bold ; padding: 4px ;");
    }
  },
  methods: {
    ...mapActions(['changeLayout',"changeActive"]),
  },
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fadeSlide-enter-active {
  transition: all 0.7s ease;
}

.fadeSlide-leave-active {
  transition: all 0.3s ease;
}

.fadeSlide-enter-from,
.fadeSlide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

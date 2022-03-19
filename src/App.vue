<template>
  <div class="bg-secondary vh-100">
    <NavBar />
    <div class="container text-light">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import {mapActions} from 'vuex'

export default {
  components: {
    NavBar
  },
  methods:{
    ...mapActions(['cargarTareas'])
  },
  created() {
    this.cargarTareas()
  }
}
</script>
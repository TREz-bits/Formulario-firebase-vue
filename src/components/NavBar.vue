<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">
      Formularios
    </router-link>
    <div class="d-flex">
      <router-link v-if="userAutentication" to="/" class="btn btn-dark">
        Tareas
      </router-link>
      <router-link v-if="!userAutentication" to="/ingreso" class="btn btn-dark">
        Ingresar
      </router-link>
      <router-link v-if="!userAutentication" to="/registro" class="btn btn-dark">
        Registrar
      </router-link>
      <button v-if="userAutentication" @click="LogOut" class="btn btn-dark ml-2">
        Cerrar Sesion
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userAutentication'])
  },
  methods: {
    ...mapActions(['LogOut'])
  }
}
</script>
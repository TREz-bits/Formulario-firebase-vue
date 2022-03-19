<template>
  Editar {{$route.params.id}} ---- {{tarea}}
  <form @submit.prevent="updateTarea(tarea)">
    <Input :tarea="tarea" :tipoInput="name"/>
  </form>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Input from '@/components/Input.vue'

export default {
  data() {
    return {
      name: 'Editar',
    }
  },
  components: {
    Input
  },
  computed: {
    ...mapState(['tarea']),
  },
  methods: {
    ...mapActions(['listTareaToEdit', 'updateTarea'])
  },
  created() {
    this.listTareaToEdit(this.$route.params.id)
  }
}
</script>
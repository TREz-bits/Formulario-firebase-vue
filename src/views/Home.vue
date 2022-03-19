<template>
  <h1>Formulario Vue JS</h1>
  <form @submit.prevent="procesarFormulario">
    <InputComponent :tarea="tarea" :tipoInput="input"/>
  </form>
  <hr>
  <ListarTareas  />
</template>

<script>
import InputComponent from '@/components/Input.vue'
import ListarTareas from '@/components/ListaTareas.vue'
import {mapActions} from 'vuex'
const shortid = require('shortid');
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      input: 'Procesar',
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0,
      }
    }
  },
  components: {
    InputComponent, ListarTareas
  },
  methods: {
    ...mapActions(['setTareas']),
    procesarFormulario() {
      console.log(this.tarea);
      if (this.tarea.nombre.trim() === "") {
        console.log('Campo Vacio')
        return
      }
      console.log('No esta Vacio');

      //generar id
      this.tarea.id = shortid.generate();
      console.log(this.tarea.id);

      // envian los datos
      this.setTareas(this.tarea)


      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0,
      }
    },
  },
  computed: {
  }
}
</script>

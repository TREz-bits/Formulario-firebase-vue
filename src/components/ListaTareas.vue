<template>
  <table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Categorias</th>
        <th scope="col">Estado</th>
        <th scope="col">Numero</th>
        <th scope="col">Accion</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in tareas" :key="index">
        <th scope="row">{{index+1}}</th>
        <td>{{ item.nombre }}</td>
        <td>
          <span v-for="(categoria,index) in item.categorias" :key="index">
            {{ item.categorias.length === index + 1 ? categoria : categoria + ', '}}
          </span>
        </td>
        <td>{{ item.estado }}</td>
        <td>{{ item.numero }}</td>
        <td>
          <button class="btn btn-danger btn-sm" @click="deleteTarea(item.id)">
            Eliminar
          </button>
          <router-link :to="{
            name: 'Editar',
            params: {
              id: item.id
            }
          }" class="btn btn-warning btn-sm ml-2">Editar</router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  computed: {
    ...mapState(['tareas'])
  },
  methods: {
      ...mapActions(['deleteTarea'])
  }
};
</script>

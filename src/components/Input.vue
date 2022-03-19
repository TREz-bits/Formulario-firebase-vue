<template>
  <input
    type="text"
    class="form-control my-2"
    placeholder="Ingrese nombre"
    v-model.trim="tarea.nombre"
  />
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      v-model="tarea.categorias"
      value="JavaScript"
    />
    <label class="form-check-label" for="check-1">JavaScript</label>
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="check-2"
      v-model="tarea.categorias"
      value="Node.js"
    />
    <label class="form-check-label" for="check-2">Node.js</label>
  </div>

  <div class="mt-2">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        id="radio-1"
        value="Urgente"
        v-model="tarea.estado"
      />
      <label class="form-check-label" for="radio-1">Urgente</label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        id="radio-2"
        value="Relax"
        v-model="tarea.estado"
      />
      <label class="form-check-label" for="radio-2">Relax</label>
    </div>
  </div>

  <div class="my-2">
    <input
      type="number"
      class="form-control"
      placeholder=""
      v-model.number="tarea.numero"
    />
  </div>
  <button
    class="btn btn-dark mt-3 btn-block"
    type="submit"
    :disabled="bloquear"
  >
    {{tipoInput}}
  </button>
</template>

<script>
export default {
  props: {
    tarea: Object,
    tipoInput: String
  },
  computed: {
    bloquear() {
      return this.tarea.nombre.trim() === "" ? true : false
    }
  }
};
</script>

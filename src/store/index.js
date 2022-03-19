import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0,
    }
  },
  mutations: {
    cargar(state, payload) {
      state.tareas = payload
    },
    set(state, payload) {
      state.tareas.push(payload)
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter(item => item.id !== payload)
    },
    editar(state, payload) {
      if (!state.tareas.find(item => item.id === payload)) {
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(item => item.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map(item => item.id == payload.id ? payload : item)
      router.push('/')
    }
  },
  actions: {
    async cargarTareas({commit}) {
      try {
        const res = await fetch('https://api-formulario-udemy-8fe1a-default-rtdb.firebaseio.com/tareas.json', {
          method: 'GET'
        })

        const dataDB = await res.json()

        const arrayTareas = []
        for (const id in dataDB) {
          arrayTareas.push(dataDB[id])
        }
        commit('cargar', arrayTareas)

      } catch (error) {
        console.log(error);
      }
    },
    async setTareas({ commit }, tarea) {
      try {
        await fetch(`https://api-formulario-udemy-8fe1a-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })

      } catch (error) {
        console.log(error);
      }
      commit('set', tarea)
    },
    async deleteTarea({commit}, tareaId) {
      try {
        await fetch(`https://api-formulario-udemy-8fe1a-default-rtdb.firebaseio.com/tareas/${tareaId}.json`, {
          method: 'DELETE',
        })
        commit('eliminar', tareaId)
      } catch (error) {
        console.log(error);
      }
    },
    listTareaToEdit({commit}, tarea) {
      commit('editar', tarea)
    },
    async updateTarea({commit}, tarea) {
      try {
        const res = await fetch(`https://api-formulario-udemy-8fe1a-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })

        const dataDB = await res.json()
        commit('update', dataDB)
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})

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
    },
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
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
    async cargarTareas({commit, state}) {
      if (localStorage.getItem('usuario')) {
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
      } else {
        return commit('setUser', null)
      }
      try {
        const res = await fetch(`https://api-formulario-udemy-8fe1a-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`, {
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
    async setTareas({ commit, state }, tarea) {
      try {
        await fetch(`https://api-formulario-udemy-8fe1a-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
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
    async deleteTarea({commit, state}, tareaId) {
      try {
        await fetch(`https://api-formulario-udemy-8fe1a-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tareaId}.json?auth=${state.user.idToken}`, {
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
    async updateTarea({commit, state}, tarea) {
      try {
        const res = await fetch(`https://api-formulario-udemy-8fe1a-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })

        const dataDB = await res.json()
        commit('update', dataDB)
      } catch (error) {
        console.log(error);
      }
    },
    async registerUser({commit}, user) {
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEYL-t69-pAqCPxATSWLWerbzgMQNPHg8`,{
          method: 'POST',
          headers: {
            'Content-type': 'application.json'
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          })
        })
        console.log(userDB);
        const userDB = await res.json()
        if (userDB.error) {
          console.log(userDB.error);
          return
        }
        commit('setUser', dataDB)
        router.push('/')
      } catch (error) {
        console.log(error);
      }
    },
    async loginUser({commit}, user) {
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEYL-t69-pAqCPxATSWLWerbzgMQNPHg8`, {
          method: 'POST',
          headers: {
            'Content-type': 'application.json'
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        // console.log(userDB);
        if (userDB.error) {
          return console.log(userDB.error);
        }
        commit('setUser', userDB)
        router.push('/')
        localStorage.setItem('usuario', JSON.stringify(userDB))
      } catch (error) {
        console.log(error);
      }
    },
    async LogOut({commit}) {
      commit('setUser', null)
      router.push('/ingreso')
      localStorage.removeItem('usuario')
    }
  },
  getters: {
    userAutentication(state) {
      return !!state.user
    }
  },
  modules: {
  }
})

<template>
    <h1 class="mb-3">Inicia Sesion</h1>
    <form @submit.prevent="procesarFormulario">
        <input
            type="email"
            placeholder="email"
            class="form-control my-2"
            v-model.trim="email"
        />
        <input
            type="password"
            placeholder="password"
            class="form-control my-2"
            v-model.trim="password"
        />
        <div class="alert alert-danger" v-if="error.type != null">
            {{error.message}}
        </div>
        <button
            type="submit"
            class="btn btn-outline-light btn-block mr-auto ml-auto w-50 my-3"
            :disabled="bloquear"
        >
            Ingresar
        </button>
    </form>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    computed: {
        ...mapState(['error']),
        bloquear() {
            if (!this.email.includes("@")) {
                return true;
            }
        },
    },
    methods: {
        ...mapActions(["loginUser"]),
        async procesarFormulario() {
            await this.loginUser({ email: this.email, password: this.password });
            if (this.error.type !== null) {
                return
            }
            this.email = "";
            this.password = "";
        },
    },
};
</script>

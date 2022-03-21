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
import { mapActions } from "vuex";
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    computed: {
        bloquear() {
            if (!this.email.includes("@")) {
                return true;
            }
        },
    },
    methods: {
        ...mapActions(["loginUser"]),
        procesarFormulario() {
            this.loginUser({ email: this.email, password: this.password });
            this.email = "";
            this.password = "";
        },
    },
};
</script>

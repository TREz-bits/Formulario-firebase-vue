<template>
    <h1 class="my-5">Registro de Usuario</h1>
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
            v-model.trim="pass1"
        />
        <input
            type="password"
            placeholder="password"
            class="form-control my-2"
            v-model.trim="pass2"
        />
        <label v-show="this.pass1 !== this.pass2 && this.pass2.length > 5" for="alert" class="alert alert-danger my-2 w-100" role="alert">
            Tus contraseñas no coinciden
        </label>
        <div v-show="this.pass1.length < 5 && this.pass1 != ''" class="alert alert-warning" role="alert">
            <h4 class="alert-heading">Hola!</h4>
            <ul class="mb-0">
            <li>Tu contraseña debe contener al menos 6 caracteres</li>
            </ul>
        </div>
        <button
            type="submit"
            class="btn btn-outline-light btn-block mr-auto ml-auto w-50 my-3"
            :disabled="bloquear"
        >
            Registrar
        </button>
    </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            email: "",
            pass1: "",
            pass2: "",
        };
    },
    computed: {
        bloquear() {
            if (!this.email.includes("@")) {
                return true;
            }
            if (
                this.pass1.length > 5 &&
                this.pass1 === this.pass2
            ) {
                return false;
            }
            return true;
        },
    },
    methods: {
        ...mapActions(['registerUser']),
        procesarFormulario() {
            this.registerUser({email: this.email, password: this.pass1})
            this.email = ''
            this.pass1 = ''
            this.pass2 = ''
        }
    }
};
</script>

<style>
</style>
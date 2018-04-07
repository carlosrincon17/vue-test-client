<template>
    <div class="row justify-content-md-center" style="margin-top: 100px">
      <form class="form-signin col-md-6 col-xs-12" @submit.prevent="submitLogin">
        <h2 class="form-signin-heading">Inciar sesion</h2>
        <br />
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus="" v-model="login.email">
        <br />
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="login.password">
        <br />
        <button class="btn btn-lg btn-primary btn-block" type="submit" v-bind:disabled="formSubmitted">Sign in</button>
      </form>
    </div>
</template>

<script>
  import {USER_LOCAL_STORAGE_KEY} from '../constants/localstorage'

  export default {
    components: {},
    data () {
        return {
            login: {
                'email': '',
                'password': '',
            },
            formSubmitted: false
        }
    },
    methods: {
        submitLogin(){
            this.formSubmitted = true;
            localStorage.setItem(USER_LOCAL_STORAGE_KEY, this.login.email);
        }
    }
  }
</script>

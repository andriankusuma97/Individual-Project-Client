
<script>
  import {RouterView} from 'vue-router'
  import {mapActions, mapState} from 'pinia'
  import {useExerciseStore} from '../stores/exercise'
  export default{
    name:'LoginView',
    data(){
      return{
        user:{
          email : "",
          password : "",
          username : "",
        }
      }
    },
   
    methods:{
      ...mapActions(useExerciseStore,['handleRegister']),
      submitLogin(){
        this.handleRegister(this.user)
      },
      // callback(response){
      //   this.handleGoogleLogin(response)
      // }
    },
  }
</script>


<template>
  <section class="vh-80 mb-5">
  <div class="container-fluid ">
    <div class="row">
      <div class="col-sm-6 text-black">

        <div class="px-5 ms-xl-4">
          <i class="" style="color: #709085;"></i>
          
        </div>

        <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

          <form @submit.prevent="submitLogin" style="width: 23rem;">
            <h1 class="h1 fw-bold mt-4">My Exercise</h1> <br>
            <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Register</h3>

            <div class="form-outline mb-4">
              <label class="form-label text-secondary" for="form2Example18">Username</label>
              <input v-model="user.username" type="text" id="form2Example18" class="form-control form-control-lg" />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label text-secondary" for="form2Example18">Email address</label>
              <input v-model="user.email" type="email" id="form2Example18" class="form-control form-control-lg" />
            </div>

            <div class="form-outline mb-4">
              <label class="form-label text-secondary" for="form2Example28">Password</label>
              <input v-model="user.password" type="password" id="form2Example28" class="form-control form-control-lg" />
            </div>

            <div class="pt-1 mb-4 text-center">
              <button class="btn btn-info btn-lg btn-block" type="submit">Submit</button> <br> <br>
            </div>

            <p>Have an account? <router-link class="link-info" to="/login">Go to Login</router-link></p>

          </form>

        </div>

      </div>
      <div class="col-sm-6 px-0 d-none d-sm-block">
        <img  src="https://pngimg.com/uploads/fitness/fitness_PNG146.png"
          alt="Login image" class="w-100 vh-100" style="object-fit: contain; object-position: left;">
      </div>
    </div>
  </div>
  </section>
</template>
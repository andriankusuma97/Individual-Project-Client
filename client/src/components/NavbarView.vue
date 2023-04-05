<script>
  import {RouterView,RouterLink} from 'vue-router'
  import Swal from 'sweetalert2'
  import { mapState } from 'pinia';
  import { useExerciseStore } from '../stores/exercise';
  export default{
    computed:{
      ...mapState(useExerciseStore,['email'])
    },
    methods:{
      handleLogout(){
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "qeustion",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Logout!",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear()
            this.$router.push("/login")
          }
        });
      }
    },
    created(){
      this.email = localStorage.email
    }
  }
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">My Exercise</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav w-3">
        <li class="nav-item">
         <router-link class="nav-link" to="/login">Go to Login</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Premium</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
    <div >
        <span class="">Hi, {{email}} </span>
        <a @click.prevent="handleLogout" class="btn btn-outline-danger mr-5 ">Logout</a>
      </div>
  </div>
  </nav>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'

</script>



<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-0">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">My Exercise</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
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
  </div>
</nav>
</template>
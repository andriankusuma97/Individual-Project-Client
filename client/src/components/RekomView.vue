

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import {mapActions, mapState} from 'pinia'
  import {useExerciseStore} from '../stores/exercise'
 

  export default {
    computed:{
      ...mapState(useExerciseStore,['listRekomendasi'])
    },
    methods:{
      // ...mapActions(useExerciseStore,['fetchExercise']),
      // tesBut(){
      //   this.fetchExercise("tes aja dulu")
      // }
    },
    created(){
      // this.fetchExercise()
    }
  }
</script>


<template>
   <div  v-for=" data in listRekomendasi" :key="data.id" :data="data" class="col-lg-3 col-sm-6">
      <div class="item">
        <img :src="data.gifUrl" alt="">
        <h4>{{data.equipment}}<br><span>Sandbox</span></h4><br>
        <h4> body party : {{data.bodyPart}}<br></h4>
        <h4> target : {{data.target}}<br></h4> <br>
        <ul>
          <li><i class="fa fa-star"></i> 4.8</li>
        </ul>
      </div>
    </div>
</template>


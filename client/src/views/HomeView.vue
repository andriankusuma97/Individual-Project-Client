<script>
import { RouterLink, RouterView } from 'vue-router'
import {mapActions, mapState} from 'pinia'
import {useExerciseStore} from '../stores/exercise'
import NavbarView from '../components/NavbarView.vue'
import MenuView from '../components/MenuView.vue'

export default {
  components:{
    NavbarView,
    MenuView
  },
  computed:{
    ...mapState(useExerciseStore,['listExercise'])
  },
  methods:{
    ...mapActions(useExerciseStore,['fetchExercise']),
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
  <NavbarView/>
  <MenuView/>
</template>


<style scoped>

</style>
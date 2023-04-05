<script>
   import CardView from '../components/CardView.vue'
   import RekomView from '../components/RekomView.vue'
   import {mapActions, mapState} from 'pinia'
   import {useExerciseStore} from '../stores/exercise'
   export default {
    components:{
      CardView,
      RekomView,
    },
    data(){
      return{
       status: false,
       showBmi : false,
       showRekom : false,
       value:{
        weight : 0 ,
        height1 : 0,
       },
       sugest : "chest",
      }
    },
    computed:{
      ...mapState(useExerciseStore,['listBmi',"listRekomendasi"])
    },
    methods:{
      ...mapActions(useExerciseStore,['fetchBmi','fetchRekomendasi']),
      getBmi(){
        this.status = true
        this.showBmi = false
        this.showRekom = false
      },
      async getDataBmi(){
         await this.fetchBmi(this.value)
        if(this.listBmi.weightCategory === 'Normal Weight'){
          this.sugest='chest'
        }else if(this.listBmi.weightCategory === 'Under Weight'){
           this.sugest='lower arms'
        }else{
           this.sugest='cardio'
        }
        await this.fetchRekomendasi(this.sugest)
        this.status = false
        this.showBmi = true
        this.showRekom = true

        console.log(this.listRekomendasi)
      }
    }
   }
</script>



<template>
  <div class="container mt-0" style="margin-top:0">
    <div class="row" style="margin-top:0">
      <div class="col-lg-12">
        <div class="page-content">

          <!-- ***** Banner Start ***** -->
          <div class="main-banner mt-0" style="margin-top:0">
            <div class="row">
              <div class="col-lg-7">
                <div class="header-text">
                  <h6>Welcome To My Exercise</h6>
                  <h4><em class="text-danger">GET </em>Your BMI</h4>
                  <div class="main-button">
                    <a @click.prevent="getBmi"  href="">Get Now</a>
                  </div>
                  <div> <br>
                    <form @submit.prevent="getDataBmi" v-show="status === true" class="text-white w-25" action="">
                      <div class="row">
                        <div class="col ">
                          <label for="">Height</label>
                          <input style="Width: 90%" type="number" v-model="value.height1">
                        </div> <br> <br> <br>
                        <div class="col ">
                          <label for="">Weight</label>
                          <input style="Width: 90%" type="number" v-model="value.weight" ><br><br>
                          <button type="submit" >Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div v-show="showBmi === true" ><h4>"{{listBmi.weightCategory}}"</h4></div>
                </div>
              </div>
            </div>
          </div>
          <!-- ***** Banner End ***** -->

          <!-- ***** Most Popular Start ***** -->
           <div  class="most-popular">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4 v-show="showRekom === false" ><em>Most Popular</em> Exercise</h4>
                  <h4 v-show="showRekom === true" ><em>Rekomendasi</em> Exercise ({{sugest}}) </h4>
                </div>
                <div class="row">
                 <CardView v-show="showRekom === false" />
                 <RekomView v-show="showRekom === true" />
                </div>
              </div>
            </div>
          </div>

          
          <!-- ***** Most Popular End ***** -->
          
       
        </div>
      </div>
    </div>
  </div>
  
</template>
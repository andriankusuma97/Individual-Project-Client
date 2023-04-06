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
       showKategori : false,
       value:{
        weight : 0 ,
        height1 : 0,
       },
       sugest : "chest",
      }
    },
    computed:{
      ...mapState(useExerciseStore,['listBmi',"listRekomendasi","listKategori"])
    },
    methods:{
      ...mapActions(useExerciseStore,['fetchBmi','fetchRekomendasi',"fetchKategori"]),
      getBmi(){
        this.status = true
        this.showBmi = false
        this.showRekom = false
        this.showKategori = false
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
      },

      getKategori(data){
        this.sugest = data
        this.fetchRekomendasi(this.sugest)
        this.showKategori = true
      },

      // lowerArms(){
      //   this.sugest='lower arms'
      // },
      // cardio(){
      //   this.sugest='cardio'
      // },
      // chest(){
      //   this.sugest='chest'
      // },
      // back(){
      //   this.sugest='back'
      // },

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
                    <a class="ml-4" @click.prevent="getKategori"  href="">Get Category</a>
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

          <div v-show="showKategori === true"  class="most-popular">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <h4><em>Category</em> Exercise</h4>
                </div>
                <div class="row">
                  <div class="col-lg-3 col-sm-4 text-center">
                    <div class="item"> 
                      <a @click.prevent="getKategori('lower arms')" href="">
                      <img src="https://i.ebayimg.com/images/g/qxMAAOSw1q9cscFJ/s-l640.jpg" alt="">
                      </a>
                      <h4>Lower Arms</h4>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-4 text-center">
                    <div class="item">
                      <a @click.prevent="getKategori('chest')"  href="">
                      <img src="https://ae01.alicdn.com/kf/HTB1tz6xIVXXXXXXXVXXq6xXFXXX4/Wall-Sticker-Sport-Bodybuilding-Bench-Press-Barbell-Athlete-Vinyl-Decal.jpg" alt="">

                      </a>
                      <h4>Chest</h4>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-4 text-center">
                    <div class="item">
                      <a @click.prevent="getKategori('cardio')" href="">
                      <img src="https://th.bing.com/th/id/OIP.UEsuIrvcsjf6lPNz_Ru0tAHaHC?w=210&h=199&c=7&r=0&o=5&pid=1.7" alt="">

                      </a>
                      <h4>Cardio</h4>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-4 text-center">
                    <div class="item">
                      <a @click.prevent="getKategori('back')" href="">
                        <img src="https://3.bp.blogspot.com/-Z0fgNHAPihc/TexksTrDjmI/AAAAAAAABVA/EMTBBFWRPDo/s1600/squat.png" alt="">
                      </a>
                      <h4>Back</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ***** Most Popular Start ***** -->
          <div  class="most-popular">
            <div class="row">
              <div class="col-lg-12">
                <div class="heading-section">
                  <div v-if="showKategori === false">
                    <h4 v-show="showRekom === false" ><em>Most Popular</em> Exercise</h4>
                    <h4 v-show="showRekom === true" ><em>Rekomendasi</em> Exercise ({{sugest}}) </h4>
                  </div>
                  <div  v-if="showKategori === true">
                    <h4><em>{{sugest}}</em> Exercise</h4>
                  </div>
                </div>
                <div class="row">
                    <RekomView v-show="showRekom === true && showKategori === false" />
                    <RekomView v-if="showKategori === true"/>
                    <CardView v-show="showRekom === false && showKategori === false" />
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
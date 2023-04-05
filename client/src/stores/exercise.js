import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useExerciseStore = defineStore('exercise', {
  state: () => ({ 
    // baseUrl : 'https://rentdorz-production.up.railway.app',
    baseUrl : 'http://localhost:3000',
    listExercise : [],
    listBmi : [],
    listRekomendasi : [],
    email: localStorage.email ,
  
      
  }),
  getters: {
    
  },
 
  actions: {
    async fetchExercise(){
      try {
        const {data} = await axios ({
          url: this.baseUrl + '/exercise',
          method: 'get',
        })
        console.log(data)
        this.listExercise = data
        console.log(this.listExercise,"<<<< dari pinia")
      } catch (error) {
        console.log(error)
        Swal.fire("Cancelled", `${error.responseJSON.message}`, "error");
      }
    },
    async fetchBmi(value){
      try {
        const {data} = await axios ({
          url: this.baseUrl + '/bmi',
          method: 'post',
          data: value,
        })
        console.log(data)
        console.log(value,"<<<<dari Bmi")
        this.listBmi = data
        console.log(this.listBmi,"<<<< dari BMIII")
      } catch (error) {
        console.log(error)
        Swal.fire("Cancelled", `${error.responseJSON.message}`, "error");
      }
    },

    async fetchRekomendasi(value){
      try {
        console.log(value,"<<<<dari rekomendasi 111")
        const {data} = await axios ({
          url: this.baseUrl + '/exercise/rekomendasi/'+ value,
          method: 'get',
          
        })
        console.log(data)
        console.log(value,"<<<<dari rekomendasi 2222")
        this.listRekomendasi = data
        console.log(this.listRekomendasi,"<<<< dari rekomendasi 123333")
      } catch (error) {
        console.log(error)
        Swal.fire("Cancelled", `${error.responseJSON.message}`, "error");
      }
    },

    async handleLogin(user){
      try {
        let result = await axios.post (this.baseUrl + '/login',user)
        localStorage.setItem("access_token",result.data.access_token)
        localStorage.setItem("email",result.data.email)
        localStorage.setItem("role",result.data.username)

        Swal.fire("Good job!", "Success Login!", "success");
        this.email = localStorage.email
        this.router.push('/')
      } catch (error) {
        console.log(error)
        Swal.fire("Cancelled", `${error.response.data.message}`, "error");
      }
    },

    async handleRegister(user){
      try {
        console.log(user)
        let data = await axios.post (this.baseUrl + '/register',user)
        Swal.fire("Good job!", "Success Register!", "success");
        this.router.push('/login')
      } catch (error) {
        console.log(error)
        Swal.fire("Cancelled", `${error.response.data.message}`, "error");
      }
    },

    async handleGithubLogin(response){
      try {
        console.log(response,"<<<<<<<<<ini response")
        const googleAccessToken = response.credential;
        const user = await axios ({
          url: this.baseUrl + '/pub/register/google',
          method: 'post',
          headers: {
            google_token: googleAccessToken,
          },
        })
        console.log(user,"<<<<<<<<<ini user")
        localStorage.setItem("access_token",user.data.access_token)
        localStorage.setItem("email",user.data.email)
        localStorage.setItem("role",user.data.role)

        Swal.fire("Good job!", "Success Login!", "success");
        this.email = localStorage.email
        this.router.push('/')
      } catch (error) {
        console.log(error)
        Swal.fire("Cancelled", `${error}`, "error");
      }
    },




   
  },
})

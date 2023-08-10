<template>
  <div class="flex flex-row">
    <div>
      <div class="block z-0">
        <span class="demonstration ">Date picker</span>
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="Pick a day"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
          :size="size"
        />
      </div>
      <div class="flex flex-col">
        <Table 
          v-for="(item,name,index) in meals"
          :key="index"
          :meal-name="item"
          :currentTime="value2"
        />
      </div>
      <textarea
        v-model="exeTextdetails"
        class="bg-gray-300 h-24 w-72"
      />
      <el-button
        round
        @click="savefile"
      >
        Save
      </el-button>
    </div>


    <div class="sidebar z-50 fixed float-right bg-gray-300">
      <SideBar page-type="exercise" />
    </div>
  </div>
</template>

<script>
import SideBar from '../utils/sideBar.vue'
import Table from '../utils/table.vue'
//import {exercise} from '../../data/mockExercise.json'
import {reactive, ref} from 'vue'
import * as moment from 'moment'

export default {
    components:{Table,SideBar},
    setup(){
      const exeTextdetails = ref(localStorage.getItem('exeText'))
      //const existData = localStorage.getItem('recordData')
        //const data =existData?exercise.concat(JSON.parse(existData)):exercise
        const meals = reactive(["morning","afternoon","evening"]),
        //mealData = reactive({}),
        value2=ref( moment(new Date()).format('YYYY-MM-DD'))
        // for(let i of data){
        //     if(mealData[i.type]) mealData[i.type].push(i)
        //     else mealData[i.type] = [i]
        // }
        return {meals,exeTextdetails,value2}
},mounted(){
  if(!this.value2){
    this.value2 = moment(new Date()).format('YYYY-MM-DD')
  }
},
  methods:{
savefile(){
  localStorage.setItem('exeText',this.foodTextdetails)
  }
  }
  }
</script>

<style scoped>
.sidebar {
  right: 0%;
}
</style>
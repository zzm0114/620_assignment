<template>
  <div>
    <h1 class=" text-sky-300 m-4">
      Fitapp
    </h1>
        
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >    
      <el-menu-item index="1">
        <template #title>
          Home
        </template>
      </el-menu-item>  
      <el-menu-item index="2">
        <template #title>
          Food
        </template>
      </el-menu-item>  
      <el-menu-item index="3">
        <template #title>
          Exercise
        </template>
      </el-menu-item>  
      <el-menu-item index="4">
        <template #title>
          Report
        </template>
      </el-menu-item>  
    </el-menu>

    <div v-if="index == '1'">
      <h1>Home page</h1>
    </div>
    <div v-if="index == '2'">
      <food />
    </div>
    <div v-if="index == '3'">
      <exerise />
    </div>
    <div v-if="index == '4'">
      <report />
    </div>
    <div v-if="index == '2'||index == '3'">
      <el-button
        round
        class="float-right"
        @click="index = '4'"
      >
        View Report
      </el-button>
    </div>
  </div>
</template>

<script>
import exerise from './exerise/exerise.vue';
import food from './food/food.vue';
import report from './report/report.vue';
import { ref } from 'vue'

export default {
    components:{exerise,food,report},
    setup(){
      localStorage.removeItem('sideData')
      localStorage.removeItem('weightData')
    const activeIndex = ref('2')
    return {activeIndex}
},
data(){
  return{
    index : "2"
  }
},
  methods:{
      handleSelect(key){
      this.index = key
  }
  }
  }

</script>
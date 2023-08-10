<template>
  <div class="mx-6">
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
    <div class="m-4">
      <span>Daily Calories income:</span>
      <div
        id="chart1container"
      />
    </div>
    <div class="m-4">
      <span>Daily Calories output:</span>
      <div
        id="chart2container"
      />
    </div>
  </div>
</template>

<script>
import {meal} from '../../data/mockMeal.json'
import {exercise} from '../../data/mockExercise.json'
import { Line } from '@antv/g2plot';
import {reactive, ref} from 'vue'
export default {
  
    setup(){
      const existData = localStorage.getItem('recordData')
              const mealList =["breakfast","lunch","snack"]
        ,exerciseList = ["morning","afternoon","evening"],mealChartData=[
            {
    "Date": "breakfast",
    "scales": 0
  },  {
    "Date": "lunch",
    "scales": 0
  },  {
    "Date": "snack",
    "scales": 0
  }
        ],
        exerciseChartData = [            {
    "Date": "morning",
    "scales": 0
  },  {
    "Date": "afternoon",
    "scales": 0
  },  {
    "Date": "evening",
    "scales": 0
  }]

        const data =existData?meal.concat(JSON.parse(existData)):meal,
        mealData = reactive({})
        for(let i of data){
            if(i.type) {
              const index = mealList.indexOf(i.type)
              if((index||index==0) && mealChartData[index])mealChartData[index].scales += Number(i.calories)
            }
        }
        const data2 =existData?exercise.concat(JSON.parse(existData)):exercise,
        exerciseData = reactive({}),value2=ref('')
        for(let i of data2){
            if(i.type) {
              const index = exerciseList.indexOf(i.type)
              if((index||index==0) && mealChartData[index])exerciseChartData[index].scales += Number(i.calories)
            }
        }

        return {mealChartData,exerciseChartData,value2}
},mounted(){
document.getElementById('chart1container').innerHTML=""
    this.draw();
    document.getElementById('chart2container').innerHTML=""
    this.draw2();
},        methods:{
            draw(){
                const line = new Line('chart1container', {
      data:this.mealChartData,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        // type: 'timeCat',
        tickCount: 5,
      },
    });

    line.render();
            },draw2(){
                const line = new Line('chart2container', {
      data:this.exerciseChartData,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        // type: 'timeCat',
        tickCount: 5,
      },
    });

    line.render();
            }

        }
}
</script>
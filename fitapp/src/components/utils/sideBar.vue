<template>
  <div>
    <div
      v-if="pageType == 'food'"
      class="flex flex-col"
    >
      <span>Water</span>
      <div
        id="piecontainer"
      />
      <span>Current Water:{{ sideData.water.amount }} ml</span>
      <div>
        <span>Add</span><input
          v-model="amountAdd"
          type="number"
        >
        <span>ml</span>
      </div>
      <span>Quick Add:</span>
      <div>   
        <input
          id="one"
          v-model="picked"
          type="radio"
          value="200"
        >
        <label for="one">One Cup</label>
      </div><div>
        <input
          id="two"
          v-model="picked"
          type="radio"
          value="600"
        >
        <label for="two">One bottle</label>
      </div>
    </div>

    <div v-if="pageType == 'exercise'">
      <div
        id="piecontainer"
      />
      <span>Weight:{{ weight }} 

        <input
          v-model="weightValue"
          type="number"
        >kg</span>
    </div>
    <div>
      <el-button @click="change">
        Submit
      </el-button>
      <el-button @click="close">
        Close
      </el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { Liquid } from '@antv/g2plot';
import { Line } from '@antv/g2plot';

export default {props:{
        pageType:{
            type:String,
            default:'N/A'
        },},
    setup() {
        const rawData = localStorage.getItem('sideData'),
        weightRawData = localStorage.getItem('weightData'),
        data = JSON.parse(rawData),weightData = weightRawData?JSON.parse(weightRawData):[0]
        ,weightValue = ref(weightData[weightData.length-1])
        let sideData= reactive({water:{amount:0}})
        if(data && data.water){
         sideData= reactive(data)
        } 
        const amountAdd = ref(0),picked = ref(''),weightChartData=reactive([])
        for(let i=0;i<weightData.length;i++){
            weightChartData.push({time:i,weight:weightData[i]})
        }
        return {amountAdd,sideData,picked,weightValue,weightChartData}
    },
        mounted() {
            if(this.pageType=='food'){
    document.getElementById('piecontainer').innerHTML=""
    this.draw();}else if(this.pageType=='exercise'){
         document.getElementById('piecontainer').innerHTML=""
this.draw3();

    }},
        methods:{
            change(){
if(this.pageType=='food'){
                this.sideData.water.amount =Number(this.sideData.water.amount)+ Number(this.amountAdd?this.amountAdd:this.picked)

                 const rawData = localStorage.getItem('sideData')
                 let data = JSON.parse(rawData)
                 if(data && data.water)data.water = {amount:this.sideData.water.amount}
                 else if(data){
                    data = Obejct.assign(data,{water:{amount:this.sideData.water.amount}})
                 }else{
                    data = {
                        water:{amount:this.sideData.water.amount}
                    }
                 }

                 localStorage.setItem('sideData',JSON.stringify(data))
                 document.getElementById('piecontainer').innerHTML=""
                this.draw2(this.sideData.water.amount)}
                else{
                    const weightRawData = localStorage.getItem('weightData'),
                        weightData = weightRawData?JSON.parse(weightRawData):[0]
                        weightData.push(this.weightValue)
                         localStorage.setItem('weightData',JSON.stringify(weightData))
                                          document.getElementById('piecontainer').innerHTML=""
                this.weightChartData.push({time:this.weightChartData.length,weight:this.weightValue})
                this.draw3()}
                
            },
            draw(){
                const liquidPlot = new Liquid('piecontainer', {
                    percent: this.sideData.water.amount/2000,
                    outline: {
                    border: 4,
        distance: 8,
  },
  wave: {
    length: 128,
  },
});
liquidPlot.render();
            },
                        draw2(amount){
                const liquidPlot = new Liquid('piecontainer', {
                    percent: amount/2000,
                    outline: {
                    border: 4,
        distance: 8,
  },
  wave: {
    length: 128,
  },
});
liquidPlot.render();
            },            draw3(){
                const line = new Line('piecontainer', {
      data:this.weightChartData,
      padding: 'auto',
      xField: 'time',
      yField: 'weight',
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
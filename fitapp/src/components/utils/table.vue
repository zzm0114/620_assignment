<template>
  <div>
    <div class="flex flex-row place-content-between items-center">
      <div class="flex flex-col">
        <div>
          <span>{{ mealName }}</span>
          <el-button
            round
            @click="open = true"
          >
            add
          </el-button>
        </div>
        <el-table 
          :data="tableData" 
          row-key="id"
          border
          default-expand-all
        >
          <el-table-column
            width="150px"
            v-for="(item,name,index) in lists"
            :key="index"
            :prop="item"
            :label="item"
            sortable
          />
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick"
          >
            Remove
          </el-button>
        </el-table>
      </div>
      <div
        :id="mealName"
      />
    </div>
    <div
      v-if="open&&!addNew"
      class="modal border-2 border-black bg-white"
    >
      <div class="bg-white">
        <Add
          :table-type="tableType"
          :AddType="mealName"
          :currentTime="currentTime"
          @addItemNew="addItemNew"
        />
        <el-button
          round
          @click="addNew = true"
        >
          Add New
        </el-button>
        <el-button
          round
          @click="closeAdd"
        >
          Close
        </el-button>
      </div>
    </div>
    <div
      v-if="open&&addNew"
      class="modal border-2 border-black bg-white"
    >
      <div class="bg-white">
        <AddNew />
        <el-button
          round 
          @click="addNew = false && this.$forceUpdate()"
        >
          Close
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive,ref } from 'vue'
import Add from '../utils/add.vue'
import AddNew from '../utils/addNew.vue'
import { Pie } from '@antv/g2plot';
import {meal} from '../../data/mockMeal.json'
import {exercise} from '../../data/mockExercise.json'

export default {
    name:"Table",
    components:{Add,AddNew},
    props:{
        mealName:
        {type:String,default:"meal"},
                pageType:{
            type:String,
            default:'N/A'
        },
        // tableData:{
        //     type:Object,
        //     default:()=>{}
        // },
        tableType:{
            type:String,
            default:'N/A'
        },currentTime:{
          type:String,
          default:'1990-01-01'
        }
    },watch:{
    //   currentTime(newi,oldi){
 
    //      for(let i of this.rawData){
    //         if(i.type == this.mealName && i.time.substring(0,10) == this.currentTime.substring(0,10))this.tableData.push(i) 
    //     }
    //     this.lists = this.tableType == 'meal'?["name","calories","fat","protein","sodium","sugar","time"]:["name","calories","time"]
    //         if(this.pageType=='food' && this.tableData && this.tableData.length){
    //           const lists = ["calories","fat","protein","sodium","sugar"]
    //           for(let i of lists)this.chartData.push({'type':i,'value':0})
    //          this.tableData.map((data)=>{
    //             for(let j=0;j<lists.length;j++){
    //               if(data[lists[j]]) this.chartData[j].value += Number(data[lists[j]]) 
    //             }
    //           })
    //           this.containerId = `contain${this.mealName}` 
    // document.getElementById(this.mealName).innerHTML=""
    // this.draw();}else if(this.pageType=='exercise'){

    // }
    //   }
    },
    setup(){
      const lists = reactive(["name","calories","time"]),chartData = reactive([]),containerId = ref(`container`)
       
       const mockData = exercise.concat(meal),
        existData = localStorage.getItem('recordData'),
         rawData =existData?mockData.concat(JSON.parse(existData)):mockData,

         tableData = reactive([])

      return {lists,chartData,containerId,tableData,rawData}
    },
    data(){
        return {
            open :false,
            addNew:false
        }
    },mounted(){
          //let tableDataType = []
         for(let i of this.rawData){
          //console.log(i.type,this.mealName)
          //this.tableDataType.push(i) 
            if(i.type == this.mealName && i.time.substring(0,10) == this.currentTime.substring(0,10))this.tableData.push(i) 
        }
        //console.log('a',tableDataType)
        //this.tableData = tableDataType
        this.lists = this.tableType == 'meal'?["name","calories","fat","protein","sodium","sugar","time"]:["name","calories","time"]
            if(this.pageType=='food' && this.tableData && this.tableData.length){
              const lists = ["calories","fat","protein","sodium","sugar"]
              for(let i of lists)this.chartData.push({'type':i,'value':0})
             this.tableData.map((data)=>{
                for(let j=0;j<lists.length;j++){
                  if(data[lists[j]]) this.chartData[j].value += Number(data[lists[j]]) 
                }
              })
              this.containerId = `contain${this.mealName}` 
    document.getElementById(this.mealName).innerHTML=""
    this.draw();}else if(this.pageType=='exercise'){
         //document.getElementById('container1').innerHTML=""
//this.draw2();
    }
    // if(this.tableData){const tableDataInUse = this.tableData.filter(data=>data.time && data.time.substring(0,10) == this.currentTime.substring(0,10))
    //   console.log(this.tableData,tableDataInUse,this.currentTime,this.currentTime.substring(0,10))}

    },methods:{
      addItemNew(){
        //console.log('active')
               const mockData = exercise.concat(meal),
        existData = localStorage.getItem('recordData'),
         rawData =existData?mockData.concat(JSON.parse(existData)):mockData
         this.tableData=[]
                 for(let i of rawData){
          //console.log(i.type,this.mealName)
          //this.tableDataType.push(i) 
            if(i.type == this.mealName)this.tableData.push(i) 
        }
        this.open = false
      },
      draw(){
        const piePlot = new Pie(this.mealName, {
  appendPadding: 10,
  data:this.chartData,
  angleField: 'value',
  colorField: 'type',
  radius: 0.9,
  label: {
    type: 'inner',
    offset: '-30%',
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [{ type: 'element-active' }],
});

piePlot.render();
      },      draw2(){
        const piePlot = new Pie(this.mealName, {
  appendPadding: 10,
  data:this.chartData,
  angleField: 'value',
  colorField: 'type',
  radius: 0.9,
  label: {
    type: 'inner',
    offset: '-30%',
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [{ type: 'element-active' }],
});

piePlot.render();
      }, closeAdd(){
this.open = false 
 this.$forceUpdate()
    }
    }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 10%;
  height: 70%;
  width: 70%;
}
</style>
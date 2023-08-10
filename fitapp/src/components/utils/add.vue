<template>
  <div>
    <div>
      <h1>Add item</h1>
      <input class="border-black border-2" v-model="searchKey"><el-button round
        @click="search">Search</el-button>
   <el-button round
        @click="reset">Reset</el-button>
   
    </div>

    <div :key="a">
      <div v-if="tableType == 'meal'">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >    
          <el-menu-item index="1">
            <template #title>
              Food
            </template>
          </el-menu-item>  
          <el-menu-item index="2">
            <template #title>
              Recipe
            </template>
          </el-menu-item>  
          <el-menu-item index="3">
            <template #title>
              Meal
            </template>
          </el-menu-item>  
          <el-menu-item index="4">
            <template #title>
              Previous
            </template>
          </el-menu-item>  
        </el-menu>
      </div>
      <div v-if="tableType != 'meal'">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >    
          <el-menu-item index="1">
            <template #title>
              Exercise
            </template>
          </el-menu-item>  
          <el-menu-item index="2">
            <template #title>
              Set
            </template>
          </el-menu-item>  
          <el-menu-item index="3">
            <template #title>
              Previous
            </template>
          </el-menu-item>  
        </el-menu>
      </div>
      <div v-if="index == '1' && tableType == 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="food"
          @addItemNew="addItemNew"
          :currentTime="currentTime"
        />
      </div>
      <div v-if="index == '2' && tableType == 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="recipe"
          @addItemNew="addItemNew"
          :currentTime="currentTime"
        />
      </div>
      <div v-if="index == '3' && tableType == 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="meal"
          @addItemNew="addItemNew"
          :currentTime="currentTime"
        />
      </div>
      <div v-if="index == '4' && tableType == 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="previous"
          @addItemNew="addItemNew"
          :currentTime="currentTime"
        />
      </div>

      <div v-if="index == '1' && tableType != 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="exercise"
          @addItemNew="addItemNew"
          :currentTime="currentTime"
        />
      </div>
      <div v-if="index == '2' && tableType != 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="set"
          @addItemNew="addItemNew"
          :currentTime="currentTime"
        />
      </div>
      <div v-if="index == '3' && tableType != 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="exercisePrevious"
          @addItemNew="addItemNew"
          :currentTime="currentTime"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import Detail from './detail.vue'
import {itemsRaw} from '../../data/mockFood.json'

export default {
    components:{Detail},props:{
  AddType:{
    type:String,
    default:'N/A'
  },tableType:{
            type:String,
            default:'N/A'
        },currentTime:{
          type:String,
          default:'1990-01-01'
        }
},
    setup() {
        const rawData = localStorage.getItem('popData')
        const searchKey = ref(''),
        items = reactive(rawData?itemsRaw.concat(JSON.parse(rawData)):itemsRaw)
        ,food =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="food"))
        ,recipe =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="recipe"))
        ,meal =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="meal"))
        ,previous =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="previous"))
        ,exercise =  reactive(items.filter((i)=>i.type=='exercise'&&i.subType=="exercise"))
        ,set =  reactive(items.filter((i)=>i.type=='exercise'&&i.subType=="set"))
        ,exercisePrevious =  reactive(items.filter((i)=>i.type=='exercise'&&i.subType=="previous"))
,a = ref(0)
        const activeIndex = ref('1')

        
        return {a,searchKey,items,food,activeIndex,recipe,meal,previous,exercise,set,exercisePrevious}
    },  data(){
  return{
    index : "1"
  }
},

methods:{
      addItemNew(){
      this.$emit("addItemNew")
    },
      handleSelect(key){
      this.index = key
    },
  search(){
 const rawData = localStorage.getItem('popData'),
    
         items = rawData?itemsRaw.concat(JSON.parse(rawData)):itemsRaw
        this.items = items.filter((data)=>JSON.stringify(data).includes(this.searchKey))
        ,this.food =  this.items.filter((i)=>i.type=='food'&&i.subType=="food")
        ,this.recipe =  this.items.filter((i)=>i.type=='food'&&i.subType=="recipe")
        ,this.meal =  this.items.filter((i)=>i.type=='food'&&i.subType=="meal")
        ,this.previous =  this.items.filter((i)=>i.type=='food'&&i.subType=="previous")
        ,this.exercise =  this.items.filter((i)=>i.type=='exercise'&&i.subType=="exercise")
        ,this.set =  this.items.filter((i)=>i.type=='exercise'&&i.subType=="set")
        ,this.exercisePrevious =  this.items.filter((i)=>i.type=='exercise'&&i.subType=="previous")
  this.a +=1
      //  const rawData = localStorage.getItem('popData')
      //  console.log(JSON.parse(rawData).filter(e => JSON.stringify(e).includes(this.searchKey)))
      //   let items = reactive(rawData?itemsRaw.concat(JSON.parse(rawData).filter(e => JSON.stringify(e).includes(this.searchKey)) ):itemsRaw)
      //   let food =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="food"))
      //   ,recipe =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="recipe"))
      //   ,meal =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="meal"))
      //   ,previous =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="previous"))
      //   ,exercise =  reactive(items.filter((i)=>i.type=='exercise'&&i.subType=="exercise"))
      //   ,set =  reactive(items.filter((i)=>i.type=='exercise'&&i.subType=="set"))
      //   ,exercisePrevious =  reactive(items.filter((i)=>i.type=='exercise'&&i.subType=="previous"))
      //   console.log(items);
      //   this.items = items
      //   this.food = food

  
  },  reset(){
 const rawData = localStorage.getItem('popData'),
    
         items = rawData?itemsRaw.concat(JSON.parse(rawData)):itemsRaw
        this.items = items.filter((data)=>data.name.includes(''))
        ,this.food =  this.items.filter((i)=>i.type=='food'&&i.subType=="food")
        ,this.recipe =  this.items.filter((i)=>i.type=='food'&&i.subType=="recipe")
        ,this.meal =  this.items.filter((i)=>i.type=='food'&&i.subType=="meal")
        ,this.previous =  this.items.filter((i)=>i.type=='food'&&i.subType=="previous")
        ,this.exercise =  this.items.filter((i)=>i.type=='exercise'&&i.subType=="exercise")
        ,this.set =  this.items.filter((i)=>i.type=='exercise'&&i.subType=="set")
        ,this.exercisePrevious =  this.items.filter((i)=>i.type=='exercise'&&i.subType=="previous")
  this.a +=1
      //  const rawData = localStorage.getItem('popData')
      //  console.log(JSON.parse(rawData).filter(e => JSON.stringify(e).includes(this.searchKey)))
      //   let items = reactive(rawData?itemsRaw.concat(JSON.parse(rawData).filter(e => JSON.stringify(e).includes(this.searchKey)) ):itemsRaw)
      //   let food =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="food"))
      //   ,recipe =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="recipe"))
      //   ,meal =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="meal"))
      //   ,previous =  reactive(items.filter((i)=>i.type=='food'&&i.subType=="previous"))
      //   ,exercise =  reactive(items.filter((i)=>i.type=='exercise'&&i.subType=="exercise"))
      //   ,set =  reactive(items.filter((i)=>i.type=='exercise'&&i.subType=="set"))
      //   ,exercisePrevious =  reactive(items.filter((i)=>i.type=='exercise'&&i.subType=="previous"))
      //   console.log(items);
      //   this.items = items
      //   this.food = food

  
  }
  }
}
</script>
<template>
  <div>
    <div>
      <h1>Add item</h1>
      <el-button round
        @click="search">Search</el-button><input class="border-black border-2" v-model="searchKey">
    </div>

    <div>
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
        />
      </div>
      <div v-if="index == '2' && tableType == 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="recipe"
          @addItemNew="addItemNew"
        />
      </div>
      <div v-if="index == '3' && tableType == 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="meal"
          @addItemNew="addItemNew"
        />
      </div>
      <div v-if="index == '4' && tableType == 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="previous"
          @addItemNew="addItemNew"
        />
      </div>

      <div v-if="index == '1' && tableType != 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="exercise"
          @addItemNew="addItemNew"
        />
      </div>
      <div v-if="index == '2' && tableType != 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="set"
          @addItemNew="addItemNew"
        />
      </div>
      <div v-if="index == '3' && tableType != 'meal'">
        <Detail
          :AddType="AddType"
          class="w-full"
          :item-data-all="exercisePrevious"
          @addItemNew="addItemNew"
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

        const activeIndex = ref('1')

        
        return {searchKey,items,food,activeIndex,recipe,meal,previous,exercise,set,exercisePrevious}
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
  },search(){
        this.items = this.items.filter((data)=>data.name.includes(this.searchKey))
        ,this.food =  this.items.filter((i)=>i.type=='food'&&i.subType=="food")
        ,this.recipe =  this.items.filter((i)=>i.type=='food'&&i.subType=="recipe")
        ,this.meal =  this.items.filter((i)=>i.type=='food'&&i.subType=="meal")
        ,this.previous =  this.items.filter((i)=>i.type=='food'&&i.subType=="previous")
        ,this.exercise =  this.items.filter((i)=>i.type=='exercise'&&i.subType=="exercise")
        ,this.set =  this.items.filter((i)=>i.type=='exercise'&&i.subType=="set")
        ,this.exercisePrevious =  this.items.filter((i)=>i.type=='exercise'&&i.subType=="previous")
  }
  }
}
</script>
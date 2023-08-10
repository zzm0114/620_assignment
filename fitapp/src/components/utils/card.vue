<template>
  <div class="border-2 border-black">
    <div class="flex flex-row">
      <div class="flex items-center justify-center overflow-hidden w-full h-full" style="max-width: 200px; max-height: 200px;">
        <img
          :src="itemData.src"
        >
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row m-1">
          <el-button
            round
            @click="addFood"
          >
            Add
          </el-button>
          <input
            v-model="amount"
            type="number"
            class="bg-gray-300 w-1/2"
          > unit
        </div>
        <div class="flex flex-col ml-3">
          <span
            v-for="(item,name,index) in itemData.data"
            :key="index"
          >
            {{ item.name }} : {{ item.value }}
          </span>
        </div>
      </div>
    </div>
    <span />
  </div>
</template>
<script>
import { reactive,ref } from 'vue'
import * as moment from 'moment'
export default {
    name:'Card',props:{
        itemData:{
            type:Object,
            default:()=>{}
        },AddType:{
    type:String,
    default:'N/A'
  },currentTime:{
          type:String,
          default:'1990-01-01'
        }
    },
    setup() {
        const data =reactive([]),amount = ref(0)
        return {data,amount}
    },mounted(){
 
    },
    
    methods:{
        addFood(){
          if(this.amount && this.amount>0){
            const dic={}
            for(let i of this.itemData.data){
                dic[i.name] = i.value
            }
                    const existData = localStorage.getItem('recordData'), exist = JSON.parse(existData)
        const newData = 
        
        {name:`${dic['name']} ${this.amount} unit${this.amount>1?'s':''}`,type:this.AddType,
        calories:dic['calories']?Number(dic['calories'])*this.amount:0,
        fat:dic['fat']?Number(dic['fat'])*this.amount:0,
    protein:dic['protein']?Number(dic['protein'])*this.amount:0,
    sodium:dic['sodium']?Number(dic['sodium'])*this.amount:0,
    sugar:dic['sugar']?Number(dic['sugar'])*this.amount:0,"time":this.currentTime?moment(this.currentTime).format('YYYY-MM-DD'): moment(new Date()).format('YYYY-MM-DD')
        }
        if(existData){
            exist.push(newData)
            localStorage.setItem('recordData',JSON.stringify(exist))
        } else localStorage.setItem('recordData',JSON.stringify([newData]))
        this.$emit('addItemNew')}
        }
    }
}
</script>
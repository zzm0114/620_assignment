<template>
  <div class="flex flex-col">
    <div class="flex flex-row">
      <Card 
        v-for="(item,name,index) in items1"
        :key="index"
        class=" w-1/2"
        :AddType="AddType"
        :item-data="item"
        @addItemNew="addItemNew"
      />
    </div>
    <div class="flex flex-row">
      <Card
        v-for="(item,name,index) in items2"
        :key="index"
        class=" w-1/2"
        :AddType="AddType"
        :item-data="item"
        @addItemNew="addItemNew"
      />
    </div>
    <div>
      <el-pagination
        v-model:current-page="currentPage"
        layout="prev, pager, next"
        :page-size="4"
        :pager-count="11"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import Card from './card.vue'
import {reactive, ref} from 'vue'

export default {
    name:'Detail',
    components:{Card},
props:{
        itemDataAll:{
            type:Object,
            default:()=>{}
        },AddType:{
    type:String,
    default:'N/A'
  }
    },
  setup() {
    const total = ref(0),currentPage= ref(1)
    ,items1 = reactive([]),items2=reactive([])
    return {total,currentPage,items1,items2}
  },mounted(){
    this.total = this.itemDataAll.length
    this.items1Data = this.itemDataAll.slice(0,2)
    this.items1Data.map((iData)=>{
      const tData={data:[],src:''}
            for(let key in iData){
            if(iData[key] && !['src','type','subType','nutrient','manual'].includes(key))
            {
            tData.data.push({name:key,value:iData[key]})
            }
            if(key=='nutrient'){               
                for(let i of iData[key])tData.data.push(i)}
            if(key=='src') tData.src = iData[key]
        }
        this.items1.push(tData)
    })



    this.items2Data = this.itemDataAll.slice(2,4)

        this.items2Data.map((iData)=>{
      const tData={data:[],src:''}
            for(let key in iData){
            if(iData[key] && !['src','type','subType','nutrient','manual'].includes(key))
            {
            tData.data.push({name:key,value:iData[key]})
            }
            if(key=='nutrient'){               
                for(let i of iData[key])tData.data.push(i)}
            if(key=='src') tData.src = iData[key]
        }
        this.items2.push(tData)
    })

  },methods:{
    addItemNew(){
      this.$emit("addItemNew")
    },
      handleCurrentChange(){
            this.items1 = []
            this.items2 = []

                this.items1Data = this.itemDataAll.slice((this.currentPage-1)*4,(this.currentPage-1)*4+2)
    this.items1Data.map((iData)=>{
      const tData={data:[],src:''}
            for(let key in iData){
            if(iData[key] && !['src','type','subType','nutrient','manual'].includes(key))
            {
            tData.data.push({name:key,value:iData[key]})
            }
            if(key=='nutrient'){               
                for(let i of iData[key])tData.data.push(i)}
            if(key=='src') tData.src = iData[key]
        }
        this.items1.push(tData)
    })



    this.items2Data = this.itemDataAll.slice((this.currentPage-1)*4+2,(this.currentPage)*4)

        this.items2Data.map((iData)=>{
      const tData={data:[],src:''}
            for(let key in iData){
            if(iData[key] && !['src','type','subType','nutrient','manual'].includes(key))
            {
            tData.data.push({name:key,value:iData[key]})
            }
            if(key=='nutrient'){               
                for(let i of iData[key])tData.data.push(i)}
            if(key=='src') tData.src = iData[key]
        }
        this.items2.push(tData)
    })
      }
    }
}
</script>
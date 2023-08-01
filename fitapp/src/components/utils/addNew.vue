<template>
  <div class="flex flex-row m-2">
    <div class="info-add flex flex-col w-1/2 ">
      <span>Basic Data:</span>
      <div class="my-4">
        <span>Type : </span>
        <el-dropdown
          class="border-1 border-blue-300"
          split-button
          type="primary"
          @command="handleCommand"
        >
          <span class="text-blue-300"> {{ type }}</span>
          <template #dropdown>
            <el-dropdown-menu class="flex flex-col ">
              <el-dropdown-item command="food">
                Food
              </el-dropdown-item>
              <el-dropdown-item command="exercise">
                Exercise
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div class="my-4">
        <span>Subtype : </span>
        <el-dropdown
          class="border-1 border-blue-300"
          split-button
          type="primary"
          @command="handleCommand2"
        >
          <span class="text-blue-300"> {{ subType }}</span>
          <template #dropdown>
            <el-dropdown-menu class="flex flex-col ">
              <el-dropdown-item
                v-if="type=='food'"
                command="food"
              >
                Food
              </el-dropdown-item>
              <el-dropdown-item
                v-if="type=='food'"
                command="recipe"
              >
                Recipe
              </el-dropdown-item>
              <el-dropdown-item
                v-if="type=='exercise'"
                command="exercise"
              >
                Exerise
              </el-dropdown-item>
              <el-dropdown-item
                v-if="type=='exercise'"
                command="set"
              >
                Set
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      
      <div class="my-4">
        <span>Name : </span><input
          v-model="nameData"
          class="bg-gray-300"
        >
      </div>
      

      <div class="my-4">
        <span>Pic Link: </span><input
          v-model="src"
          class="bg-gray-300"
        >
      </div>

      <span>Nutrient Detail Data :</span>
      <textarea
        v-model="details"
        placeholder="Example: fat:100,protein:100"
        class="bg-gray-300 h-24"
      />
      <span>Description :</span>
      <textarea
        v-model="description"
        placeholder="Please Enter Here"
        class="bg-gray-300 h-24"
      />
    </div>

    <div class="calculate-field flex flex-col w-1/2">
      <span>Calculate usage Data:</span>

      <div class="my-4">
        <span>calories: </span><input
          v-model="calories"
          class="bg-gray-300"
        >
      </div>


      <div v-if="type!='Select the item type'&&subType!='Select the item type'">
        <el-button
          round
          @click="submitNewItem"
        >
          Submit
        </el-button>
      </div>
      <div v-else>
        <el-button
          round
          disabled
          @click="submitNewItem"
        >
          Submit
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from 'vue'
export default {
    name:'AddNew',
    setup() {
        const type = ref('Select the item type'),subType = ref('Select the item type'),details=ref('')
    
    ,nameData=ref(''),src=ref(''),calories=ref(''),description=ref('')
    return {type,details,nameData,src,calories,subType,description}
    },methods:{
      handleCommand(choice){
        this.type = choice
      },      handleCommand2(choice){
        this.subType = choice
      },
      submitNewItem(){
        const detailRawData = this.details.split(','),detailData =[]
        if(detailRawData.length){
          for(let data of detailRawData){
            const oneDetail = data.split(':')
            if(oneDetail && oneDetail.length>1) detailData.push({
              name:oneDetail[0],value:oneDetail[1]
            })
          }
        }

        const existData = localStorage.getItem('popData'), exist = JSON.parse(existData)
        const newData = {name:this.nameData,type:this.type,subType:this.subType,src:this.src,description:this.description,nutrient:detailData,calories:this.calories}
        if(existData){
            exist.push(newData)
            localStorage.setItem('popData',JSON.stringify(exist))
        } else localStorage.setItem('popData',JSON.stringify([newData]))
        

      }
    }
}
</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
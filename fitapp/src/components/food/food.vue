<template>
  <div>
    <div class="block">
      <span class="demonstration">Date picker</span>
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="Pick a day"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        :size="size"
      />
    </div>


    <Table />
  </div>
</template>

<script>
import Table from '../utils/table.vue'
export default {
    components:{Table},
    setup(){

},
data(){
  return{

  }
},
  methods:{
      handleSelect(key, keyPath){
      this.index = key
  }
  }
  }
</script>
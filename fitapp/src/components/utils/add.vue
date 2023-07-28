<template>
  <div>
    <h1>Add</h1>
    <div>Search</div>
    <div>
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
    </div>
  </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>
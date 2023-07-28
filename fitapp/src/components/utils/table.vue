<template>
  <el-table
    :data="tableData"
    class="bg-black"
    style="width: 80%; margin-bottom: 20px; "
    row-key="id"
    border
    default-expand-all
  >
    <el-table-column
      prop="date"
      label="Date"
      sortable
    />
    <el-table-column
      prop="date"
      label="Date"
      sortable
    />
    <el-table-column
      prop="name"
      label="Name"
      sortable
    />
    <el-table-column
      prop="address"
      label="Address"
      sortable
    />
  </el-table>
</template>

<script>

</script>
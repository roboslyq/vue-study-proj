<template>
  <el-table  :data="tableData" height="500" border style="width: 100%">
    <el-table-column fixed prop="birthday" label="日期" width="100%"></el-table-column>
    <el-table-column prop="name" label="姓名" width="200%"></el-table-column>
    <el-table-column prop="province" label="省份" width="100%"></el-table-column>
    <el-table-column prop="city" label="市区" width="100%"></el-table-column>
    <el-table-column prop="address" label="地址" width="300%"></el-table-column>
    <el-table-column prop="zip" label="邮编" width="100%"></el-table-column>
    <el-table-column  label="操作" width="100%">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
    created() {
        console.log('进入页面初始化')
        // debugger
        this.isShowLoading = true
        this.$axios.get('/user/findAll')
        .then(response => {
            console.log(response)
            this.tableData = response
        }).catch(error => {
            console.log(error)
            this.isShowLoading = false
        })
    },
    methods: {
        handleClick(row) {
            console.log(row)
        },
    },
    data() {
        return {
            tableData: [],
        }
    },
}
</script>
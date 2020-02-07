<template>
    <div style="padding: 10px">
        <div style="background: #fff; border-radius: 8px; padding: 20px;">
            <div class="query-c">
                查询：
                <Input search placeholder="请输入查询内容" style="width: auto" />
            </div>
            <br>
            <Button @click="handleSelectAll(true)">全选</Button>
            <Button @click="handleSelectAll(false)">取消全选</Button>
            <Button @click="generateSelected()">生成</Button>
            <Table border ref="selection"  :columns="tableColumns" :data="tableData"></Table>
            <br>
            <Page :total="100" show-sizer show-elevator/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tools-generator',
    data() {
        return {
            tableColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '表名',
                    key: 'tableName',
                },
                {
                    title: 'DB引擎',
                    key: 'engine',
                },
                {
                    title: '表说明',
                    key: 'tableComment',
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                },
            ],
            tableData: [],
        }
    },
    created() {
        // debugger
        this.isShowLoading = true
        this.$axios.get('/tools/generator/page')
        .then(response => {
            this.tableData = response
        }).catch(error => {
            console.log(error)
            this.isShowLoading = false
        })
    },
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status)
        },
        generateSelected() {
            let arraySelected = this.$refs.selection.getSelection()
            if (!arraySelected || arraySelected.length == 0) {
                alert('请选择需要生成的表')
                return
            }
            let reqParams = ''
            arraySelected.forEach((value, index) => {
                reqParams += value.tableName + ','
            })
            this.isShowLoading = true
            // this.$axios.get('/tools/generator/code?tables=' + reqParams, { responseType: 'blob' })
            // this.$axios.get('http://localhost:8082/tools/generator/code/', {
            this.$axios.get('/tools/generator/code/', {
                params: {
                    tables: reqParams,
                    responseType: 'blob', // 服务器返回的数据类型
                },
            },)
            .then(response => {
                // const typeRes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' // excel文件
                const typeRes = 'application/zip'// ZIP文件
                let blob = new Blob([response])
                let downloadElement = document.createElement('a')
                let href = window.URL.createObjectURL(blob) // 创建下载的链接
                downloadElement.href = href
                downloadElement.download = '用户数据.zip' // 下载后文件名
                document.body.appendChild(downloadElement)
                downloadElement.click() // 点击下载
                document.body.removeChild(downloadElement)// 下载完成移除元素
                window.URL.revokeObjectURL(href) // 释放掉blob对象
                console.log(response)
                this.isShowLoading = false
            }).catch(error => {
                console.log(error)
                this.isShowLoading = false
            })
        },
    },
}
</script>

<style scoped>

</style>
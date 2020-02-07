<template>
    <div style="padding: 10px">
    </div>
</template>

<script>
export default {
    name: 'monitorManager',
    created() {
        // TODO 从菜单中的href属性获取，目前菜单没有返回href属性
        window.open('http://127.0.0.1:8764/', '_blank')
    },
}
</script>

<style scoped>

</style>
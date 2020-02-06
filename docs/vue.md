# vue基础教程
## .vue 文件结构
```
<template>
  <div class="container">
   </div>
</template>

<script type="text/ecmascript-6">
export default {
    data(){
        return{
        // 数据
        };
    },
    components:{
      // 组件注册
    },
    beforeCreate(){
      // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
    },
    create(){
      // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
    },
    beforeMount(){
      // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    },
    mounted(){
      // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
    },
    beforeUpdate(){
      // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
    },
    updated(){
      // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
      // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环
    },
    beforeDestroy(){
      // 实例销毁之前调用。在这一步，实例仍然完全可用。 
    },
    destroyed(){
      // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。
    },
    computed:{
      // 计算属性
    },
    watch:{
      // 数据监听
    },
    methods:{
      // 方法定义
    }
}
</script>
<style>
  // css 样式
</style>
```
> 各参数/方法使用场景
components:{ // 组件注册 },：局部声明组件
create(){ },: 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
mounted(){ }, : 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。例：比如插件chart.js的使用: var ctx = document.getElementById(ID);
computed:{ // 计算属性 }, : 计算属性(computed)是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
watch:{ // 数据监听 }, : Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 watch

作者：不爱去冒险的少年y
链接：https://www.jianshu.com/p/da79b4b7cdec
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


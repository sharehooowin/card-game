<template>
	<div id="Demo-container" class="Demo-container">
		Demo
	</div>
</template>

<script type="text/javascript">
import data from './data'
import methods from './module'
// import watch from './watch'
// import computed from './computed'
// import filters from './filters'
// import {  } from '@/common'

export default {
	name: 'Demo',
	data,
	// 属性
	props: [],
	// 组件
	components: {},
	// 函数
	methods,
	mounted:function(){
	    // this.init();
	},
	// 监听
	watch: {},
	// 计算
	computed: {},
	// 过滤
	filters: {},
}
</script>

<style lang="scss">
.Demo-container{

}
</style>

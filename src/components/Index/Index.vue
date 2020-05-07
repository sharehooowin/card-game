<template>
	<div ref="indexContainer" id="Index-container" class="Index-container">

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
	name: 'Index',
	data,
	// 属性
	props: [],
	// 组件
	components: {},
	mounted(){
		this.init();
	},
	// 函数
	methods,
	// 监听
	watch: {},
	// 计算
	computed: {},
	// 过滤
	filters: {},
}
</script>

<style type="text/scss" lang="scss">
.Index-container{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height:100%;
	min-height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: scroll;

}
</style>

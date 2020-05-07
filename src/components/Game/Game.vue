<template>
	<div id="Game-container" class="Game-container">
		<div class="time-container">
			<div class="progress"></div>
			<div class="clock"></div>
		</div>
		<div class="card-container" :style="`width:calc((100vw - 50px)`">
			<div class="card-item" v-for="(item,key) in current" :key="item.key" :style = " `width:calc((100vw - ${currentRound+1} * 10px - 50px) / ${currentRound+1} );height:calc((100vw - ${currentRound+1} * 10px - 50px) / ${currentRound+1} )`">
				<div class="front cover">
					<div class="front-img" :style="'backgroundImage:url('+ item.url +')'"></div>
				</div>
				<div class="back cover" @click="(e)=>handleClick(e,item)"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import data from './data'
import methods from './module'
// import watch from './watch'
import computed from './computed'
// import filters from './filters'
// import {  } from '@/common'

export default {
	name: 'Game',
	data,
	// 属性
	props: [],
	// 组件
	components: {},
	// 函数
	methods,
	created(){
	    this.initData();
	    this.setRound(this.total);
	    this.sort();
	},
	mounted:function(){
	    // this.init();
	},
	// 监听
	watch: {},
	// 计算
	computed: computed,
	// 过滤
	filters: {},
}
</script>

<style lang="scss">
.Game-container{
	width:100%;
	height:100%;
	background: linear-gradient(160deg,#aa7ecd 0%, #02ccba 100%);

	.time-container{
		position:absolute;
		width:65%;
		height:5px;
		top:10%;
		left:55%;
		transform: translateX(-50%);
		border: 2px solid blue;
		border-radius:10px;

		.progress{
			height:100%;
			width:100%;
			background: rgba(68,184,0,1);
		}
		.clock{
			width:1.63rem;
			height:1.69rem;
			@include hasBg;
			background-image: url(../../assets/img/clock.png);
			position:absolute;
			left:0;
			top:50%;
			transform: translate(-75%,-70%);
		}
	}

	.card-container{
		width:100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		position:absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
		flex-wrap: wrap;
		padding:15px;
		border-radius: 10px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url(../../assets/img/2014816.jpg);
	}
	.card-item{
		margin:5px 5px;
		position:relative;
		opacity: 0;
		border-radius: 15px;
		overflow: hidden;
		.cover{
			transition: all 0.5s;
			backface-visibility: hidden;
			width: 100%;
			height: 100%;
			position:absolute;
		}
		.back{
			background: #2e3d49;
			@include hasBg;
			background-size: auto 100%;
			transform: rotateY(0deg);
		}
		.front{
			transform: rotateY(-180deg);
			.front-img{
				background-repeat: no-repeat;
				background-size: 100%;
				background-position: 50% 50%;
				width:100%;
				height:100%;
			}
		}
	}
	@for $i from 0 to 100 {
		.card-item:nth-child(#{$i}) {
			animation:cardItemAnim 0.25s #{0.05*$i}s forwards;
		}
	}
}
@keyframes cardItemAnim {
	0%{
		opacity: 0;
		transform: scale(1.5);
	}
	100%{
		opacity: 1;
		transform: scale(1);
	}
}
</style>

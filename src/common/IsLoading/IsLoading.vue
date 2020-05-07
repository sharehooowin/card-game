<template>
	<div v-if="isLoading" id="is_loading" @touchmove.prevent>
		<i class="loading_icon el-icon-loading"></i>
	</div>
</template>
<script>
	export default {
        name: 'IsLoading',
		props: {
		},
		data() {
			return {
			    isLoading:false,
			}
		},
		mounted: function() {
			this.init()
		},
		methods: {
            init() {},
			toggleLoading(){
                this.isLoading = !this.isLoading
			},
			showLoading(){
                this.isLoading = true
			},
			hideLoading(){
                this.isLoading = false
			}
        }
	}
</script>
<style>
	#is_loading{
		width:100vw;
		height:100vh;
		position:fixed;
		z-index:999;
		top:0;
		left:0;
	}
	.loading_icon{
		position:relative;
		top:45%;
		left:45%;
		transform: translate(-50%,-50%);
		color:#009CFF;
		font-size:1rem;
	}
</style>

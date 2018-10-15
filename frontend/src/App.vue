<template>
	<div class="layout-container flex justify-center" :class="{
		'column':navPos === 'top' || navPos === 'bottom', 
		'boxed':boxed, 
		'footer-above':footer === 'above',
		'content-only':!navPos
	}">

		<transition name="fade">
			<div class="splash-screen" v-if="splashScreen">
				<div class="wrap">
					<img src="/logo.svg" class="logo" alt="logo">
					<img src="/Ball-1s-142px.gif" alt="loading-image">
				</div>
			</div>
		</transition>

		<vertical-nav 
			:position="navPos" 
			:collapse-nav="collapseNav" 
			:open-sidebar.sync="openSidebar" 
			@collapse-nav-toggle="collapseNav = !collapseNav" 
			@push-page="closeSidebar" 
			v-if="navPos === 'left'"/>

		<div class="container flex column box grow">

			<div class="header" v-if="toolbar === 'top'">
				<Toolbar @toggle-sidebar="openSidebar = !openSidebar" :menu-burger="navPos"/>
			</div>
			<horizontal-nav :position="navPos" @push-page="closeSidebar" v-if="navPos === 'top'"/>
			<div class="header" v-if="toolbar === 'bottom'">
				<Toolbar @toggle-sidebar="openSidebar = !openSidebar" :menu-burger="navPos"/>
			</div>

			<div class="main box grow flex">
				<span class="main-out-border--top-left" v-if="roundedCorners"></span>
				<span class="main-out-border--top-right" v-if="roundedCorners"></span>
				<span class="main-out-border--bottom-left" v-if="roundedCorners"></span>
				<span class="main-out-border--bottom-right" v-if="roundedCorners"></span>
				<transition :name="viewAnimation" mode="out-in">
					<router-view class="view box grow"/>
				</transition>
			</div>

			<horizontal-nav :position="navPos" @push-page="closeSidebar" v-if="navPos === 'bottom'" style="margin-bottom:0;"/>
			
			<!-- <Footer v-if="footer === 'below'" :position="footer"/> -->
		</div>

		<vertical-nav 
			:position="navPos" 
			:collapse-nav="collapseNav" 
			:open-sidebar.sync="openSidebar" 
			@collapse-nav-toggle="collapseNav = !collapseNav" 
			@push-page="closeSidebar" 
			v-if="navPos === 'right'"/>

		<!-- <Footer v-if="footer === 'above'" :position="footer"/> -->

		<!-- <layout-picker :position="navPos" v-if="isLogged"/> -->
	</div>
</template>


<script> 
import { detect } from 'detect-browser'
const browser = detect()
// @ is an alias to /src
import HorizontalNav from '@/core/horizontal-nav.vue'
import VerticalNav from '@/core/vertical-nav.vue'
import Toolbar from '@/core/toolbar.vue'
import Footer from '@/core/footer.vue'
//import LayoutPicker from '@/components/layout-picker.vue'

export default {
	name: 'App',
	data() {
		return {
			collapseNav: false,
			openSidebar: false,
			innerWidth: 0
		}
	},
	computed: {
		navPos() {
			if(this.innerWidth <= 768 && (this.$store.getters.navPos === 'top' || this.$store.getters.navPos === 'bottom')) {
				return 'left'	
			}
			return this.$store.getters.navPos
		},
		toolbar() {
			return this.$store.getters.toolbar
		},
		footer() {
			return this.$store.getters.footer
		},
		boxed() {
			return this.$store.getters.boxed
		},
		roundedCorners() {
			return this.$store.getters.roundedCorners
		},
		viewAnimation() {
			return this.$store.getters.viewAnimation || 'none'
		},
		isLogged() {
			return this.$store.getters.isLogged
		},
		splashScreen() {
			return this.$store.getters.splashScreen
		}
	},	
	methods: {
		resizeOpenNav() {
			this.innerWidth = window.innerWidth
			if(window.innerWidth <= 768) {
				this.collapseNav = false	
			}
		},
		closeSidebar() {
			this.openSidebar = false
		}
	},
	components: {
		HorizontalNav,
		VerticalNav,
		Toolbar,
		Footer,
		//LayoutPicker
	},
	created() {
		if(browser.name)
			document.getElementsByTagName("html")[0].classList.add(browser.name)
	},
	mounted() {
		this.resizeOpenNav()
		window.addEventListener('resize', this.resizeOpenNav);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeOpenNav);
	}
}
</script>

<style lang="scss">
@import './assets/scss/_variables';
@import './assets/scss/_mixins';

.layout-container {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
	background: $background-color;

	.container {
		overflow: hidden;
		
		.header {
			height: 60px;
			margin-bottom: 20px;
			margin-top: 10px;
			margin-left: 30px;
			margin-right: 30px;
		}

		.main {
			position: relative;
			overflow: hidden;
			padding: 0 30px;
		}

		.view {
			padding: 20px;
			padding-bottom: 10px;
			padding-top: 0px;
			box-sizing: border-box;
			transition: all .4s cubic-bezier(.55,0,.1,1);
			backface-visibility: hidden;
		    /*-webkit-perspective: 1000px;*/

		}
		.fade-top-in-out-enter { opacity: 0; transform: translate(0, 30px); }
		.fade-top-in-out-leave-active { opacity: 0; transform: translate(0, 30px); }
		
		.fade-top-enter { opacity: 0; transform: translate(0, 30px); }
		.fade-top-leave-active { opacity: 0; transform: translate(0, -30px); }
		
		.fade-bottom-in-out-enter { opacity: 0; transform: translate(0, -30px); }
		.fade-bottom-in-out-leave-active { opacity: 0; transform: translate(0, -30px); }
		
		.fade-bottom-enter { opacity: 0; transform: translate(0, -30px); }
		.fade-bottom-leave-active { opacity: 0; transform: translate(0, 30px); }
		
		.fade-left-enter { opacity: 0; transform: translate(30px, 0); }
		.fade-left-leave-active { opacity: 0; transform: translate(-30px, 0); }
		
		.fade-right-enter { opacity: 0; transform: translate(-30px, 0); }
		.fade-right-leave-active { opacity: 0; transform: translate(30px, 0); }
		
		.fade-enter { opacity: 0; }
		.fade-leave-active { opacity: 0; }
	

		.main-out-border {
			&--top-left, &--top-right {
				background: linear-gradient($background-color, rgba(230,235,241,0));
				height: 16px;
				position: absolute;
				width: 8px;
				z-index: 1;
				top: 4px;
			}
			&--bottom-left, &--bottom-right {
				background: linear-gradient(rgba(230,235,241,0), $background-color);
				height: 16px;
				position: absolute;
				width: 8px;
				z-index: 1;
				bottom: 4px;
			}

			&--top-left, &--bottom-left {
				left: 42px;
				
				&::after {
					content: "";
					height: 5px;
					position: absolute;
					right: -4px;
					top: -4px;
					width: 12px;
					box-shadow: 8px 0px 0px 0px $background-color inset;
					border-top-left-radius: 5px;
				}
			}
			&--top-right, &--bottom-right {
				right: 42px;

				&::after {
					content: "";
					height: 5px;
					left: -4px;
					position: absolute;
					top: -4px;
					width: 12px;
					box-shadow: -8px 0px 0px 0px $background-color inset;
					border-top-right-radius: 5px;
				}
			}

			&--bottom-left:after {
				border-radius: 0;
				border-bottom-left-radius: 5px;
			}
			&--bottom-right:after {
				border-radius: 0;
				border-bottom-right-radius: 5px;
			}

			&--bottom-left, &--bottom-right {
				&::after {
					top: initial;
					bottom: -4px;
				}
			}	
		}

	}

	&.boxed {
		max-width: 1300px;
		margin: 0 auto;
		box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.15), 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
	}

	&.footer-above {
		padding-bottom: 40px;
		position: relative;
	}

	&.content-only {
		.container {
			.main-out-border--top-left,.main-out-border--top-right ,
			.main-out-border--bottom-left,.main-out-border--bottom-right {
				display: none;
			}	
		}
	}
}

html:not(.ie) {
	.layout-container {
		.container {
			max-width: 1920px;
		}
	}
}

@media (min-width: 1920px) {
	.layout-container:not(.boxed) {		
		&.column {
			.container {
				margin: 0 auto;
			}
		}
	}
}

@media (max-width: 768px) {
	.layout-container {
		.container {
			/*width: 100%;
			max-width: 100%;
			height: 100%;
			max-height: 100%;*/

			.header {
				height: 50px;
				background: #fff;
				box-shadow: 0px -20px 10px 20px rgba(0, 0, 0, 0.25);
				margin: 0;
				margin-bottom: 5px;

				.toggle-sidebar {
					box-shadow: none !important;
				}

				.search-box {
					& > .el-autocomplete {
						box-shadow: none !important;
					}
				}
			}

			.main {
				padding: 0 5px;
			}

			
			.view {
				//padding: 5px;
				max-width: 100%;
				padding: 15px;
				padding-left: 15px;
				padding-right: 15px;
			}
			.main-out-border--top-left,.main-out-border--top-right ,
			.main-out-border--bottom-left,.main-out-border--bottom-right {
				display: none;
			}
		}
	}
}


.fade-enter-active, .fade-leave-active {
	transition: opacity 0.5s ease-out;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>

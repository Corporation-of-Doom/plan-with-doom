<template>
	<div class="box-logo flex align-center" :class="{'nav-collapsed':collapseNav, [mode]:true}">
		<img class="image-logo" src="@/assets/images/logoMini.svg" alt="logoMini" @click="goto('/')"/>
		<div class="app-name" @click="goto('/')">Doom</div>
		<!-- <button class="collapse-nav" @click="collapseNavToggle"> -->
			<!-- <i class="mdi mdi-menu"></i> -->
		<!-- </button> -->
	</div>	
</template>


<script>
export default {
	name: 'Logo',
	props: ['collapseNav', 'mode'],
	data() {
		return {}
	},
	methods: {
		collapseNavToggle() {
			this.$emit('collapse-nav-toggle')
		},
		goto(index, indexPath) {
			this.$router.push(index)
		}
	}
}
</script>

<style lang="scss">
@import '../assets/scss/_variables';
@import '../assets/scss/_mixins';

.box-logo {
	height: 60px;
	padding: 0 20px;
	box-sizing: border-box;
	font-size: 20px;
	font-weight: bold;
	position: relative;
	@include text-bordered-shadow();

	.letter-logo {
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: $text-color;
		color: $text-color-accent;
		border-radius: 5px;
		margin-right: 10px;
		font-weight: bolder;
		font-size: 20px;
	}

	.image-logo {
		width: 40px;
		height: 40px;
		padding-bottom: 5px;
		margin-right: 10px;
		filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3));
	}

	.app-name {
		cursor: pointer;
	}

	.collapse-nav {
		position: absolute;
		top: 50%;
		left: 10px;
		height: 30px;
		width: 30px;
		margin-top: -15px;
		opacity: 0;
		box-shadow: 0px 0px 20px 10px $background-color;
		cursor: pointer;
		border: 1px solid $text-color-accent;
		border-radius: 50%;
		color: $text-color-accent;
		outline: none;
		background: $background-color;
		transition: all .5s;
	}

	&:hover {
		.collapse-nav {
			opacity: 1;
			left: 20px;
		}
	}


	&.nav-collapsed {
		.app-name {
			display: none;
		}
	}

	&.horizontal {
		height: 100%;

		.collapse-nav {
			display: none;
		}
	}
}


@media (max-width: 768px) {
	.box-logo {
		.collapse-nav {
			display: none;
		}

		&.horizontal {
			padding: 0 10px;

			.app-name {
				display: none;
			}
		}
	}

}
</style>

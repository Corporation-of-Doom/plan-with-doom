<template>
	<vue-scroll class="page-profile" id="affix-container">
		<el-card shadow="always" style="padding:20px;margin-bottom:10px">
        <el-col>
            <font size="+2">{{user.first_name}} {{user.middle_name}} {{user.last_name}}</font>
            <p v-if="user.organization"> {{user.organization}} </p>
            <el-row>
				<a target="_blank" rel="noopener noreferrer" :href="user.linked_in">
					<font size="+2" v-if="user.linked_in" class="mdi mdi-linkedin-box" />
				</a>
				<a target="_blank" rel="noopener noreferrer" :href="user.twitter">
					<font size="+2" v-if="user.twitter" class="mdi mdi-twitter-box" />
				</a>
				<a target="_blank" rel="noopener noreferrer" :href="user.facebook">
					<font size="+2" v-if="user.facebook" class="mdi mdi-facebook-box" />
				</a>
				<a target="_blank" rel="noopener noreferrer" :href="user.instagram">
					<font size="+2" v-if="user.instagram" class="mdi mdi-instagram" />
				</a>
			</el-row>
            <el-row v-if="user.phone_number && user.email">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="text-align:left">
                    <p placeholder="email@email.com">Email: {{user.email}}</p>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="text-align:right">
                    <p placeholder="+1 xxx xxx xxxx">Phone: {{user.phone_number}}</p>
                </el-col>	
            </el-row>
			<el-row v-else-if ="user.email">
				<p placeholder="email@email.com">Email: {{user.email}}</p>
            </el-row>
			<el-row v-else-if="user.phone_number">
				<p placeholder="+1 xxx xxx xxxx">Phone: {{user.phone_number}}</p>
            </el-row>
        </el-col>
    </el-card>
		
		<div class="card-base card-shadow--medium info bg-white black-text">
			<el-tabs v-model="activeTab">
				<el-tab-pane label="Public Profile" name="profile">
					About Me 
					<hr>
					{{user.about_me}}
				</el-tab-pane>
				<el-tab-pane label="Following" name="following">
					<div style="height:20%" v-for="item in user.following" :key="item.id">
						<el-card shadow="always" style="text-align:center;padding:20px;margin-bottom:10px;height:20%" @click.native="loadUser(item.id)">
						<el-col> {{item.first_name}} {{item.middle_name}} {{item.last_name}} </el-col>
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Followers" name="followers">
					<div style="height:20%" v-for="item in user.followers" :key="item.id">
						<el-card shadow="always" style="text-align:center;padding:20px;margin-bottom:10px;height:20%" @click.native="loadUser(item.id)">
						<el-col> {{item.first_name}} {{item.middle_name}} {{item.last_name}} </el-col>
						</el-card>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Personal Infomation" name="info">
					<profile-edit></profile-edit>
				</el-tab-pane>
			</el-tabs>
		</div>
	</vue-scroll>
</template>

<script>
import ColorThief from 'color-thief-browser'
import Affix from '@/components/Affix'
import ProfileEdit from '@/components/Profile/ProfileEdit'
import { createApolloFetch } from "apollo-fetch"
import { loadUser } from "./helper"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });

export default {
	name: 'Profile',
	data() {
		return {
			user:this.$store.state.user,
			colorActive: false,
			color: 'white',
			activeTab: 'info',
			affixEnabled: true,
		}
	},
	mounted(){
        console.log(this.$store.state.user)
    },
	methods: {
		onClick(id){
			console.log(id)
		}, loadUser(id){
			fetch({
			query: `{
				getUserById(userID: ${id}){
				first_name
				middle_name
				last_name
				email
				organization
				linked_in
				twitter
				facebook
				instagram
				phone_number
				privacy_settings
				about_me
				id
				} 
			}`
			})
			.then(res => {
				if(res.data.getUserById){
					var info = res.data.getUserById
					info.following = this.user.following.filter(user => user.id === id).length>0
					
					this.$store.commit("loadUser",res.data.getUserById)
					this.$router.push("userprofile")
				} else {
					this.$message({
					message: "Something went wrong loading the user :("
					})
				}
			})
		}
	},
	components: {
		Affix,
		ProfileEdit
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-profile {
	overflow: auto;

	.identity {
		margin-bottom: 20px;
		position: relative;
		width: 100%;
		height: 370px;

		.cover {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-image: url('../../assets/images/cover-2.jpg');
			background-position: 50%;
			background-size: cover;
			background-repeat: no-repeat;
			width: 100%;
			height: 100%;
		}
		.username {
			color: #32325d;
			position: absolute;
			width: 100%;
			height: 50px;
			bottom: 75px;
			left: 0;
			right: 0;
			background: #fff;
			line-height: 50px;
			box-sizing: border-box;
			padding-left: 250px;
			font-size: 25px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);

			.cover-small {
				width: 220px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -220px;
				position: relative;
				left: -250px;
				border-radius: 9px;
				-webkit-box-sizing: border-box;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				background-image: url('../../assets/images/cover-2.jpg');
				background-position: 50%;
				background-size: cover;
				background-repeat: no-repeat;
				-webkit-transition: all .5s;
				transition: all .5s;
			}
			.avatar-small {
				width: 50px;
				height: 50px;
				overflow: hidden;
				display: block;
				float: left;
				margin-right: -50px;
				position: relative;
				left: -100px;
				border-radius: 50%;
				box-sizing: border-box;
				border: 4px solid white;
				opacity: 0;
				top: 0px;
				transform: rotate(-50deg);
				transition: all .5s;
			}
			.avatar-small img {
				width: 100%;
			}

			&.affix {
				z-index: 99;
				border-radius: 5px;

				.cover-small {
					opacity: 1;
				}

				.avatar-small {
					opacity: 1;
					left: -60px;
					transform: rotate(0deg);
				}
			}

			.colors-box {
				height: 50px;
				background: white; //091c2d
				float: right;

				.color {
					width: 50px;
					height: 50px;
					background: white; //091c2d
					float: right;
					transform: skew(-45deg);
					box-shadow: 1px 0px 1px 0px transparent;
					position: relative;
					right: -25px;
					margin-right: -50px;
					transition: margin-right .75s;

					&.active {
						margin-right: 0;
					}

					&:nth-child(2) { opacity: .8; }
					&:nth-child(3) { opacity: .6; }
					&:nth-child(4) { opacity: .4; }
					&:nth-child(5) { opacity: .2; }
				}
			}
		}
		.avatar {
			border: 6px solid #fff;
			position: absolute;
			bottom: 10px;
			left: 50px;
			width: 180px;
			height: 180px;
			overflow: hidden;
			border-radius: 50%;
			box-sizing: border-box;
			box-shadow: 0px 20px 15px -15px rgba(0, 0, 0, 0.15);

			img {
				width: 100%;
			}
		}

		.color-thief {
			display: block;
			width: 100px;
			visibility: hidden;
			z-index: -999999;
			position: absolute;
		}
	}

	.info {
		padding: 24px 32px;
	}
}

@media (max-width: 768px) {
	.page-profile {
		.identity {
			height: auto;

			.avatar {
				bottom: inherit;
				top: 10px;
				left: 50%;
				width: 100px;
				margin-left: -50px;
				height: 100px;
				border-width: 3px;
			}

			.username {
				position: inherit;
				padding: 10px ;
				margin: 0;
				top: inherit;
				left: inherit;
				z-index: 1;
				right: inherit;
				text-align: center;
				bottom: inherit;
				white-space: inherit;
				line-height: inherit;
				height: auto;
				margin-top: 120px;
				width: 90%;
				margin-left: 5%;
				margin-bottom: 10px;
				border-radius: 50px;

				.colors-box {
					display: none;
				}

				.avatar-small {
					display: none;
				}

				.cover-small {
					display: none;
				}
			}
		}

		.info {
			padding: 8px 16px;
		}
	}
}
</style>

<style lang="scss">
.page-profile {
	.el-tabs:not(.el-tabs--border-card) {
		.el-tabs__item:not(.is-active) {
			color: #32325d;
		}
	}
}
</style>

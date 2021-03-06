<template>
	<div class="page-contacts flex column" id="page-contacts">
		<resize-observer @notify="__resizeHanlder" />
		
		<div class="contacts-root box grow flex gaps justify-center" :class="contactsClass">
			<div class="card-base card-shadow--small search-card scrollable only-y">
				<h1 class="mt-0">Contacts</h1>
				
				<el-input
					prefix-icon="el-icon-search"
					placeholder="Search a contact"
					clearable
					v-model="search">
				</el-input>

				<div class="o-050 text-right mt-10 mb-30"><strong>{{contactsFiltered.length}}</strong> contacts</div>
			</div>
			<div class="contacts-list box grow scrollable only-y">
				<div v-for="c in contactsFiltered" :key="c.id" class="flex contact" @click="openDialog(c)">
					<div class="star align-vertical p-10 fs-22">
						<i class="mdi mdi-star align-vertical-middle" v-if="c.starred"></i>
						<i class="mdi mdi-star-outline align-vertical-middle" v-if="!c.starred"></i>
					</div>
					<div class="avatar align-vertical">
						<img :src="'/static/images/users/user-'+c.id+'.jpg'" class="align-vertical-middle" alt="user avatar">
					</div>
					<div class="info box grow flex">
						<div class="name box grow flex column justify-center p-10">
							<div class="fullname fs-18"><strong>{{c.full_name}}</strong></div>
							<div class="phone fs-14 secondary-text">{{c.phone}}</div>
							<div class="email fs-14 secondary-text">{{c.email}}</div>
						</div>
						<div class="phone align-vertical p-10"><span class="align-vertical-middle">{{c.phone}}</span></div>
					</div>
				</div>
			</div>
		</div>

		<user-dialog :dialogvisible.sync="dialogvisible" :userdata="userdata"></user-dialog>
	</div>
</template>

<script>
import UserDialog from '@/components/UserDialog'
import Contacts from '@/assets/data/CONTACTS_MOCK_DATA.json'

export default {
	name: 'Contacts',
	data() {
		return {
			search: '',
			dialogvisible: false,
			pageWidth: 0,
			userdata: {},
			contacts: Contacts.slice(0, 30)
		}
	},
	computed: {
		contactsFiltered() {
			return this.contacts.filter(({full_name, email, phone}) => (full_name+email+phone).toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) !== -1)
		},
		contactsClass() {
			return this.pageWidth >= 870 ? 'large' : this.pageWidth >= 760 ? 'medium' : 'small'
		}
	},
	methods: {
		openDialog(data) {
			this.userdata = data
			this.dialogvisible = true
		},
		setPageWidth() {
			this.pageWidth = document.getElementById('page-contacts').offsetWidth
		},
		__resizeHanlder: _.throttle(function (e) {
			this.setPageWidth()
		}, 700)
	},
	mounted() {
		this.setPageWidth()
	},
	components: {
		UserDialog
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-contacts {
	height: 100%;
	margin: 0 !important;
	padding: 20px;
	padding-bottom: 10px;
	box-sizing: border-box;

	.search-card {
		padding: 50px;
		max-width: 350px;
		max-height: 320px;
		box-sizing: border-box;
		margin-bottom: 15px; 

		.el-input, .el-button {
			width: 100%;
		}
	}

	.search-wrap {
		margin: 0 auto;
		margin-bottom: 10px;
		padding: 0px 30px;
		box-sizing: border-box;
		width: 100%;
		max-width: 600px;

		i {
			display: inline-block;
			width: 22px;
		}

		input {
			outline: none;
			background: transparent;
			border: none;
			font-size: 15px;
			position: relative;
			top: -2px;
			width: 100%;
			padding: 0;
			color: $text-color;
		}

		.contacts-tot {
			margin-right: 20px;
			margin-left: 10px;
		}

		a {
			border-bottom: 1px solid;
			text-decoration: none;
			color: $text-color;

			&:hover {
				opacity: .6;
			}
		}
	}

	.contacts-root {
		max-height: 100%;
	}

	.contacts-list {
		//margin: 0 auto;
		width: 100%;
		max-width: 965px;
		padding: 0px 30px;
		box-sizing: border-box;

		.contact {
			margin: 10px 0;
			padding: 5px;
			box-sizing: border-box;
			cursor: pointer;
			transition: all .5s .25s;

			.star {
				.mdi-star {
					color: #ffd730;
				}
				.mdi-star-outline {
					opacity: .5;
				}
			}

			.avatar {
				width: 60px;
				transition: all .5s .25s;

				img {
					border: 1px solid transparentize($text-color, .9);
					box-sizing: border-box;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					transition: all .5s .25s;
				}
			}

			.info {
				word-break: break-word;

				.name {
					
					//.fullname {}

					.email {
						opacity: 0;
						line-height: 0;
						transition: all .5s .25s;
					}

					.phone {
						display: none;
					}
				}

				//.phone {}
			}

			&:hover {
				margin: 15px -20px;
				padding: 10px;
				background-color: lighten($background-color, 20%);
				border-radius: 5px;
				box-shadow: 0 8px 16px 0 rgba(40,40,90,.09),0 3px 6px 0 rgba(0,0,0,.065);

				.avatar {
					width: 90px;

					img {
						width: 90px;
						height: 90px;
					}
				}
				
				.info {
					.name {
						.email {
							opacity: 1;
							line-height: 1.4;
						}
					}
				}
			}
		}
	}

	.contacts-root {
		&.medium {
			.search-card {
				padding: 20px;
				max-width: 260px;
				max-height: 260px;
			}
		}
		&.small {
			overflow-y: auto;
			display: block;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
			padding: 5px;

			.search-card {
				padding: 20px;
				max-width: 100%;
				width: 100%;
				//max-height: 240px;
				flex: none;
				-webkit-box-flex: none;
				-ms-flex: none;
				display: block;
				overflow: hidden !important;
			}
			
			.contacts-list {
				flex: none;
				-webkit-box-flex: none;
				-ms-flex: none;
				display: block;
				overflow: hidden !important;
			}
		}
	}
}

@media (max-width: 768px) {
	.page-contacts {
		.search-wrap {
			padding: 0;
		}
		.contacts-list {
			padding: 0px;

			.contact { 
				.avatar {
					width: 40px;

					img {
						width: 40px;
						height: 40px;
					}
				}

				.info {
					.phone {
						display: none;
					}

					.name {
						.phone {
							display: block;
						}
					}
				}

				&:hover {
					margin: 15px 0px;

					.avatar {
						width: 60px;

						img {
							width: 60px;
							height: 60px;
						}
					}
				}
			}
		}

		.contacts-root {
			&.medium {
				.contacts-list {
					padding: 0 30px;
				}
			}
			&.small {
				.contacts-list {
					padding: 8px;
				}
			}
		}
	}
}
</style>


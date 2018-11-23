import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
		layout: {
			navPos: 'left', //top, bottom, left, right, false
			toolbar: 'top', //top, bottom, false
			footer: true, //above, below, false
			boxed: false, //true, false
			roundedCorners: false, //true, false
			viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
		},
		splashScreen: true,
		logged: false,
		user:{},
		event: {},
		seminar:{},
	},
	mutations: {
		setLayout(state, payload) {
			if(payload && payload.navPos !== undefined)
				state.layout.navPos = payload.navPos

			if(payload && payload.toolbar !== undefined)
				state.layout.toolbar = payload.toolbar
				
			if(payload && payload.footer !== undefined)
				state.layout.footer = payload.footer
		
			if(payload && payload.boxed !== undefined)
				state.layout.boxed = payload.boxed

			if(payload && payload.roundedCorners !== undefined)
				state.layout.roundedCorners = payload.roundedCorners

			if(payload && payload.viewAnimation !== undefined)
				state.layout.viewAnimation = payload.viewAnimation
		},
		setLogin(state, payload) {
			state.logged = true
			state.user = payload
		},
		setLogout(state, payload) {
			state.layout.navPos = null
			state.layout.toolbar = null
			state.logged = false
		},
		setSplashScreen(state, payload) {
			state.splashScreen = payload
		},
		setEvent(state, payload){
			state.event = payload
		},
		setSeminar(state, payload){
			state.seminar = payload
		},
		addToAttend(state, payload){
			state.user.attend.push(payload)
			if (payload.__typename === 'Event') {
				state.event.attend = true
			} else if (payload.__typename === 'Seminar'){
				state.seminar.attend = true
			}
		},
		removeFromAttend(state, payload){
			if (payload.__typename === 'Event') {
				state.event.attend = false
			} else if (payload.__typename === 'Seminar'){
				state.seminar.attend = false
			}
			state.user.attend = state.user.attend.filter(item => item.id !== payload.id && item.__typename !== payload.__typename)
		}, 
		addToFollow(state, payload){
			state.user.follow.push(payload)
			if (payload.__typename === 'Event') {
				state.event.follow = true
			} else if (payload.__typename === 'Seminar'){
				state.seminar.follow = true
			}
		},
		removeFromFollow(state, payload){
			if (payload.__typename === 'Event') {
				state.event.follow = false
			} else if (payload.__typename === 'Seminar'){
				state.seminar.follow = false
			}
			state.user.follow = state.user.follow.filter(item => item.id !== payload.id && item.__typename !== payload.__typename)
		},
		addToManage(state, payload){
			state.user.manage.push(payload)
			state.user.associate.push(payload)
			if (payload.__typename === 'Event') {
				state.event.manage = true
			} else if (payload.__typename === 'Seminar'){
				state.seminar.manage = true
			}
		},
		removeFromManage(state, payload){
			if (payload.__typename === 'Event') {
				state.event.manage = false
			} else if (payload.__typename === 'Seminar'){
				state.seminar.manage = false
			}
			state.user.manage = state.user.manage.filter(item => item.id !== payload.id && item.__typename !== payload.__typename)
		},
		setUser(state, payload){
			state.user.first_name = payload.first_name
			state.user.middle_name = payload.middle_name
			state.user.last_name = payload.last_name
			state.user.email = payload.email
			state.user.orgnization = payload.orgnization
			state.user.phone_number = payload.phone_number
			state.user.linked_in =payload.linked_in
			state.user.twitter = payload.twitter
			state.user.facebook = payload.facebook
			state.user.instagram = payload.instagram
			state.user.about_me = payload.about_me
			state.user.organization = payload.organization
		},
	},
	getters: {
		layout(state, getters) {
			return state.layout
		},
		navPos(state, getters) {
			return state.layout.navPos
		},
		toolbar(state, getters) {
			return state.layout.toolbar
		},
		footer(state, getters) {
			return state.layout.footer
		},
		boxed(state, getters) {
			return state.layout.boxed
		},
		roundedCorners(state, getters) {
			return state.layout.roundedCorners
		},
		viewAnimation(state, getters) {
			return state.layout.viewAnimation
		},
		isLogged(state, getters) {
			return state.logged
		},
		splashScreen(state, getters) {
			return state.splashScreen
		},
		getUser(state){
			return state.user
		},
		getEvent(state){
			return state.event
		},
		getSeminar(state){
			return state.seminar
		}
	},
	plugins: [createPersistedState({paths: ['layout']})],
	strict: debug
})

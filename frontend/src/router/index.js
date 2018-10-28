import Vue from 'vue'
import Router from 'vue-router'

//apps
import Dashboard from '../views/apps/Dashboard.vue'
import Calendar from '../views/apps/Calendar.vue'
import Contacts from '../views/apps/Contacts.vue'
import Gallery from '../views/apps/Gallery.vue'
import Timeline from '../views/apps/Timeline.vue'

//pages
import Login from '../views/pages/authentication/Login.vue'
import Register from '../views/pages/authentication/Register.vue'
import ForgotPassword from '../views/pages/authentication/ForgotPassword.vue'
import Profile from '../views/pages/Profile.vue'
import NotFound from '../views/pages/NotFound.vue'
import Invoice from '../views/pages/Invoice.vue'
<<<<<<< HEAD
import MyEvent from '../views/pages/MyEvent.vue'
=======
import SearchPage from '../views/pages/Search.vue'
import EventPage from '../views/pages/Event.vue'
import SeminarPage from '../views/pages/Seminar.vue'
import MyEventsPage from '../views/pages/MyEvents.vue'
import MangeEventsPage from '../views/pages/ManageEvents.vue'
>>>>>>> d7cef1b14422a05a63b4eac8c8bc89a36685fb58

//ui
import Themes from '../views/ui/Themes.vue'
import Icons from '../views/ui/Icons/Icons.vue'
import MdIcons from '../views/ui/Icons/MdIcons.vue'
import FlagIcons from '../views/ui/Icons/FlagIcons.vue'
import MultiLanguage from '../views/ui/MultiLanguage.vue'
import HelperClasses from '../views/ui/HelperClasses.vue'
import Typography from '../views/ui/Typography.vue'
import layout from './layout'
import editors from './editors'
import charts from './charts'
import maps from './maps'
import tables from './tables'
import element from './element'

import layouts from '../layout'
import store from '../store'

Vue.use(Router)


const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/calendar',
			name: 'calendar',
			component: Calendar,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/search',
			name: 'search',
			component: SearchPage,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/event',
			name: 'event',
			component: EventPage,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: false,
				tags: ['app']
			}
		},
		{
			path: '/seminar',
			name: 'Seminar',
			component: SeminarPage,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: false,
				tags: ['app']
			}
		},
		{
			path: '/manageevents',
			name: 'manageevents',
			component: MangeEventsPage,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: false,
				tags: ['app']
			}
		},
		{
			path: '/',
			alias: '/myevents',
			name: 'myevents',
			component: MyEventsPage,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: false,
				tags: ['app']
			}
		},
		{
			path: '/contacts',
			name: 'contacts',
			component: Contacts,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['users', 'address', 'book', 'app']
			}
		},
		{
			path: '/gallery',
			name: 'gallery',
			component: Gallery,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['photo', 'app']
			}
		},
		{
			path: '/timeline',
			name: 'timeline',
			component: Timeline,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['app']
			}
		},
		{
			path: '/themes',
			name: 'themes',
			component: Themes,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['ui']
			}
		},
		{
			path: '/icons',
			name: 'icons',
			component: Icons,
			meta: {
				auth: true,
				layout: layouts.navLeft
			},
			children: [
				{
					path: 'md-icons',
					name: 'md-icons',
					component: MdIcons,
					meta: {
						auth: true,
						layout: layouts.navLeft,
						searchable: true,
						title: 'Material Design Icons',
						tags: ['material design']
					}
				},
				{
					path: 'flag-icons',
					name: 'flag-icons',
					component: FlagIcons,
					meta: {
						auth: true,
						layout: layouts.navLeft,
						searchable: true,
						title: 'Flag Icons',
						tags: ['list', 'ui']
					}
				}
			]
		},
		{
			path: '/multi-language',
			name: 'multi-language',
			component: MultiLanguage,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['ui', 'translate']
			}
		},
		{
			path: '/helper-classes',
			name: 'helper-classes',
			component: HelperClasses,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Helper Classes',
				tags: ['ui']
			}
		},
		{
			path: '/typography',
			name: 'typography',
			component: Typography,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				title: 'Typography',
				tags: ['ui']
			}
		},
		layout,
		editors,
		charts,
		maps,
		tables,
		element,
		{
			path: '/profile',
			name: 'profile',
			component: Profile,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/invoice',
			name: 'invoice',
			component: Invoice,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/forgot-password',
			name: 'forgot-password',
			component: ForgotPassword,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{ 
			path: '/logout',
			beforeEnter (to, from, next) {
				auth.logout()
				next({path:'/login'})
			}
		},
		{
			path: '/not-found',
			name: 'not-found',
			component: NotFound,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				tags: ['pages']
			}
		},
		{
			path: '/my-event',
			name: 'my-event',
			component: MyEvent,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				tags: ['pages']
			}
		}
	
	]
})


const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	navRight(){
		store.commit('setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom)
	},
	set(layout){
		store.commit('setLayout', layout)
	}
}

//insert here login logic
const auth = {
	loggedIn() {
		return store.getters.isLogged
	},
	logout() {
		store.commit('setLogout')
	}
}

router.beforeEach((to, from, next) => {
	let authrequired = false
	if(to && to.meta && to.meta.auth)
		authrequired = true

	//console.log('authrequired', authrequired, to.name)

	if(authrequired) {
		if(auth.loggedIn()) {
			if(to.name === 'login') {
				window.location.href = '/'
				return false
			} else { 
				next()
			}
		} else {
			if(to.name !== 'login'){
				window.location.href = '/login'
				return false
			}
			next()
		}
	} else {
		if(auth.loggedIn() && to.name === 'login'){
			window.location.href = '/'
			return false
		} else {
			next()
		}
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}	
})

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 500)
})

export default router
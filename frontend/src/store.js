import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    layout: {
      navPos: "left", //top, bottom, left, right, false
      toolbar: "top", //top, bottom, false
      footer: true, //above, below, false
      boxed: false, //true, false
      roundedCorners: false, //true, false
      viewAnimation: "fade-top" // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
    },
    splashScreen: true,
    logged: false,
    user: {},
    event: {},
    seminar: {},
    editMode: false
  },
  mutations: {
    setLayout(state, payload) {
      if (payload && payload.navPos !== undefined){
        state.layout.navPos = payload.navPos
        state.user.menu_orientation = payload.navPos
      }
      if (payload && payload.toolbar !== undefined)
        state.layout.toolbar = payload.toolbar;

      if (payload && payload.footer !== undefined)
        state.layout.footer = payload.footer;

      if (payload && payload.boxed !== undefined)
        state.layout.boxed = payload.boxed;

      if (payload && payload.roundedCorners !== undefined)
        state.layout.roundedCorners = payload.roundedCorners;

      if (payload && payload.viewAnimation !== undefined)
        state.layout.viewAnimation = payload.viewAnimation;
    },
    setLogin(state, payload) {
      state.logged = true;
      state.user = payload;
    },
    setLogout(state, payload) {
      state.layout.navPos = null;
      state.layout.toolbar = null;
      state.logged = false;
    },
    setSplashScreen(state, payload) {
      state.splashScreen = payload;
    },
    setEvent(state, payload) {
      state.event = payload;
    },
    setSeminar(state, payload) {
      state.seminar = payload;
    },
    addToAttend(state, payload) {
      state.user.attend.push(payload);
      if (payload.__typename === "Event") {
        state.event.attend = true;
        state.event.current_capacity++;
      } else if (payload.__typename === "Seminar") {
        state.seminar.attend = true;
        state.seminar.current_capacity++;
      }
    },
    removeFromAttend(state, payload) {
      if (payload.__typename === "Event") {
        state.event.attend = false;
        state.event.current_capacity--;
      } else if (payload.__typename === "Seminar") {
        state.seminar.attend = false;
        state.seminar.current_capacity--;
      }
      state.user.attend = state.user.attend.filter(
        item => item.id !== payload.id && item.__typename !== payload.__typename
      );
    },
    addToFollow(state, payload) {
      state.user.follow.push(payload);
      if (payload.__typename === "Event") {
        state.event.follow = true;
      } else if (payload.__typename === "Seminar") {
        state.seminar.follow = true;
      }
    },
    removeFromFollow(state, payload) {
      if (payload.__typename === "Event") {
        state.event.follow = false;
      } else if (payload.__typename === "Seminar") {
        state.seminar.follow = false;
      }
      state.user.follow = state.user.follow.filter(
        item => item.id !== payload.id && item.__typename !== payload.__typename
      );
    },
    addToManage(state, payload) {
      state.user.manage.push(payload);
      state.user.associate.push(payload);
      if (payload.__typename === "Event") {
        state.event.manage = true;
      } else if (payload.__typename === "Seminar") {
        state.seminar.manage = true;
      }
    },
    removeFromManage(state, payload) {
      if (payload.__typename === "Event") {
        state.event.manage = false;
      } else if (payload.__typename === "Seminar") {
        state.seminar.manage = false;
      }
      state.user.manage = state.user.manage.filter(
        item => item.id !== payload.id && item.__typename !== payload.__typename
      );
    },
    addAnnouncement(state, payload) {
      if (payload.type === "Event") {
        state.event.announcements.unshift({
          message: payload.message,
          date_modified: payload.date_modified
        });
      } else if (payload.type === "Seminar") {
        state.seminar.announcements.unshift({
          message: payload.message,
          date_modified: payload.date_modified
        });
      }
    },
    setEdit(state, payload) {
      state.editMode = payload.editMode
    },

    addToWaitlist(state, payload) {
      console.log(state.user.waitlist);
      state.user.waitlist.push(payload);
      if (payload.__typename === "Event") {
        state.event.current_capacity = state.event.max_capacity
        state.event.waitlist = true;
      } else if (payload.__typename === "Seminar") {
        state.seminar.waitlist = true;
        state.seminar.current_capacity = state.seminar.max_capacity

      }
    },
    removeFromWaitlist(state, payload) {
      if (payload.__typename === "Event") {
        state.event.waitlist = false;
      } else if (payload.__typename === "Seminar") {
        state.seminar.waitlist = false;
      }
      state.user.waitlist = state.user.waitlist.filter(
        item => item.id !== payload.id && item.__typename !== payload.__typename
      );
    },
    setUser(state, payload) {
      for(var prop in payload){
        state.user[prop] = payload[prop]
      }
    }
  },
  getters: {
    layout(state, getters) {
      return state.layout;
    },
    navPos(state, getters) {
      return state.layout.navPos;
    },
    toolbar(state, getters) {
      return state.layout.toolbar;
    },
    footer(state, getters) {
      return state.layout.footer;
    },
    boxed(state, getters) {
      return state.layout.boxed;
    },
    roundedCorners(state, getters) {
      return state.layout.roundedCorners;
    },
    viewAnimation(state, getters) {
      return state.layout.viewAnimation;
    },
    isLogged(state, getters) {
      return state.logged;
    },
    splashScreen(state, getters) {
      return state.splashScreen;
    },
    getUser(state) {
      return state.user;
    },
    getEvent(state) {
      return state.event;
    },
    getSeminar(state) {
      return state.seminar;
    }
  },
  plugins: [createPersistedState({ paths: ["layout"] })],
  strict: debug
});

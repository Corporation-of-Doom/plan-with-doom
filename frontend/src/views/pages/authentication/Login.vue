<template>
	<vue-scroll class="login-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				
				<span style="color: red;"> {{ form.error }} </span>
				<float-label class="styled">
					<input type="email" placeholder="E-mail" v-model="form.email" v-on:keyup.enter="login">
				</float-label>
				<float-label class="styled">
					<input type="password" placeholder="Password" v-model="form.password" v-on:keyup.enter="login">
				</float-label>
				
				<div class="flex">
					<div class="box grow"><el-checkbox>Remember Me </el-checkbox></div>
					<!-- <div class="box grow text-right"><router-link to="/dashboard">Forgot Password?</router-link></div> -->
				</div>

				<div class="flex text-center center pt-30 pb-10">			
					<el-button plain size="small" @click="login">
						LOGIN
					</el-button>
				</div>

				<div class="text-divider mv-10">or</div>

				<div class="flex column center pt-10 pb-10">			
					<el-button plain size="small" @click="login" class="social-btn google">
						Log in with Google
					</el-button>
					<el-button plain size="small" @click="login" class="social-btn facebook">
						Log in with Facebook
					</el-button>
				</div>

				<div class="text-center signin-box pt-20">
					Don't have an account? <a @click="signup">Sign up</a>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
// import gql from 'graphql-tag'
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
        error: "",
      }
    };
  },
  methods: {
    login() {
      fetch({
        query: `{
          login(email: "${this.form.email}", password: "${this.form.password}"){
            id
            email
            first_name
            middle_name
            last_name
            privacy_settings
            linked_in
            twitter
            facebook
            instagram
            organization
            about_me
          }
        }`
      })
      .then(res => {
        if (res.data) {
          var user = res.data.login
          fetch({
            query: `{
              getMyEventsAndSeminars(userID:${user.id}, participationType:FOLLOWING){
                __typename
                ...on Event{
                  id
                }
                ...on Seminar{
                  id
                }
              }
            }`
            })
            .then(res => {
              if (res.data){
                user.follow = res.data.getMyEventsAndSeminars
              } else {
                user.follow = []
              }
              console.log(user.follow)
              fetch({
                query: `{
                  getMyEventsAndSeminars(userID:${user.id}, participationType:ATTENDING){
                    __typename
                    ...on Event{
                      id
                    }
                    ...on Seminar{
                      id
                    }
                  }
                }`
              })
              .then(res => {
                if (res.data){
                  user.attend = res.data.getMyEventsAndSeminars
                } else {
                  user.attend = []
                }
                fetch({
                query: `{
                  getMyManagingEventsAndSeminars(userID:${user.id}){
                      __typename
                      ...on Event{
                        id
                        creator_id
                      }
                      ...on Seminar{
                        id
                      }
                    }
                  }`
                })
                .then(res => {
                  if (res.data){
                    user.manage = []
                    user.associate = []
                      console.log(res.data.getMyManagingEventsAndSeminars)
                    if(res.data.getMyManagingEventsAndSeminars.length > 0){
                      user.associate = res.data.getMyManagingEventsAndSeminars
                      res.data.getMyManagingEventsAndSeminars.forEach(element => {
                        if (element.creator_id === user.id) {
                          user.manage.push(element)
                        } else if (element.__typename === "Seminar") {
                          user.manage.push(element)
                        }
                      })
                    }
                  } else {
                    user.manage = []
                    console.log("no manging")
                  }
                  fetch({
                  query: `{
                      getMyWaitlistedEventsAndSeminars(userID: ${user.id}) {
                        __typename
                        ... on Event {
                          id
                        }
                        ... on Seminar {
                          id
                        }
                      }
                    }`
                  })
                  .then(res => {
                    console.log(res)
                    user.waitlist = []
                    if (res.data) {
                      user.waitlist = res.data.getMyWaitlistedEventsAndSeminars
                    }
                    console.log(user)
                    this.$store.commit("setLogin", user);
                    this.$router.push("myevents");
                  })
                })
              })
            })
          } else {
            this.form.error = res.errors[0].message;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    signup() {
      this.$router.push("register");
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/_variables";

.login-page {
  background: $background-home;
  margin-left: -30px;
  margin-right: -30px;

  .form-wrapper {
    width: 100%;
  }

  .form-box {
    width: 100%;
    max-width: 340px;
    padding: 30px;
    box-sizing: border-box;
    margin: 20px auto;

    a {
      font-size: 14px;
      color: $text-color-accent;
      text-decoration: none;
      font-weight: 500;
    }

    .image-logo {
      width: 80px;
      margin: 0px auto;
      margin-bottom: 30px;
      display: block;
    }

    .login-btn,
    .social-btn {
      width: 160px;

      &.google {
        margin-bottom: 10px;
        background-color: #d73d32;
        color: white;

        &:hover {
          border-color: #d73d32;
        }
      }
      &.facebook {
        background-color: #3f5c9a;
        color: white;

        &:hover {
          border-color: #3f5c9a;
        }
      }
    }

    .signin-box {
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  .layout-container .container .view.login-page {
    margin-left: -5px;
    margin-right: -5px;
    max-width: calc(100% + 10px);
  }
}
</style>

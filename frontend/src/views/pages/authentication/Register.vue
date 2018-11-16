<template>
	<vue-scroll class="register-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				<span style="color: red;"> {{ form.error }} </span>
				<float-label class="styled">
					<input type="text" v-model="form.firstName" placeholder="First Name">
				</float-label>
        <float-label class="styled">
					<input type="text" v-model="form.lastName" placeholder="Last Name">
				</float-label>
				<float-label class="styled">
					<input type="email" v-model="form.email" placeholder="E-mail">
				</float-label>
				<span style="color: red; font-size:75%;"> {{ form.errorPassword }} </span>
				<float-label class="styled">
					<input type="password" v-model="form.password" placeholder="Password">
				</float-label>
				<float-label class="styled">
					<input type="password" v-model="form.passwordConfirm" placeholder="Password (confirm)">
				</float-label>
				<span style="color: red; font-size:75%;"> {{ form.errorChecked }} </span>
				<div class="flex">
					<div class="box grow"><el-checkbox v-model="form.checked" >I read and accept terms</el-checkbox></div>
				</div>

				<div class="flex text-center center pt-30 pb-20">			
					<el-button plain size="small" @click="signUp" class="signin-btn tada animated">
						SIGN UP
					</el-button>
				</div>

				<div class="text-center login-box pt-10">
					Already have an account? <a @click="login">Login</a>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });
export default {
  name: "Register",
  data() {
    return {
      form: {
        firstName: "",
        lastName:"",
        email: "",
        password: "",
        passwordConfirm: "",
        checked: false,
        error: "",
        errorPassword: "",
        errorChecked: ""
      }
    };
  },
  methods: {
    signUp() {
      var form = this.form;
      if (this.checkForm()) {
        fetch({
          query: `mutation signUp($newUser: UserInput!){
            signUp(user: $newUser){
              id
              email
              first_name
              middle_name
              last_name
              privacy_settings
              linked_in
              organization
            }
          }`,
          variables: {
            newUser: {
              email: form.email,
              password: form.password,
              first_name: form.firstName,
              last_name: form.lastName,
              privacy_settings: "Public"
            }
          }
        })
        .then(res => {
          if (res.data) {
            var userInfo = res.data.signUp
            userInfo.follow = []
            userInfo.attend = []
            userInfo.manage = []
            userInfo.waitlist = []
            this.$store.commit("setLogin", userInfo);
            this.$router.push("myevents");
          } else {
            form.error = res.errors[0].message;
          }
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    login() {
      this.$router.push("login");
    },
    checkForm() {
      var form = this.form;
      // console.log("in check", form.password === form.passwordConfirm);
      // console.log(form)
      if (
        form.firstName &&
        form.lastName &&
        form.email &&
        form.password &&
        form.passwordConfirm &&
        form.checked &&
        form.password === form.passwordConfirm
      ) {
        return true;
      } else {
        form.error = "Please complete full form";
      }
      if (form.password !== form.passwordConfirm) {
        form.errorPassword = "Passwords did not match";
      }
      if (!form.checked) {
        form.errorChecked = "Must accept terms and conditions";
      }
      return false;
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/_variables";

.register-page {
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
      margin-bottom: 50px;
      display: block;
    }

    .signin-btn {
      width: 160px;
    }

    .login-box {
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  .layout-container .container .view.register-page {
    margin-left: -5px;
    margin-right: -5px;
    max-width: calc(100% + 10px);
  }
}
</style>

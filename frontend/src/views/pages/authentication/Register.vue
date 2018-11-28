<template>
	<vue-scroll class="register-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				<span style="color: red;"> {{ form.error.main }} </span>
				<float-label class="styled">
					<input type="text" v-model="form.firstName" placeholder="First Name">
  				<span style="color: red; font-size:75%;"> {{ form.error.firstName }} </span>
				</float-label>
        <float-label class="styled">
					<input type="text" v-model="form.middleName" placeholder="Middle Name">
				</float-label>
        <float-label class="styled">
					<input type="text" v-model="form.lastName" placeholder="Last Name">
	  			<span style="color: red; font-size:75%;"> {{ form.error.lastName }} </span>
				</float-label>
				<float-label class="styled">
					<input type="email" v-model="form.email" placeholder="E-mail">
				<span style="color: red; font-size:75%;"> {{ form.error.email }} </span>
				</float-label>
				<float-label class="styled">
					<input type="password" v-model="form.password" placeholder="Password">
				<span style="color: red; font-size:75%;"> {{ form.error.password }} </span>
				</float-label>
				<float-label class="styled">
					<input type="password" v-model="form.passwordConfirm" placeholder="Password (confirm)">
				<span style="color: red; font-size:75%;"> {{ form.error.passwordConfirm }} </span>
				</float-label>
				<span style="color: red; font-size:75%;"> {{ form.error.passwordCheck }} </span>
				<div class="flex">
					<div class="box grow">
            <el-checkbox v-model="form.checked" >I read and accept terms</el-checkbox> <br>
				<span style="color: red; font-size:75%;"> {{ form.error.checked }} </span>
          </div>
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
import layouts from '../../../layout'
import { createApolloFetch } from "apollo-fetch"
const fetch = createApolloFetch({ uri: "http://localhost:4000/graphql" });
export default {
  name: "Register",
  data() {
    return {
      form: {
        firstName: "",
        middleName: "",
        lastName:"",
        email: "",
        password: "",
        passwordConfirm: "",
        checked: false,
        error: {
          main: "",
          password: "",
          passwordConfirm:'',
          passwordCheck: '',
          checked: "",
          firstName: "",
          lastName: "",
          email:"",
        }
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
              landing_page
              menu_orientation
            }
          }`,
          variables: {
            newUser: {
              email: form.email,
              password: form.password,
              first_name: form.firstName,
              last_name: form.lastName,
              middle_name: form.middleName,
              privacy_settings: "Public"
            }
          }
        })
        .then(res => {
          console.log(res.data)
          var userInfo = res
          userInfo.manage = []
          userInfo.follow = []
          userInfo.attend = []
          userInfo.waitlist = []
          if (res.data) {
            var userInfo = res.data.signUp
            userInfo.follow = []
            userInfo.attend = []
            userInfo.manage = []
            userInfo.waitlist = []
            userInfo.associate = []
            var layout = layouts.navRight
            layout.navPos = userInfo.menu_orientation.toLowerCase()
            this.$store.commit("setLayout", layout)
            this.$store.commit("setLogin", userInfo)
            this.$router.push("myevents")
          } else {
            form.error.email = res.errors[0].message;
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
      for (var property in form.error) {
        form.error[property] = ''
      }
      var required = "This field is required"
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
        form.error.main = "Please complete full form";
      }
      if (form.password !== form.passwordConfirm){
        form.error.passwordCheck = "Passwords did not match"
      } else {
        if (!form.password) form.error.password = required
        if (!form.passwordConfirm) form.error.passwordConfirm = required
      }
      if (!form.checked) form.error.checked = "Must accept terms and conditions";
      
      if (!form.firstName) form.error.firstName = required
      if (!form.lastName) form.error.lastName = required
      if (!form.email) form.error.email = required
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

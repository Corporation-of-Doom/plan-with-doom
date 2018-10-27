<template>
	<vue-scroll class="register-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				<span style="color: red;"> {{ form.error }} </span>
				<float-label class="styled">
					<input type="text" v-model="form.name" placeholder="Name">
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
					<el-button plain size="small" @click="loginPage" class="signin-btn tada animated">
						SIGN IN
					</el-button>
				</div>

				<div class="text-center login-box pt-10">
					Already have an account? <a @click="loginPage">Login</a>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        name: "",
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
    login() {
      if (this.checkForm()) {
        this.$store.commit("setLogin");
        this.$router.push("myevents");
      }
    },
    loginPage() {
      this.$router.push("login");
    },
    checkForm() {
      var form = this.form;
      // console.log("in check", form.password === form.passwordConfirm);
      if (
        form.name &&
        form.email &&
        form.password &&
        form.passwordConfirm &&
        form.checked &&
        form.password === form.passwordConfirm
      ) {
        return true;
      } else {
        this.form.error = "Please complete full form";
      }
      if (form.password !== form.passwordConfirm) {
        this.form.errorPassword = "Passwords did not match";
      }
      if (!form.checked) {
        this.form.errorChecked = "Must accept terms and conditions";
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

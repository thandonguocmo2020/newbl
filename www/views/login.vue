<template>
  <div class="animsition page-login-v3 layout-full">
    <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
      <div class="page-content vertical-align-middle animation-slide-top animation-duration-1">
        <div class="panel">
          <div class="panel-body">
            <div class="brand">
              <img class="brand-img" src="" alt="...">
              <h2 class="brand-text font-size-18">Remark</h2>
            </div>

            <div class="form-group form-material floating" data-plugin="formMaterial">
              <input type="email" v-model="mail" class="form-control" name="email" />
              <label class="floating-label">Email</label>
            </div>
            <div class="form-group form-material floating" data-plugin="formMaterial">
              <input type="password" v-model="pwd" class="form-control" name="password" />
              <label class="floating-label">Password</label>
            </div>
            <div class="form-group clearfix">
              <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-lg float-left">
                <!-- <input type="checkbox" id="inputCheckbox" name="remember"> -->
                <!-- <label for="inputCheckbox">Remember me</label> -->
              </div>
        
              <router-link class="float-right" :to="{name: 'send-pwd'}">Forgot password?</router-link>
            </div>
            <button type="button" class="btn btn-primary btn-block btn-lg mt-40" @click="login">Sign in</button>

            <p>Still no account? Please go to
              <a href="/register">Sign up</a>
            </p>
          </div>
        </div>
        <footer class="page-copyright page-copyright-inverse">
          <p>WEBSITE BY amazingSurge</p>
          <p>© 2017. All RIGHT RESERVED.</p>
          <div class="social">
            <a class="btn btn-icon btn-pure" href="javascript:void(0)">
              <i class="icon bd-twitter" aria-hidden="true"></i>
            </a>
            <a class="btn btn-icon btn-pure" href="javascript:void(0)">
              <i class="icon bd-facebook" aria-hidden="true"></i>
            </a>
            <a class="btn btn-icon btn-pure" href="javascript:void(0)">
              <i class="icon bd-google-plus" aria-hidden="true"></i>
            </a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mail: '',
      pwd: ''
    }
  },
  methods: {
    login() {

      let seft = this;
      let formData = JSON.parse(JSON.stringify({
        mail: seft.mail,
        pwd: seft.pwd
      }));


      this.$store.dispatch("AUTH_LOGIN", formData).then(api => {

        if (api.body.stt == 1) {

          seft.$store.dispatch("MEMBER_INFO", { token: api.body.token });

          seft.$router.push({ name: 'c-post' });
        } else {
          seft.$message({
            type: "error",
            title: "Alert Login",
            message: api.body.message
          })
        }

      });

    }
  }
}
</script>

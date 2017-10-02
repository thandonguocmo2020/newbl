<template>
  <div class="animsition page-register-v3 layout-full">
    <!--[if lt IE 8]>
          <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->
    <!-- Page -->
    <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">>
      <div class="page-content vertical-align-middle animation-slide-top animation-duration-1">
        <div class="panel">
          <div class="panel-body">
            <div class="brand">
              <img class="brand-img" src="" alt="...">
              <h2 class="brand-text font-size-18">Remark</h2>
            </div>

            <div class="form-group form-material floating" data-plugin="formMaterial">
              <input type="text" v-validate="'required'" class="form-control" v-model="fn" name="name" />
              <label class="floating-label">Full Name</label>
              <span v-show="errors.has('name')" class="help text-danger">{{ errors.first('name') }}</span>

            </div>
            <div class="form-group form-material floating" data-plugin="formMaterial">
              <input type="email" v-validate="'required'" class="form-control" v-model="mail" name="email" />
              <label class="floating-label">Email</label>
              <span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>

            </div>
            <div class="form-group form-material floating" data-plugin="formMaterial">
              <input type="password" v-validate="'required|min:8|confirmed:passwordCheck'" class="form-control" v-model="pwd" name="password" />
              <label class="floating-label">Password</label>
              <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password') }}</span>

            </div>
            <div class="form-group form-material floating" data-plugin="formMaterial">
              <input type="password" class="form-control"    name="passwordCheck" />
              <label class="floating-label">Re-enter Password</label>

            </div>
            <button type="button" class="btn btn-primary btn-block btn-lg mt-40" @click="register">Sign up</button>

            <p>Have account already? Please go to
              <a href="/login">Sign In</a>
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
    <!-- End Page -->
    <!-- Core  -->
  </div>
</template>
<script>

export default {
  data() {
    return {
      fn: '',
      mail: '',
      pwd: ''
    }
  },
  methods: {
    register() {

      let seft = this;
      this.$validator.validateAll();
      if (!this.errors.any()) {

      let fromData = JSON.parse(JSON.stringify({
        mail: this.mail,
        pwd: this.pwd,
        fn: this.fn
      }));

      this.$store.dispatch('AUTH_REGISTER', fromData).then(Register => {

        if (Register.body.success == 0) {

          Object.assign(this.$data, this.$options.data.apply(this));

          seft.$message({
            type: 'error',
            title: ' Status Register',
            message: Register.body.message,
            duration: 3000
          })

        } else {

          Object.assign(this.$data, this.$options.data.apply(this));

          seft.$message({
            type: 'success',
            title: ' Status Register',
            message: Register.body.message,
            duration: 3000
          });
          seft.$router.push({ name: 'login' });
        }
      });
      }
    }
  }
}

</script>
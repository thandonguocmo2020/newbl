<template>
  <div>

    <div>

      <div class="col-md-6 col-lg-6" v-if="user">

       <form method="post" v-on:submit.prevent="submitUpdate($event)">
          <div class="example-warp">
            <h4 class="example-title">
              Full Name
            </h4>
            <div class="example">
              <div class="input-group">
                    <input type="hidden" :value="user._id" name="_id"/>
                <input class="form-control" v-validate="'required'" type="text" name="fn" :value="user.fn">
                <p>
                <span v-show="errors.has('fn')" class="help text-danger">{{ errors.first('fn') }}</span>
              </p>
              </div>
            </div>

            <h4 class="example-title">
              Email
            </h4>
            <div class="example">
              <div class="input-group">
                <input class="form-control" v-validate="'required|email'" type="text" name="mail" :value="user.mail">
              <p>
                <span v-show="errors.has('mail')" class="help text-danger">{{ errors.first('mail') }}</span>
             </p>
              </div>
            </div>

            <h4 class="example-title">
              Image
            </h4>
            <p>
              <img v-if="user.img" :src="user.img" class="img-rounded" width="150" height="150" />

            </p>
            <div class="example">
              <div class="input-group">
                <input class="form-control" v-validate="'required|url'" type="text" name="img" :value="user.img">
               <p>
                  <span v-show="errors.has('img')" class="help text-danger">{{ errors.first('img') }}</span>
               </p>
              </div>
            </div>

            <div class="example">
              <div class="input-group">
                <button type="submit" class="btn btn-default">Update</button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>

  </div>
</template>
<script>

import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      'user': 'member'
    })
  },
  methods: {
    submitUpdate(e) {
  
      let seft = this;
      this.$validator.validateAll();
      if (!this.errors.any()) {
        this.$store.dispatch('MEMBER_UPDATE', $(e.target).serialize()).then(api=>{
          if(api.body.stt == 1){
            seft.$message({
              type: 'success',
              message: api.body.message,
              title: 'Alert Update',
              duration: 3000
            })
          }
        });
      }
    }
  }
}
</script>

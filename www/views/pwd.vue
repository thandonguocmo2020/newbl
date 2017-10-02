<template>
    <div>
        <div class="col-md-6 col-lg-6" v-if="user">
            <form method="post" v-on:submit.prevent="submitUpdate($event)">
                <div class="example-warp">
                    <h4 class="example-title">
                        Old Password
                    </h4>
                    <div class="example">
                        <div class="input-group">
                            <input type="hidden" :value="user._id" name="_id" />
                            <input class="form-control" type="password" name="pwd" placeholder="*******">
                        </div>
                    </div>

                    <h4 class="example-title">
                        New Password
                    </h4>
                    <div class="example">
                        <div class="input-group">
                            <input class="form-control" v-validate="'required|min:8|confirmed:passwordCheck'" type="password" name="new_pwd" placeholder="*******">

                        </div>
                        <div>
                            <span v-show="errors.has('new_pwd')" class="help text-danger">{{ errors.first('new_pwd') }}</span>
                        </div>
                    </div>

                    <h4 class="example-title">
                        Comfirm Password
                    </h4>
                    <div class="example">
                        <div class="input-group">
                            <input class="form-control" type="password" name="passwordCheck" placeholder="*******">

                        </div>
                    </div>

                    <div class="example">
                        <div class="input-group">
                            <button type="submit" class="btn btn-default">Update Password</button>
                        </div>
                    </div>

                </div>
            </form>
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
                this.$store.dispatch('MEMBER_UPDATE_PASSWORD', $(e.target).serialize()).then(api => {

                    if (api.body.stt == 1) {
                        seft.$message({
                            type: 'success',
                            message: api.body.message,
                            title: 'Alert Update',
                            duration: 3000
                        })
                    }else{
                         seft.$message({
                            type: 'error',
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

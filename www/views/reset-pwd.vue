<template>
    <div  class="offset-4 page-forgot-password page-content vertical-align-middle animation-slide-top animation-duration-1">
        <h2>Your Password ?</h2>
        <p>Input new passowd </p>
        <form method="post" v-on:submit.prevent="updatePwd($event)" role="form">
            <div class="form-group">
                
                <input type="password" class="form-control" id="new_pwd" name="new_pwd" placeholder="******">
            </div>
            <div class="form-group">
                <p>Confirm password </p>
                <input type="password" class="form-control" id="CheckPwd" name="confirm_pwd" placeholder="******">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-success btn-block">Update Password</button>
            </div>
            <div class="form-group">
                <router-link :to="{name:'login'}" class="btn btn-primary btn-block">Login</router-link>
           
            </div>
        </form>
    </div>
</template>
<script>
export default {

    methods: {
        updatePwd(e) {
            let seft = this;

            if(this.$route.params.id){
                let data = {
                        new_pwd: $("#new_pwd").val(),
                        _id: this.$route.params.id,
                        reset: true
                }
                
                
                $.post('/auth/change-pwd',data ,function(api, status){

                if(api.stt == 1){
                            seft.$message({
                                type: 'success',
                                title: 'alert',
                                message: api.message,
                                duration: 3000
                            });
                            }else{

                            seft.$message({
                                type: 'error',
                                title: 'alert',
                                message: api.message,
                                duration: 3000
                            });
                        }
                });
            }

       
        }
    }
}
</script>

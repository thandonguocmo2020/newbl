<template>
    <div  class="offset-4 page-forgot-password page-content vertical-align-middle animation-slide-top animation-duration-1">
        <h2>Forgot Your Password ?</h2>
        <p>Input your registered email to reset your password</p>
        <form method="post" v-on:submit.prevent="resetPwd($event)" role="form">
            <div class="form-group">
                <input type="email" class="form-control" id="inputEmail" name="email" placeholder="Your Email">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Reset Your Password</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {

    methods: {
        resetPwd(e) {
            let seft = this;
            $.post('/send-mail-pwd', $(e.target).serialize(),function(api, status){

                if(api.stt == 1){
                            seft.$message({
                                type: 'success',
                                title: 'alert',
                                message: api.msg,
                                duration: 3000
                            });
                            }else{

                            seft.$message({
                                type: 'error',
                                title: 'alert',
                                message: api.msg,
                                duration: 3000
                            });
                            }
                });
        }
    }
}
</script>

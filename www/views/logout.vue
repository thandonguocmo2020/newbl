<template>
    <div class="logout">
            Logout
    </div>
</template>
<script>

export default {
    created(){
        localStorage.removeItem('hash');
        localStorage.removeItem('auth');
        // this.$router.push({name: 'login'});
    }
}
</script>
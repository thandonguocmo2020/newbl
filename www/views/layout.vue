<template>
<div>

<div>
   <page-header></page-header>
    <div class="row mt-50">

      <div class="col-md-2 offset-1">

        <page-aside></page-aside>

      </div>
      <div class="col-md-8">
          <transition name="fade" mode="out-in">
            <router-view class="view" keep-alive> </router-view>
        </transition>
      </div>
    </div>
</div>
   
</div>
</template>
<script>
import  Aside from './_navbar.vue';
import Header from './_head.vue';
export default {
    components: {
            'page-header': Header,
            'page-aside': Aside
    },
}
</script>

<style scoped="">

.page {
    margin-left : 0px;
}

.page-main {
    min-height: 720px;
}
</style>
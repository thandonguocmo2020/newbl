<template>
  <div class="list-group bg-blue-grey-100 bg-inherit">
    <router-link class="list-group-item blue-grey-500" :to="{name: 'c-user'}">
      <i class="icon wb-user" aria-hidden="true"></i> Profile
    </router-link>

    <router-link class="list-group-item blue-grey-500" :to="{name: 'c-pwd'}">
      <i class="icon wb-unlock" aria-hidden="true"></i> Change Password
    </router-link>

    <router-link class="list-group-item blue-grey-500" :to="{name: 'c-post'}">

      <i class="icon wb-tag" aria-hidden="true"></i> Post Manage
    </router-link>

  </div>
</template>
<script>
export default {

}
</script>

<template>
  <nav v-if="user" class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega" role="navigation">
    <div class="navbar-header">
      <button type="button" class="navbar-toggler hamburger hamburger-close navbar-toggler-left hided" data-toggle="menubar">
        <span class="sr-only">Toggle navigation</span>
        <span class="hamburger-bar"></span>
      </button>
      <button type="button" class="navbar-toggler collapsed" data-target="#site-navbar-collapse" data-toggle="collapse">
        <i class="icon wb-more-horizontal" aria-hidden="true"></i>
      </button>
      <div class="navbar-brand navbar-brand-center site-gridmenu-toggle" data-toggle="gridmenu">
        <!-- <img class="navbar-brand-logo" src="../../assets/images/logo.png" title="Remark"> -->
        <span class="navbar-brand-text hidden-xs-down"> Remark</span>
      </div>
      <button type="button" class="navbar-toggler collapsed" data-target="#site-navbar-search" data-toggle="collapse">
        <span class="sr-only">Toggle Search</span>
        <i class="icon wb-search" aria-hidden="true"></i>
      </button>
    </div>
    <div class="navbar-container container-fluid">
      <!-- Navbar Collapse -->
      <div class="collapse navbar-collapse navbar-collapse-toolbar" id="site-navbar-collapse">
        <!-- Navbar Toolbar -->

        <!-- End Navbar Toolbar -->
        <!-- Navbar Toolbar Right -->
        <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
          <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="javascript:void(0)" data-animation="scale-up" aria-expanded="false" role="button">
              <span class="flag-icon flag-icon-us font-size-20"></span> {{user.fn}}
            </a>
          </li>

          <li class="nav-item">
            <button  @click="logout" class="btn btn-sm  btn-success m-10 text-while">
              Logout
            </button>

  
          </li>
        </ul>
        <!-- End Navbar Toolbar Right -->
      </div>
      <!-- End Navbar Collapse -->
      <!-- Site Navbar Seach -->
      <div class="collapse navbar-search-overlap" id="site-navbar-search">
        <form role="search">
          <div class="form-group">
            <div class="input-search">
              <i class="input-search-icon wb-search" aria-hidden="true"></i>
              <input type="text" class="form-control" name="site-search" placeholder="Search...">
              <button type="button" class="input-search-close icon wb-close" data-target="#site-navbar-search" data-toggle="collapse" aria-label="Close"></button>
            </div>
          </div>
        </form>
      </div>
      <!-- End Site Navbar Seach -->
    </div>
  </nav>
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
    logout(){
         localStorage.removeItem('hash');
        localStorage.removeItem('auth');
        this.$router.push({name: 'login'});
    }
  },
  created() {
    let token = localStorage.getItem("hash");
    this.$store.dispatch("MEMBER_INFO", { token: token });
  }

}
</script>
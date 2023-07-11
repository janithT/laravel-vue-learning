<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <router-view />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar";
import AsideMenu from "@/components/AsideMenu";
import FooterBar from "@/components/FooterBar";

export default {
  name: "home",
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    menu() {
      return this.$store.state.isAdmin
        ? // for  admin users
          [
            "General",
            [
              {
                to: "/",
                icon: "desktop-mac",
                label: "Dashboard"
              }
            ],
          ]
        : // for help desk users
          [
            "General",
            [
              {
                to: "/",
                icon: "desktop-mac",
                label: "Dashboard"
              }
            ]
          ]
            
    }
  },
  created() {
    // axios
    //   .get("/user")
    //   .then(r => {
    //     this.$store.commit("user", r.data.data);
    //   })
    //   .catch(err => {
    //     this.$buefy.toast.open({
    //       message: `Error: ${err.message}`,
    //       type: "is-danger"
    //     });
    //   });
  }
};
</script>

<template>
  <aside v-show="isAsideVisible" class="aside is-placed-left is-expanded">
    <aside-tools :is-main-menu="true">
      <span slot="label"> <b>Service</b> {{ loginUserRole }} </span>
    </aside-tools>
    <div class="menu is-menu-main">
      <template v-for="(menuGroup, index) in menu">
        <p class="menu-label" v-if="typeof menuGroup === 'string'" :key="index">
          {{ menuGroup }}
        </p>
        <aside-menu-list
          v-else
          :key="index"
          @menu-click="menuClick"
          :menu="menuGroup"
        />
      </template>
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import AsideTools from "@/components/AsideTools";

export default {
  name: "AsideMenu",
  components: { AsideTools },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    loginUserRole() {
      //determine login user role
      return this.$store.state.isAdmin ? "Admin" : "Help Desk";
    },
    ...mapState(["isAsideVisible"])
  },
  methods: {
    menuClick(item) {
      //
    }
  }
};
</script>

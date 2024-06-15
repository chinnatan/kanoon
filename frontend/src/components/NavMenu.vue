<template>
  <div>
    <v-navigation-drawer app v-model="drawer" v-if="drawer" temporary>
      <v-list nav active-class="accent--text text--accent-4">
        <v-list-item
          prepend-icon="mdi-home"
          :title="$t('menuName.home')"
          to="/home"
        />
        <v-list-item
          prepend-icon="mdi-warehouse"
          :title="$t('menuName.stock')"
          to="/stock"
        />
        <v-list-item
          prepend-icon="mdi-cart-plus"
          :title="$t('menuName.product')"
          to="/product"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon
        class="white--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">{{ $t("appName") }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <label class="white--text"> {{ fullname }} </label>
      <v-icon class="ma-2 white--text" @click="logout()">mdi-logout</v-icon>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
export default {
  name: "NavMenu",
  props: {
    fullname: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<template>
  <v-app>
    <NavMenu v-if="fullname.length != 0" :fullname="fullname"/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  name: "App",
  data() {
    return {
      fullname: "123",
    };
  },
};
</script>

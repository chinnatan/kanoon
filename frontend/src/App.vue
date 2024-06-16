<template>
  <v-app>
    <NavMenu v-if="userInfo.id != null" :fullname="userInfo.fullname" />

    <!-- Notification -->
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      transition="slide-x-transition"
      :key="snackbar.id"
      :timeout="snackbar.timeout"
      v-model="snackbar.showing"
      :color="snackbar.color"
      :style="`top: ${index * 60}px`"
      location="top"
      position="right"
    >
      <p>
        <v-icon class="mr-1">{{ snackbar.icon }}</v-icon> {{ snackbar.text }}
      </p>
      <template v-slot:actions>
        <v-icon @click="removeNotification(snackbar)">mdi-close</v-icon>
      </template>
    </v-snackbar>
    <!-- Notification -->

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      userInfo: "user/info",
      snackbars: "notification/snackbars",
    }),
  },
  methods: {
    ...mapActions({
      removeNotification: "notification/removeNotification",
    }),
  },
};
</script>

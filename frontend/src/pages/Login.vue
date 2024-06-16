<template>
  <v-main>
    <v-container class="fill-height">
      <v-responsive>
        <v-card class="mx-auto my-auto" elevation="1" max-width="600">
          <v-card-title class="text-h3 text-center">{{
            $t("appName")
          }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col col="12">
                <v-form v-model="form" @submit.prevent="onSubmit">
                  <v-text-field
                    class="mb-2"
                    v-model="username"
                    :label="$t('username')"
                    :readonly="loading"
                    :rules="[required]"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    density="comfortable"
                  />
                  <v-text-field
                    class="mb-2"
                    v-model="password"
                    :label="$t('password')"
                    :readonly="loading"
                    :rules="[required]"
                    prepend-inner-icon="mdi-lock"
                    variant="outlined"
                    density="comfortable"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    @click:append-inner="passwordVisible"
                  />
                  <v-btn
                    type="submit"
                    :disabled="!form"
                    color="primary"
                    :loading="loading"
                    block
                    >{{ $t("login") }}</v-btn
                  >
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-responsive>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: false,
    };
  },
  computed: {
    ...mapGetters({
      visible: "user/visible",
      loading: "user/loading",
    }),
    username: {
      get() {
        return this.$store.state.user.username;
      },
      set(value) {
        this.$store.state.user.username = value;
      },
    },
    password: {
      get() {
        return this.$store.state.user.password;
      },
      set(value) {
        this.$store.state.user.password = value;
      },
    },
  },
  methods: {
    ...mapActions({
      passwordVisible: "user/passwordVisible",
      showLoading: "user/showLoading",
      dismissLoading: "user/dismissLoading",
      onLogin: "user/login",
      addNotification: "notification/addNotification",
    }),
    onSubmit() {
      if (!this.form) return;
      this.onLogin({ username: this.username, password: this.password });
    },
    required(v) {
      return !!v || "กรุณากรอกข้อมูลในช่องว่าง";
    },
  },
};
</script>

<style scoped>
.v-main {
  height: 100%;
  background: radial-gradient(
    circle,
    rgb(var(--v-theme-secondary)) 0%,
    rgb(var(--v-theme-primary)) 100%
  ) !important;
}
</style>

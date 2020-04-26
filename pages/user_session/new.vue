<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card>
        <v-subheader>ログイン</v-subheader>
        <v-form ref="form">
          <v-card-text>
            <v-text-field
              v-model="loginForm.email"
              :rules="[rules.required, rules.email]"
              label="メールアドレス"
            ></v-text-field>
            <v-text-field
              v-model="loginForm.password"
              :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              label="パスワード"
              :rules="[rules.required]"
              class="input-group--focused"
              @click:append="visible = !visible"
            ></v-text-field>
          </v-card-text>
        </v-form>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition></v-slide-x-reverse-transition>
          <v-btn color="primary" raised @click="submit">ログイン</v-btn>
        </v-card-actions>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn color="primary" text to="/users/new" nuxt>ユーザー登録はこちら</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },

      visible: false,
      rules: {
        required: value => !!value || "必須です",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "無効なメールアドレスです";
        }
      }
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch("auth/login", this.loginForm);
          // alert("ログイン成功")
          this.$router.push("/boards")
        } catch (err) {
          alert(err)
        }
      }
    }
  }
};
</script>
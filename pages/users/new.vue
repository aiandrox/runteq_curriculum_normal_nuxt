<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card>
        <v-subheader>ユーザー登録</v-subheader>
        <v-form ref="form">
          <v-card-text>
            <v-text-field v-model="signUpForm.last_name" :rules="[rules.required]" label="姓"></v-text-field>
            <v-text-field v-model="signUpForm.first_name" :rules="[rules.required]" label="名"></v-text-field>
            <v-text-field
              v-model="signUpForm.email"
              :rules="[rules.required, rules.email]"
              label="メールアドレス"
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.password"
              :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              label="パスワード"
              class="input-group--focused"
              :rules="[rules.required]"
              @click:append="visible = !visible"
            ></v-text-field>
            <v-text-field
              v-model="signUpForm.password_confirmation"
              :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              label="パスワード確認"
              class="input-group--focused"
              :rules="[rules.required]"
              @click:append="visible = !visible"
            ></v-text-field>
          </v-card-text>
        </v-form>

        <v-divider class="mt-12"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition></v-slide-x-reverse-transition>
          <v-btn color="primary" raised @click="submit">登録</v-btn>
        </v-card-actions>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn color="primary" text to="/user_session/new" nuxt>ログインページはこちら</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      signUpForm: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },

      visible: false,
      rules: {
        required: value => !!value || "必須項目です",
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
              await this.$store.dispatch("auth/signup", this.signUpForm);
              // alert("ユーザー登録成功")
              this.$router.push("/boards")
            } catch (err) {
              alert(err)
            }
          }
        }
    }
  };
</script>
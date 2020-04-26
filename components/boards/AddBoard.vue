<template>
  <v-row justify="center">
    <v-dialog v-model="isVisible" max-width="600px">
      <v-form ref="form">
        <v-card>
          <v-card-title>
            <span class="headline">掲示板作成</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="タイトル" :rules="[rules.required]" v-model="boardForm.title"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea label="本文" :rules="[rules.required]" v-model="boardForm.body"></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Close</v-btn>
            <v-btn color="blue darken-1" text @click="createBoard">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      boardForm: {
        title: null,
        body: null
      },
      rules: {
        required: value => !!value || "必須です",
      }
    }
  },
  methods: {
    open() {
      this.isVisible = true
    },
    close() {
      this.boardForm = {}
      this.isVisible = false
    },
    async createBoard() {
      if (this.$refs.form.validate()) {
        this.$emit("createBoard", this.boardForm);
      }
    }
  }
};
</script>
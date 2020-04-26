<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">
          <nuxt-link :to="{ name: 'boards-id', params: { id: board.id }}">{{board.title}}</nuxt-link>
        </v-list-item-title>
        <v-list-item-subtitle>by {{board.user.full_name}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img :src="board.board_image" height="194"></v-img>

    <v-card-text>{{board.body}}</v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    board: {
      type: Object,
      required: true
    }
  },
};
</script>
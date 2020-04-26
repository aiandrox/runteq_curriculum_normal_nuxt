<template>
  <div>
    <template>
      <v-btn
        fab
        color="pink accent-2"
        @click="openAddBoardModal"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <add-board ref="addBoardModal" @createBoard="createBoard"></add-board>
    <v-container>
      <v-row>
        <v-col cols="6" md="4" v-for="board in boards" :key="board.id">
          <board :board="board"></board>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Board from "@/components/boards/Board";
import AddBoard from "@/components/boards/AddBoard";
export default {
  meta: {
    requiresAuth: true
  },
  data() {
    return {
      boards: []
    }
  },
  components: {
    Board,
    AddBoard
  },
  created() {
    this.fetchBoards()
  },

  methods: {
    fetchBoards() {
      this.$axios.get('/api/v1/boards').then(res => {
        this.boards = res.data.boards
      })
    },
    openAddBoardModal() {
      this.$refs.addBoardModal.open()
    },
    closeAddBoardModal() {
      this.$refs.addBoardModal.close()
    },
    createBoard(board) {
      this.$axios.post('/api/v1/boards', { board: board }).then(res => {
        this.boards.unshift(res.data.board)
        this.closeAddBoardModal()
      })
    }
  } 
};
</script>
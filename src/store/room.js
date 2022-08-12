export default {
  state: () => ({ room: "" }),
  getters: {
    getRoom: (state) => {
      return state.room
    },
  },
}

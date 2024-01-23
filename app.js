const app = Vue.createApp({
  data() {
    return {
      gameOver: false,
      isPlayerTurn: true,
      playerHealth: 100,
      monsterHealth: 100,
      logs: [],
    };
  },
  methods: {
    attack() {
      const deal = Math.floor(Math.random() * (20 - 5 + 1) + 5);
      const message = this.isPlayerTurn ? "Player" : "Monster";
      const finalMessage = message.concat(" attacks and deals ").concat(deal);

      if (this.isPlayerTurn) {
        this.playerHealth =
          this.playerHealth - deal < 0 ? 0 : this.playerHealth - deal;
      } else {
        this.monsterHealth =
          this.monsterHealth - deal < 0 ? 0 : this.monsterHealth - deal;
      }

      this.logs.push(finalMessage);
      this.isPlayerTurn = !this.isPlayerTurn;
    },
    surrender() {
      this.gameOver = true;
    },
    start() {
      this.gameOver = false;
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.isPlayerTurn = true;
      this.logs = [];
    },
  },
  computed: {
    youLose() {
      return this.playerHealth <= 0;
    },
  },
});

app.mount("#game");

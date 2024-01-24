function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const app = Vue.createApp({
  data() {
    return {
      isPlayerTurn: true,
      playerHealth: 100,
      monsterHealth: 100,
      winner: null,
      turn: 0,
      logs: [],
    };
  },
  methods: {
    attackMonster() {
      const deal = getRandom(5, 20);
      const message = this.isPlayerTurn ? "Player" : "Monster";
      const finalMessage = {
        subject: message,
        message: " attacks and deals ",
        action: deal,
      };

      this.playerHealth =
        this.playerHealth - deal < 0 ? 0 : this.playerHealth - deal;

      this.logs.push(finalMessage);
      this.isPlayerTurn = !this.isPlayerTurn;
    },
    attackPlayer() {
      const deal = getRandom(5, 20);
      const message = this.isPlayerTurn ? "Player" : "Monster";
      const finalMessage = {
        subject: message,
        message: " attacks and deals ",
        action: deal,
      };

      this.turn++;

      this.monsterHealth =
        this.monsterHealth - deal < 0 ? 0 : this.monsterHealth - deal;

      this.logs.push(finalMessage);
      this.isPlayerTurn = !this.isPlayerTurn;
      this.attackMonster();
    },
    specialAttack() {
      this.turn++;
      const deal = getRandom(10, 40);
      this.monsterHealth =
        this.monsterHealth - deal < 0 ? 0 : this.monsterHealth - deal;

      this.turn = 0;

      this.attackMonster();
    },
    heal() {
      this.turn++;
      const heal = getRandom(10, 40);
      this.playerHealth =
        this.playerHealth + heal >= 100 ? 100 : this.playerHealth + heal;

      this.attackMonster();
    },
    surrender() {
      this.winner = "player";
    },
    start() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.isPlayerTurn = true;
      this.logs = [];
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterHealthBar() {
      return { width: this.monsterHealth + "%" };
    },
    playerHealthBar() {
      return { width: this.playerHealth + "%" };
    },
    enableSpecialAttack() {
      return this.turn % 3 !== 0;
    },
    computedClass() {
      return {
        "log--player": this.isPlayerTurn,
        "log--monster": !this.isPlayerTurn,
      };
    },
  },
});

app.mount("#game");

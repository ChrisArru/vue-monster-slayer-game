function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const app = Vue.createApp({
  data() {
    return {
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
      const subject = "Monster";
      const message = " attacks and deals ";
      const type = "damage";

      this.playerHealth =
        this.playerHealth - deal < 0 ? 0 : this.playerHealth - deal;

      this.addLogMessage(subject, message, deal, type);
    },
    attackPlayer() {
      const deal = getRandom(5, 20);
      const subject = "Player";
      const message = " attacks and deals ";
      const type = "damage";

      this.turn++;

      this.monsterHealth =
        this.monsterHealth - deal < 0 ? 0 : this.monsterHealth - deal;

      this.addLogMessage(subject, message, deal, type);
      this.attackMonster();
    },
    specialAttack() {
      this.turn++;
      const deal = getRandom(10, 40);
      const message = " attacks and deals ";
      const type = "damage";

      this.monsterHealth =
        this.monsterHealth - deal < 0 ? 0 : this.monsterHealth - deal;

      this.addLogMessage("Player", message, deal, type);

      this.turn = 0;

      this.attackMonster();
    },
    heal() {
      this.turn++;
      const heal = getRandom(10, 40);
      const message = " heals himself by ";
      this.playerHealth =
        this.playerHealth + heal >= 100 ? 100 : this.playerHealth + heal;
      const type = "heal";

      this.addLogMessage("Player", message, heal, type);

      this.attackMonster();
    },
    surrender() {
      this.winner = "monster";
    },
    start() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.logs = [];
      this.turn = 0;
      this.winner = undefined;
    },
    addLogMessage(subject, message, action, type) {
      this.logs.push({
        subject,
        message,
        action,
        type,
      });
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
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerHealthBar() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    enableSpecialAttack() {
      return this.turn % 3 !== 0;
    },
  },
});

app.mount("#game");

class Game {
  constructor() {
    this.turns = 0;
    this.board = [[], []];
    this.won = [];
  }

  newGame = () => {
    document.querySelector("#won").textContent = "";
    this.won.forEach((x) => {
      allTiles[x].style.color = "black";
    });
    allTiles.forEach((x) => {
      x.textContent = "";
    });
    this.turns = 0;
    this.board = [[], []];
    this.won = [];
  };
  play = (click) => {
    const target = click.target;
    const targetID = target.id;
    if (this.isClickValid(click.srcElement.tagName) === true && target.textContent === "" && this.turns !== 10) {
      if (this.turns % 2 === 0) {
        target.textContent = PLAYER.X;
        this.turns += 1;
        this.board[0].push(targetID[targetID.length - 1]);
      } else {
        target.textContent = PLAYER.Y;
        this.turns += 1;
        this.board[1].push(targetID[targetID.length - 1]);
      }
    }
    if (this.turns > 4) {
      this.checkWin();
    }
  };
  isClickValid = (click) => {
    if (click === "SECTION") {
      return true;
    } else {
      return false;
    }
  };
  checkWin = () => {
    const winOrNot = this.winOrNot();
    if (winOrNot === "none") {
      this.checkEnd();
    } else {
      this.won.forEach((x) => {
        allTiles[x].style.color = "red";
      });
      document.querySelector("#won").textContent = `${PLAYER[winOrNot]} wins!`;
      this.turns = 10;
    }
  };
  checkEnd = () => {
    if (this.turns === 9) console.log("game ended, no winner");
  };
  winOrNot = () => {
    let winner = "none";
    for (let key in WINCONDITIONS) {
      let count = 0;
      WINCONDITIONS[key].forEach((x) => {
        if (this.board[0].includes(x)) {
          count += 1;
        } else if (this.board[1].includes(x)) {
          count -= 1;
        }
      });
      if (count === 3 || count === -3) {
        winner = count === 3 ? "X" : "Y";
        this.won = WINCONDITIONS[key];
        break;
      }
    }
    return winner;
  };
}

const tictactoe = new Game();
const allTilesNode = document.querySelectorAll("section");
const allTiles = Array.prototype.slice.call(allTilesNode);
document.querySelector("div").addEventListener("click", tictactoe.play);
document.querySelector("button").addEventListener("click", tictactoe.newGame);
allTiles.forEach((x) => (x.textContent = ""));

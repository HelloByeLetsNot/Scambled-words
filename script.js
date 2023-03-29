fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json")
  .then(response => response.json())
  .then(words => {
    const container = document.getElementById("game-container");
    const startButton = document.getElementById("start-button");
    let score = 0;
    
    function getRandomWord() {
      const wordList = Object.keys(words);
      return wordList[Math.floor(Math.random() * wordList.length)];
    }
    
    function scrambleWord(word) {
      const letters = word.split("");
      for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
      }
      return letters.join("");
    }
    
    function startGame() {
      const word = getRandomWord();
      const scrambledWord = scrambleWord(word);
      container.innerHTML = `
        <p>Unscramble this word: ${scrambledWord}</p>
        <input type="text" id="guess-input">
        <button id="guess-button">Guess</button>
        <p>Score: ${score}</p>
      `;
      const guessInput = document.getElementById("guess-input");
      const guessButton = document.getElementById("guess-button");
      guessButton.addEventListener("click", () => {
        const guess = guessInput.value.toLowerCase();
        if (guess === word) {
          score++;
          startGame();
        } else {
          alert("Incorrect. Try again.");
        }
      });
    }
    
    startButton.addEventListener("click", () => {
      startGame();
    });
  });

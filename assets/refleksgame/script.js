const directions = ["UP", "DOWN", "RIGHT", "LEFT", "NOT UP", "NOT DOWN", "NOT RIGHT", "NOT LEFT"];
const progressBar = document.getElementById("progress-bar");
const scoreText = document.getElementById("score");
const directionText = document.getElementById("direction-text");
const startButton = document.getElementById("start-button");

let currentDirection = "";
let score = 0;
let timer;

function getRandomDirection() {
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
}

function updateDirection() {
    currentDirection = getRandomDirection();
    directionText.textContent = currentDirection;
    directionText.classList.remove("changed");
    // Bir efekt eklemek için bir sınıf ekleyin ve sınıfı 100ms sonra kaldırın
    setTimeout(() => {
        directionText.classList.add("changed");
    }, 100);
}

function startTimer() {
    progressBar.style.transition = "width 0s"; // Transition'ı devre dışı bırak
    progressBar.style.width = "100%";
    
    setTimeout(() => {
        progressBar.style.transition = `width ${1400 / 1000}s linear`; // Transition'ı yeniden etkinleştir ve süreye ayarla
        progressBar.style.width = "0%"; // Progress çubuğunu sıfırla
    }, 10);

    clearInterval(timer);
    timer = setInterval(() => {
        endGame("Süre bitti!");
    }, 1400);
}

function endGame(message) {
    clearInterval(timer);
    alert(message + " Skorunuz: " + score);
    resetGame();
}

function resetGame() {
    score = 0;
    scoreText.textContent = score;
    updateDirection();
    startTimer();
}

document.addEventListener("keydown", (event) => {
    const keyPressed = event.key;
    
    if (currentDirection.includes("NOT")) {
        if (
            (currentDirection === "NOT UP" && (keyPressed === "ArrowRight" || keyPressed === "ArrowLeft" || keyPressed === "ArrowDown"))||
            (currentDirection === "NOT DOWN" && (keyPressed === "ArrowRight" || keyPressed === "ArrowLeft" || keyPressed === "ArrowUp"))||
            (currentDirection === "NOT RIGHT" && (keyPressed === "ArrowUp" || keyPressed === "ArrowLeft" || keyPressed === "ArrowDown"))||
            (currentDirection === "NOT LEFT" && (keyPressed === "ArrowRight" || keyPressed === "ArrowUp" || keyPressed === "ArrowDown"))

        ) {
            score++;
            scoreText.textContent = score;
            updateDirection();
            startTimer();
        } else {
            endGame("Yanlış tuşa bastınız!");
        }
    } else {
        if (
            (currentDirection === "UP" && keyPressed === "ArrowUp") ||
            (currentDirection === "DOWN" && keyPressed === "ArrowDown") ||
            (currentDirection === "RIGHT" && keyPressed === "ArrowRight") ||
            (currentDirection === "LEFT" && keyPressed === "ArrowLeft")
        ) {
            score++;
            scoreText.textContent = score;
            updateDirection();
            startTimer();
        } else {
            endGame("Yanlış tuşa bastınız!");
        }
    }
});

// Başla düğmesine tıklama olayını ekleyin
startButton.addEventListener("click", () => {
    resetGame();
});

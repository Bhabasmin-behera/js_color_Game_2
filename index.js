const colorNames = [
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Purple",
    "Cyan",
    "Magenta",
    "Orange",
    "Pink",
    "Brown",
    "Lime",
    "Olive",
    "Teal",
    "Navy",
    "Maroon",
    "Silver",
];


let winingScore = 3;

let tragetColor = "";
let score = 0;
let timer = 120;
let gameInterval, timerInterval;

let setRandomColor = () => {
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
        const randomIndex = Math.floor(Math.random() * colorNames.length)
        const randomColor = colorNames[randomIndex]
        cell.style.backgroundColor = randomColor;
        cell.setAttribute('data-color', randomColor)
    })
}
// setInterval(setRandomColor, 1000);

let setTragetColor = () => {
    const randomIndex = Math.floor(Math.random() * colorNames.length)
    tragetColor = colorNames[randomIndex]
    document.getElementById('targetColor').textContent = tragetColor

}
// setTragetColor()

let updateTimer = () => {
    timer--;
    document.getElementById('timer').textContent = formateTime(timer)

    if (timer <= 0) {
        endGame(false);
    }

}

let formateTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}
let initializeGame = () => {
    score = 0;
    timer = 120;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = formateTime(timer)
    document.getElementById('congratsOverlay').style.display = 'none';
    document.getElementById('loseOverlay').style.display = 'none';
    setRandomColor()
    setTragetColor();
    const bgm = document.getElementById("backgroundMusic");
    // bgm.play()
    gameInterval = setInterval(setRandomColor, 1000);
    timerInterval = setInterval(updateTimer, 1000);

}

let endGame = (iswin) => {
    clearInterval(gameInterval)
    clearInterval(timerInterval)
    document.getElementById("backgroundMusic").pause();

    const overlay = iswin ? document.getElementById('congratsOverlay')
        : document.getElementById('loseOverlay');
    overlay.style.display = 'block'

    if (iswin) {
        document.getElementById('winMusic').play();
    } else {
        document.getElementById('loseMusic').play();

    }

}

let handleclick = (e) => {
    const clickedColor = e.target.getAttribute('data-color')
    if (clickedColor === tragetColor) {
        score++;
        document.getElementById('score').textContent = score;
        if (score === winingScore) {
            endGame(true);
        }
        setRandomColor()
        setTragetColor();
        document.getElementById('correctMusic').play();
    } else {
        document.getElementById('incorrectMusic').play();
    }

}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleclick)
})

document.getElementById('restartGameOverlay').addEventListener('click', initializeGame);
document.getElementById('restartGameOverlaylose').addEventListener('click', initializeGame);



initializeGame()



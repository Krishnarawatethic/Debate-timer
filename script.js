let timerInterval,
    totalTime = {
        introduction: 120,
        openingQuaintrelle0: 120,
        questionsQuaintrelle0: 15,
        answersQuaintrelle0: 90,
        questionsQuaintrelle0_1: 15,
        answersQuaintrelle0_1: 90,
        openingInklore: 120,
        questionsInklore: 15,
        answersInklore: 90,
        questionsInklore_1: 15,
        answersInklore_1: 90,
        openingVintage: 120,
        questionsVintage: 15,
        answersVintage: 90,
        questionsVintage_1: 15,
        answersVintage_1: 90,
        openingRadkarkas: 120,
        questionsRadkarkas: 15,
        answersRadkarkas: 90,
        questionsRadkarkas_1: 15,
        answersRadkarkas_1: 90,
        openingWinyourbattle: 120,
        questionsWinyourbattle: 15,
        answersWinyourbattle: 90,
        questionsWinyourbattle_1: 15,
        answersWinyourbattle_1: 90,
        openingPratibha56: 120,
        questionsPratibha56: 15,
        answersPratibha56: 90,
        questionsPratibha56_1: 15,
        answersPratibha56_1: 90,
        openingBackFromTomb: 120,
        questionsBackFromTomb: 15,
        answersBackFromTomb: 90,
        questionsBackFromTomb_1: 15,
        answersBackFromTomb_1: 90,
        oneOnOne1: 360,
        oneOnOne2: 360,
        conclusion: 240
    },
    segments = [
        { name: "introduction", description: "Rules" },
        { name: "openingQuaintrelle0", description: "@Quaintrelle_0 Opening Statement" },
        { name: "questionsQuaintrelle0", description: "Rebuttal question by @Radkarkas" },
        { name: "answersQuaintrelle0", description: "Answer by @Quaintrelle_0" },
        { name: "questionsQuaintrelle0_1", description: "Rebuttal question by @Winyourbattle" },
        { name: "answersQuaintrelle0_1", description: "Answer by @Quaintrelle_0" },
        { name: "openingInklore", description: "@Inklore Opening Statement" },
        { name: "questionsInklore", description: "Rebuttal question by @pratibha56" },
        { name: "answersInklore", description: "Answer by @Inklore" },
        { name: "questionsInklore_1", description: "Rebuttal question by @Back_from_tomb" },
        { name: "answersInklore_1", description: "Answer by @Inklore" },
        { name: "openingVintage", description: "Vintage Opening Statement" },
        { name: "questionsVintage", description: "First rebuttal question" },
        { name: "answersVintage", description: "Answer by Vintage" },
        { name: "questionsVintage_1", description: "Second rebuttal question" },
        { name: "answersVintage_1", description: "Answer by Vintage" },
        { name: "openingRadkarkas", description: "@Radkarkas Opening Statement" },
        { name: "questionsRadkarkas", description: "Rebuttal question by Vintage" },
        { name: "answersRadkarkas", description: "Answer by @Radkarkas" },
        { name: "questionsRadkarkas_1", description: "Rebuttal question @heyigoesyay" },
        { name: "answersRadkarkas_1", description: "Answer by @Radkarkas" },
        { name: "openingWinyourbattle", description: "@Winyourbattle Opening Statement" },
        { name: "questionsWinyourbattle", description: "Rebuttal question by @Quaintrelle_0" },
        { name: "answersWinyourbattle", description: "Answer by @Winyourbattle" },
        { name: "questionsWinyourbattle_1", description: "Rebuttal question by @Inklore" },
        { name: "answersWinyourbattle_1", description: "Answer by @Winyourbattle" },
        { name: "openingPratibha56", description: "@pratibha56 Opening Statement" },
        { name: "questionsPratibha56", description: "Rebuttal questions by Me" },
        { name: "answersPratibha56", description: "Answer by @Radkarkas" },
        { name: "questionsPratibha56_1", description: "Rebuttal question by @heyigoesyay" },
        { name: "answersPratibha56_1", description: "Answer by @Radkarkas" },
        { name: "openingBackFromTomb", description: "@Back_from_tomb Opening Statement" },
        { name: "questionsBackFromTomb", description: "Rebuttal questions by @Quaintrelle_0" },
        { name: "answersBackFromTomb", description: "Answer by @Winyourbattle" },
        { name: "questionsBackFromTomb_1", description: "Second rebuttal question by @Inklore" },
        { name: "answersBackFromTomb_1", description: "Answer by @Winyourbattle" },
        { name: "oneOnOne1", description: "@Quaintrelle_0 V/S Selected Negative Member 1" },
        { name: "oneOnOne2", description: "@Inklore V/S Selected Negative Member 2" },
        { name: "conclusion", description: "Conclusion" }
    ],
    currentSegmentIndex = 0,
    isPaused = false,
    remainingTime = 0;

function startTimer() {
    let timerElement = document.getElementById("timer"),
        startButton = document.getElementById("startBtn"),
        pauseButton = document.getElementById("pauseBtn"),
        resumeButton = document.getElementById("resumeBtn");

    startButton.disabled = true;
    pauseButton.disabled = false;
    resumeButton.disabled = true;
    playNextSegment(timerElement, startButton, pauseButton, resumeButton);
}

function playNextSegment(timerElement, startButton, pauseButton, resumeButton) {
    if (currentSegmentIndex >= segments.length || isPaused) {
        clearInterval(timerInterval);
        timerElement.textContent = "Debate conducted. Thank you for participating!";
        startButton.disabled = false;
        pauseButton.disabled = true;
        resumeButton.disabled = true;
        return;
    }

    let currentSegment = segments[currentSegmentIndex];
    updateTimer(timerElement, totalTime[currentSegment.name], currentSegment.description);
    let segmentTime = isPaused ? remainingTime : totalTime[currentSegment.name];

    timerInterval = setInterval(() => {
        if (isPaused) {
            clearInterval(timerInterval);
            return;
        }
        if (segmentTime <= 0) {
            clearInterval(timerInterval);
            setTimeout(playBeepSound, 1000);
            currentSegmentIndex++;
            playNextSegment(timerElement, startButton, pauseButton, resumeButton);
        } else {
            remainingTime = --segmentTime;
            updateTimer(timerElement, segmentTime, currentSegment.description);
        }
    }, 1000);
}

function updateTimer(timerElement, timeInSeconds, description) {
    timerElement.textContent = `${Math.floor(timeInSeconds / 60).toString().padStart(2, "0")}:${(timeInSeconds % 60).toString().padStart(2, "0")} - ${description}`;
}

function pauseTimer() {
    let pauseButton = document.getElementById("pauseBtn"),
        resumeButton = document.getElementById("resumeBtn");

    clearInterval(timerInterval);
    isPaused = true;
    pauseButton.disabled = true;
    resumeButton.disabled = false;
    totalTime[segments[currentSegmentIndex].name] = remainingTime;
    localStorage.setItem("totalTime", JSON.stringify(totalTime));
}

function resumeTimer() {
    let pauseButton = document.getElementById("pauseBtn"),
        resumeButton = document.getElementById("resumeBtn");

    isPaused = false;
    pauseButton.disabled = false;
    resumeButton.disabled = true;
    totalTime = JSON.parse(localStorage.getItem("totalTime")) || totalTime;
    playNextSegment(document.getElementById("timer"), document.getElementById("startBtn"), pauseButton, resumeButton);
}

function toggleDarkMode(event) {
    let container = document.querySelector(".container"),
        timerElement = document.getElementById("timer"),
        decorElements = document.querySelectorAll(".decor");

    container.classList.toggle("dark-mode", event.target.checked);
    timerElement.style.color = event.target.checked ? "rgb(245, 245, 245)" : "#333";
    decorElements.forEach(element => {
        element.style.color = event.target.checked ? "rgb(245, 245, 245)" : "#333";
    });
}

function playBeepSound() {
    let beepAudio = document.getElementById("beepAudio");
    beepAudio.play();
    setTimeout(() => {
        beepAudio.pause();
        beepAudio.currentTime = 0;
    }, 4000);
}

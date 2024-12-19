document.addEventListener("DOMContentLoaded", () => {
    const studentInfo = document.getElementById("studentInfo");
    const openQuestionsContainer = document.getElementById("openQuestionsContainer");
    const nextButton = document.getElementById("nextButton");
    const timerElement = document.getElementById("timer");

    // Recupera i dati da localStorage
    const userName = localStorage.getItem("userName");
    const userClass = localStorage.getItem("userClass");
    const quizData = JSON.parse(localStorage.getItem("quizData"));
    let timeLeft = localStorage.getItem("timeLeft") || 30 * 60; // Recupera il tempo rimanente dalla homepage

    // Visualizza informazioni studente
    studentInfo.innerHTML = `
        <h3>${userName} - ${userClass}</h3>
    `;

    // Visualizza domande aperte
    if (quizData && quizData.aperte) {
        quizData.aperte.forEach((question, index) => {
            const div = document.createElement("div");
            div.className = "question";
            div.innerHTML = `
                <p>${index + 1}. ${question}</p>
                <textarea id="openAnswer${index + 1}" class="answer" placeholder="Scrivi la tua risposta qui..."></textarea>
            `;
            openQuestionsContainer.appendChild(div);
        });
    }

    // Timer
    const startTimer = () => {
        const interval = setInterval(() => {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            timerElement.textContent = `Tempo rimanente: ${minutes}:${seconds}`;

            // Salva il tempo rimanente in localStorage ogni secondo
            localStorage.setItem("timeLeft", timeLeft);

            if (timeLeft <= 0) {
                clearInterval(interval);
                window.location.href = "chiuse.html"; // Se il timer scade, passa alla pagina successiva
            } else {
                timeLeft--;
            }
        }, 1000);
    };

    // Funzione per passare alla pagina delle domande chiuse
    nextButton.addEventListener("click", () => {
        const openAnswers = [];
        quizData.aperte.forEach((question, index) => {
            const answer = document.getElementById(`openAnswer${index + 1}`).value;
            openAnswers.push(answer);
        });

        // Salva le risposte aperte in localStorage
        localStorage.setItem("openAnswers", JSON.stringify(openAnswers));

        // Reindirizza alla pagina delle domande chiuse
        window.location.href = "chiuse.html";
    });

    // Avvia il timer
    startTimer();
});

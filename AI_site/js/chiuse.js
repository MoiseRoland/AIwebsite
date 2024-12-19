// Aspetta che il contenuto della pagina sia completamente caricato prima di eseguire il codice
document.addEventListener("DOMContentLoaded", () => {
    // Riferimenti agli elementi HTML necessari
    const choiceQuestionsContainer = document.getElementById("choiceQuestionsContainer");
    const submitChoiceAnswersButton = document.getElementById("submitChoiceAnswers");
    const timerElement = document.getElementById("timer");

    // Recupera i dati salvati nel localStorage (domande del quiz, risposte aperte e tempo rimanente)
    const quizData = JSON.parse(localStorage.getItem("quizData"));  // Dati delle domande del quiz
    const openAnswers = JSON.parse(localStorage.getItem("openAnswers")) || []; // Risposte aperte (può essere vuoto)
    let timeLeft = localStorage.getItem("timeLeft") || 30 * 60; // Tempo rimanente (30 minuti per default)

    // Se i dati delle domande a scelta multipla sono presenti, visualizzale
    if (quizData && quizData.sceltaMultipla) {
        quizData.sceltaMultipla.forEach((questionData, index) => {
            // Crea un div per ciascuna domanda
            const div = document.createElement("div");
            div.className = "mb-3 question";  // Aggiungi la classe per lo stile
            div.innerHTML = `
                <p>${index + 1}. ${questionData.question}</p>
                <input type="radio" name="answer${index}" value="A"> A. ${questionData.answers[0]} <br>
                <input type="radio" name="answer${index}" value="B"> B. ${questionData.answers[1]} <br>
                <input type="radio" name="answer${index}" value="C"> C. ${questionData.answers[2]} <br>
                <input type="radio" name="answer${index}" value="D"> D. ${questionData.answers[3]} <br>
            `;
            // Aggiungi il div appena creato al contenitore delle domande
            choiceQuestionsContainer.appendChild(div);
        });
    }

    // Funzione per avviare il timer
    const startTimer = () => {
        // Intervallo che si aggiorna ogni secondo
        const interval = setInterval(() => {
            let minutes = Math.floor(timeLeft / 60);  // Calcola i minuti
            let seconds = timeLeft % 60;  // Calcola i secondi
            seconds = seconds < 10 ? '0' + seconds : seconds;  // Aggiungi uno zero iniziale ai secondi se necessario

            // Visualizza il tempo rimanente nel formato MM:SS
            timerElement.textContent = `Tempo rimanente: ${minutes}:${seconds}`;

            // Salva il tempo rimanente nel localStorage ogni secondo
            localStorage.setItem("timeLeft", timeLeft);

            // Se il tempo è scaduto, ferma il timer e salva il quiz
            if (timeLeft <= 0) {
                clearInterval(interval);
                saveQuiz(); // Salva il quiz quando il tempo scade
            } else {
                timeLeft--;  // Diminuisci il tempo rimanente di un secondo
            }
        }, 1000);  // Intervallo di aggiornamento ogni 1000 millisecondi (1 secondo)
    };

    // Funzione per salvare le risposte del quiz e scaricare il file
    const saveQuiz = () => {
        let answers = "";

        // Aggiungi le risposte delle domande aperte
        openAnswers.forEach((answer, index) => {
            answers += `Domanda Aperta ${index + 1}: ${answer}\n`;
        });

        // Aggiungi le risposte delle domande a scelta multipla
        quizData.sceltaMultipla.forEach((questionData, index) => {
            // Recupera la risposta selezionata per ogni domanda
            const selectedAnswer = document.querySelector(`input[name="answer${index}"]:checked`);
            const answer = selectedAnswer ? selectedAnswer.value : "Nessuna risposta"; // Se non c'è selezione, inserisci "Nessuna risposta"
            answers += `Domanda a Scelta Multipla ${index + 1}: ${questionData.question} - Risposta: ${answer}\n`;
        });

        // Recupera il nome e la classe dell'utente dal localStorage
        const userName = localStorage.getItem("userName");
        const userClass = localStorage.getItem("userClass");

        // Crea il nome del file in base al nome e alla classe dell'utente
        const fileName = userName.replace(/\s+/g, '') + "_" + userClass.toUpperCase() + ".txt";

        // Crea un blob con le risposte in formato testo
        const blob = new Blob([answers], { type: "text/plain" });
        const link = document.createElement("a");  // Crea un link per il download del file
        link.href = URL.createObjectURL(blob);  // Crea un URL per il blob
        link.download = fileName;  // Imposta il nome del file per il download
        link.click();  // Avvia automaticamente il download del file

        // Rimuovi i dati salvati nel localStorage per pulire la sessione
        localStorage.removeItem("userName");
        localStorage.removeItem("userClass");
        localStorage.removeItem("timeLeft");
    };

    // Avvia il timer quando la pagina è pronta
    startTimer();

    // Aggiungi un event listener al pulsante di invio delle risposte
    submitChoiceAnswersButton.addEventListener("click", saveQuiz);
});

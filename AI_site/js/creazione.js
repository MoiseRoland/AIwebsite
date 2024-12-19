// Creazione del quiz
document.addEventListener("DOMContentLoaded", () => {
    // Riferimenti agli elementi della pagina
    const numAperte = document.getElementById("numAperte");
    const numScelta = document.getElementById("numScelta");
    const questionsContainer = document.getElementById("questionsContainer");

    // Funzione per generare domande aperte e domande a scelta multipla
    const generateQuestions = () => {
        // Pulisce il contenitore delle domande prima di aggiungere nuove domande
        questionsContainer.innerHTML = "";

        // Recupera i valori selezionati per il numero di domande aperte e a scelta multipla
        const numOpen = parseInt(numAperte.value, 10);
        const numChoice = parseInt(numScelta.value, 10);

        // Generazione delle domande aperte
        for (let i = 1; i <= numOpen; i++) {
            // Crea un div per ogni domanda aperta
            const openDiv = document.createElement("div");
            openDiv.className = "mb-3"; // Aggiunge la classe per lo stile
            openDiv.innerHTML = `
                <label for="openQuestion${i}" class="form-label">Domanda Aperta ${i}</label>
                <input type="text" id="openQuestion${i}" class="form-control" placeholder="Inserisci la domanda aperta">
            `;
            questionsContainer.appendChild(openDiv); // Aggiunge il div al contenitore delle domande
        }

        // Generazione delle domande a scelta multipla
        for (let i = 1; i <= numChoice; i++) {
            // Crea un div per ogni domanda a scelta multipla
            const choiceDiv = document.createElement("div");
            choiceDiv.className = "mb-3"; // Aggiunge la classe per lo stile
            choiceDiv.innerHTML = `
                <label for="choiceQuestion${i}" class="form-label">Domanda a Scelta Multipla ${i}</label>
                <input type="text" id="choiceQuestion${i}" class="form-control mb-2" placeholder="Inserisci la domanda">
                <input type="text" id="choiceAnswer1_${i}" class="form-control mb-1" placeholder="Risposta 1">
                <input type="text" id="choiceAnswer2_${i}" class="form-control mb-1" placeholder="Risposta 2">
                <input type="text" id="choiceAnswer3_${i}" class="form-control mb-1" placeholder="Risposta 3">
                <input type="text" id="choiceAnswer4_${i}" class="form-control mb-1" placeholder="Risposta 4">
            `;
            questionsContainer.appendChild(choiceDiv); // Aggiunge il div al contenitore delle domande
        }
    };

    // Aggiunge event listener per il cambiamento dei valori nelle selezioni di numero di domande
    numAperte.addEventListener("change", generateQuestions);
    numScelta.addEventListener("change", generateQuestions);

    // Funzione per il salvataggio delle domande nel localStorage
    document.getElementById("saveQuiz").addEventListener("click", () => {
        // Oggetto che conterrà le domande aperte e a scelta multipla
        const quizData = {
            aperte: [],
            sceltaMultipla: []
        };

        // Salvataggio delle domande aperte
        const numOpen = parseInt(numAperte.value, 10);
        for (let i = 1; i <= numOpen; i++) {
            const question = document.getElementById(`openQuestion${i}`).value;
            if (question) quizData.aperte.push(question); // Aggiunge la domanda aperta se non vuota
        }

        // Salvataggio delle domande a scelta multipla
        const numChoice = parseInt(numScelta.value, 10);
        for (let i = 1; i <= numChoice; i++) {
            const question = document.getElementById(`choiceQuestion${i}`).value;
            const answers = [
                document.getElementById(`choiceAnswer1_${i}`).value,
                document.getElementById(`choiceAnswer2_${i}`).value,
                document.getElementById(`choiceAnswer3_${i}`).value,
                document.getElementById(`choiceAnswer4_${i}`).value,
            ];
            if (question) quizData.sceltaMultipla.push({ question, answers }); // Aggiunge la domanda e le risposte se non vuota
        }

        // Salvataggio dei dati nel localStorage
        localStorage.setItem("quizData", JSON.stringify(quizData));
        alert("Quiz salvato con successo!"); // Avvisa l'utente del salvataggio
        window.location.href = "index.html"; // Reindirizza alla homepage dopo il salvataggio
    });

    // Chiamata iniziale della funzione per generare le domande in base ai valori selezionati
    generateQuestions();
});

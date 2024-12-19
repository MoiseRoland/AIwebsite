// Script per la homepage che salva nome, classe e imposta il timer nel localStorage

// Aggiunge un event listener per il clic sul pulsante "startQuiz"
document.getElementById("startQuiz").addEventListener("click", () => {
    // Recupera i valori inseriti nei campi di input per nome e classe
    const userName = document.getElementById("userName").value;
    const userClass = document.getElementById("class").value;

    // Verifica se entrambi i campi sono stati compilati
    if (userName && userClass) {
        // Salva nome e classe nel localStorage
        localStorage.setItem("userName", userName);
        localStorage.setItem("userClass", userClass);

        // Imposta il timer a 30 minuti (1800 secondi) nel localStorage
        const startTime = 30 * 60; // 30 minuti in secondi
        localStorage.setItem("timeLeft", startTime);

        // Reindirizza alla pagina delle domande aperte
        window.location.href = "aperte.html";
    } else {
        // Se uno dei campi non è compilato, mostra un messaggio di avviso
        alert("Per favore, inserisci nome e classe.");
    }
});

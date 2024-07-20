function startValidation(user) {
    document.getElementById('selected-user').value = user;
    document.getElementById('validation-popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('validation-popup').style.display = 'none';
}

function submitValidation() {
    const email = document.getElementById('email').value;
    const user = document.getElementById('selected-user').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    const ticketNumber = document.getElementById('ticket-number').value;

    // Aggiungi il periodo di validazione alla lista
    addValidationPeriod(user, startTime, endTime);

    // Invio email all'inizio della validazione
    sendEmail(email, `Inizio validazione per ${user}`, `Inizio: ${startTime}\nTicket: ${ticketNumber}`, user, startTime, endTime, ticketNumber)
        .then(() => {
            // Calcola il tempo in millisecondi per il timeout
            const timeOutDuration = new Date(endTime) - new Date(startTime);

            // Invio email alla fine della validazione
            setTimeout(() => {
                sendEmail(email, `Fine validazione per ${user}`, `Fine: ${endTime}\nCambia la password dell'utenza ${user}`, user, startTime, endTime, ticketNumber);
            }, timeOutDuration);
        });

    closePopup();
}

function sendEmail(toEmail, subject, message, user, startTime, endTime, ticketNumber) {
    console.log('Invio email con i seguenti dati:', {
        to_email: toEmail,
        subject: subject,
        message: message,
        user: user,
        start_time: startTime,
        end_time: endTime,
        ticket_number: ticketNumber
    });
    return emailjs.send('service_u3wgewf', 'template_gcp43xh', {
        to_email: toEmail,
        subject: subject,
        message: message,
        user: user,
        start_time: startTime,
        end_time: endTime,
        ticket_number: ticketNumber
    })
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
}

function addValidationPeriod(user, startTime, endTime) {
    const periodList = document.getElementById('period-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Utenza: ${user}, Inizio: ${startTime}, Fine: ${endTime}`;
    periodList.appendChild(listItem);
}

function redirectToService() {
    window.location.href = 'http://url-del-servizio.com';
}

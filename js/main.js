console.log('main file loaded')

// contact input field

function animateProgressBar(elementId, targetWidth) {
    let element = document.getElementById(elementId);
    let width = 0;
    let animationInterval = setInterval(frame, 10);

    function frame() {
        if (width >= targetWidth) {
            clearInterval(animationInterval);
        } else {
            width++;
            element.style.width = width + "%";
        }
    }
}

animateProgressBar("html", 100); // HTML percentage
animateProgressBar("css", 100); // CSS percentage
animateProgressBar("javascript", 70); // JavaScript percentage
animateProgressBar("bootstrap", 90); // Bootstrap percentage

// contact pagina

function validateForm(event) {
    // Voorkom het standaardgedrag van het formulier verzenden
    event.preventDefault();

    // Valideer de ingevulde gegevens voordat het formulier wordt verzonden
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    if (name === '' || email === '' || subject === '' || message === '') {
        // Toon een foutmelding als een van de velden niet is ingevuld
        alert('Please fill in all the required fields.');
    } else {
        // Verzend het formulier als alle velden zijn ingevuld
        document.getElementById('contactForm').submit();
    }
}
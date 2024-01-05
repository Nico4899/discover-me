function displayErrorMessage(message, id) {
    if(!document.getElementById('error-message')) {       
        const errorMessage = document.createElement("div");
        errorMessage.id = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.display = "block";
        errorMessage.style.color = "red";
        errorMessage.style.marginTop = "1rem";
        errorMessage.style.fontSize = "0.8rem";

        const element = document.getElementById(id);
        element.parentNode.insertBefore(errorMessage, element.nextSibling);

        setTimeout(() => {
            errorMessage.remove(); // Remove the error message after a few seconds
        }, 3000);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const steps = document.querySelectorAll('.step');
    const instructions = document.querySelectorAll('.instruction');
    const backButton = document.getElementById('back-button');
    const nextButton = document.getElementById('next-button');
    
    let activeStep = 0;

    function updateSteps() {
        steps.forEach((step, index) => {
            if (index === activeStep) {
                step.classList.add('active');
                instructions[index].style.display = 'block';
            } else {
                step.classList.remove('active');
                instructions[index].style.display = 'none';
            }
        });

        if (activeStep > 0) {
            backButton.disabled = false;
            backButton.style.backgroundColor = 'var(--accent-green)';
        } else {
            backButton.disabled = true;
            backButton.style.backgroundColor = 'var(--neutral-gray)';
        }

        if (activeStep < steps.length - 1) {
            nextButton.disabled = false;
            nextButton.style.backgroundColor = 'var(--accent-green)';
        } else {
            nextButton.disabled = true;
            nextButton.style.backgroundColor = 'var(--neutral-gray)';
        }
    }

    nextButton.addEventListener('click', function() {
        if (activeStep < steps.length - 1) {
            activeStep++;
            updateSteps();
        }
    });

    backButton.addEventListener('click', function() {
        if (activeStep > 0) {
            activeStep--;
            updateSteps();
        }
    });

    updateSteps(); // Initialize the steps
});


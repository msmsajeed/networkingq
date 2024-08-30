document.addEventListener("DOMContentLoaded", function() {
    function checkAnswer(questionNumber) {
        const correctAnswers = {
            1: ['b'],  // Correct answer for question 1
            2: ['b', 'c', 'd']  // Correct answers for question 2 (multiple correct answers)
        };

        const form = document.getElementById(`question-form-${questionNumber}`);
        const result = document.getElementById(`result-${questionNumber}`);
        const selectedOptions = Array.from(form.elements['answer'])
                                    .filter(option => option.checked || option.type === 'radio' && option.checked)
                                    .map(option => option.value);
        
        const correctSelected = selectedOptions.every(value => correctAnswers[questionNumber].includes(value)) &&
                                correctAnswers[questionNumber].length === selectedOptions.length;

        if (correctSelected) {
            result.textContent = "Excellent!";
            result.style.color = "green";
        } else {
            result.textContent = `Incorrect. The correct answers are: ${correctAnswers[questionNumber].join(', ')}.`;
            result.style.color = "red";
        }
    }

    function showNextQuestion(nextQuestionNumber) {
        // Hide all questions
        const questionContainers = document.querySelectorAll('.question-container');
        questionContainers.forEach(container => container.classList.remove('active'));
        
        // Show the next question
        document.getElementById(`question-${nextQuestionNumber}`).classList.add('active');
    }

    // Show the first question on load
    showNextQuestion(1);

    // Make functions accessible globally
    window.checkAnswer = checkAnswer;
    window.showNextQuestion = showNextQuestion;
});

function checkAnswer() {
    const correctAnswer = 'b'; // Set the correct answer for this question
    const form = document.getElementById('question-form');
    const result = document.getElementById('result');
    
    const selectedOption = form.elements['answer'].value;

    if (selectedOption === correctAnswer) {
        result.textContent = "Excellent!";
        result.style.color = "green";
    } else {
        result.textContent = "Incorrect. The correct answer is: " + correctAnswer + ".";
        result.style.color = "red";
    }
}

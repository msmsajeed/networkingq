document.addEventListener("DOMContentLoaded", function() {
    let questions = [];
    let currentQuestionIndex = 0;

    // Load questions from JSON file
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion(questions[currentQuestionIndex]);
        })
        .catch(error => console.error('Error loading questions:', error));

    function displayQuestion(question) {
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = '';

        const form = document.createElement('form');
        form.id = `question-form-${question.id}`;

        const questionText = document.createElement('p');
        questionText.textContent = `${question.id}. ${question.question}`;
        form.appendChild(questionText);

        Object.keys(question.options).forEach(key => {
            const div = document.createElement('div');

            const input = document.createElement('input');
            input.type = question.type === 'single' ? 'radio' : 'checkbox';
            input.name = 'answer';
            input.value = key;
            input.id = `option-${question.id}${key}`;
            div.appendChild(input);

            const label = document.createElement('label');
            label.setAttribute('for', `option-${question.id}${key}`);
            label.textContent = `${key}. ${question.options[key]}`;
            div.appendChild(label);

            form.appendChild(div);
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.textContent = 'Submit Answer';
        submitButton.onclick = () => checkAnswer(question);
        form.appendChild(submitButton);

        const result = document.createElement('p');
        result.id = `result-${question.id}`;
        form.appendChild(result);

        questionContainer.appendChild(form);

        if (currentQuestionIndex < questions.length - 1) {
            const nextButton = document.createElement('button');
            nextButton.type = 'button';
            nextButton.textContent = 'Next';
            nextButton.onclick = () => {
                currentQuestionIndex++;
                displayQuestion(questions[currentQuestionIndex]);
            };
            form.appendChild(nextButton);
        }
    }

    function checkAnswer(question) {
        const form = document.getElementById(`question-form-${question.id}`);
        const result = document.getElementById(`result-${question.id}`);
        const selectedOptions = Array.from(form.elements['answer'])
                                    .filter(option => option.checked)
                                    .map(option => option.value);

        const correctSelected = selectedOptions.every(value => question.correctAnswers.includes(value)) &&
                                question.correctAnswers.length === selectedOptions.length;

        if (correctSelected) {
            result.textContent = "Excellent!";
            result.style.color = "green";
        } else {
            result.textContent = `Incorrect. The correct answers are: ${question.correctAnswers.join(', ')}.`;
            result.style.color = "red";
        }
    }
});

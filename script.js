const questions = [
    {
        question: "What is the purpose of the OSI model?",
        answer: "To standardize network communications."
    },
    {
        question: "What layer does IP operate in the OSI model?",
        answer: "Layer 3 (Network layer)."
    },
    // Add more questions here
    // Example: { question: "Your question here?", answer: "The correct answer." }
];

const questionsContainer = document.getElementById('questions-container');

questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionTitle = document.createElement('h2');
    questionTitle.textContent = `Q${index + 1}: ${q.question}`;
    questionDiv.appendChild(questionTitle);

    const answerDiv = document.createElement('div');
    answerDiv.classList.add('answer');
    answerDiv.textContent = `Answer: ${q.answer}`;
    questionDiv.appendChild(answerDiv);

    questionsContainer.appendChild(questionDiv);
});

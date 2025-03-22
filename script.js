const quizData = [
    {
        question: "1. I _____ a student.",
        options: ["am", "is", "are"],
        correctAnswer: "am",
        level: "A1"
    },
    {
        question: "2. What is your name?",
        options: ["My name is John.", "I am John.", "John is my name."],
        correctAnswer: "My name is John.",
        level: "A1"
    },
    {
        question: "3. _____ you like coffee?",
        options: ["Do", "Does", "Are"],
        correctAnswer: "Do",
        level: "A1"
    },
    {
        question: "4. He _____ to the cinema yesterday.",
        options: ["go", "went", "gone"],
        correctAnswer: "went",
        level: "A2"
    },
    {
        question: "5. She _____ English very well.",
        options: ["speak", "speaks", "speaking"],
        correctAnswer: "speaks",
        level: "A2"
    },
    {
        question: "6. They _____ TV every evening.",
        options: ["watch", "watches", "watched"],
        correctAnswer: "watch",
        level: "A2"
    },
    {
        question: "7. I have _____ seen that movie.",
        options: ["never", "ever", "already"],
        correctAnswer: "never",
        level: "B1"
    },
    {
        question: "8. If I _____ more time, I would travel more.",
        options: ["have", "had", "has"],
        correctAnswer: "had",
        level: "B1"
    },
    {
        question: "9. This book is _____ than that one.",
        options: ["more interesting", "interesting", "most interesting"],
        correctAnswer: "more interesting",
        level: "B1"
    },
    {
        question: "10. He is the _____ student in the class.",
        options: ["good", "better", "best"],
        correctAnswer: "best",
        level: "B1"
    },
    {
        question: "11. By the time we arrived, the movie _____.",
        options: ["started", "had started", "has started"],
        correctAnswer: "had started",
        level: "B2"
    },
    {
        question: "12. She asked me _____ I was going.",
        options: ["where", "to where", "if"],
        correctAnswer: "where",
        level: "B2"
    },
    {
        question: "13. The report _____ by the committee.",
        options: ["was written", "wrote", "had written"],
        correctAnswer: "was written",
        level: "B2"
    },
    {
        question: "14. He is known _____ his dedication to the project.",
        options: ["for", "by", "with"],
        correctAnswer: "for",
        level: "B2"
    },
    {
        question: "15. The company aims _____ its market share.",
        options: ["to increase", "increasing", "increase"],
        correctAnswer: "to increase",
        level: "C1"
    },
    {
        question: "16. Had they known about the problem, they _____ it.",
        options: ["would solve", "would have solved", "will solve"],
        correctAnswer: "would have solved",
        level: "C1"
    },
    {
        question: "17. The new policy has led _____ significant changes.",
        options: ["to", "in", "for"],
        correctAnswer: "to",
        level: "C1"
    },
    {
        question: "18. The professor is an expert _____ this field.",
        options: ["on", "in", "at"],
        correctAnswer: "in",
        level: "C1"
    },
    {
        question: "19. The evidence suggests that he _____ have been involved.",
        options: ["must", "should", "might"],
        correctAnswer: "might",
        level: "C2"
    },
    {
        question: "20. The CEO's decision was met with _____ from the board.",
        options: ["acquiescence", "dissent", "ambivalence"],
        correctAnswer: "dissent",
        level: "C2"
    }
];

const quizForm = document.getElementById('quiz-form');
const submitButton = document.getElementById('submit-btn');
const resultsDiv = document.getElementById('results');
const nivelSpan = document.getElementById('nivel');
const correctasSpan = document.getElementById('correctas');
const incorrectasSpan = document.getElementById('incorrectas');
const puntuacionSpan = document.getElementById('puntuacion');
const restartButtonElement = document.getElementById('restart-btn');
const restartQuizDiv = document.getElementById('restart-quiz');

let userAnswers = [];
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
let score = 0;

function displayQuestions() {
    quizForm.innerHTML = ''; 
    quizData.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${question.question}</p>`;

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        question.options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.className = 'option';
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question-${index}`;
            optionInput.value = option;
            optionInput.addEventListener('change', () => {
                userAnswers[index] = option;
            });

            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(` ${option}`));
            optionsDiv.appendChild(optionLabel);
        });

        questionDiv.appendChild(optionsDiv);
        quizForm.appendChild(questionDiv);
    });
}

function calculateResults() {
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    score = 0;

    quizData.forEach((question, index) => {
        const selectedAnswer = userAnswers[index];
        if (selectedAnswer === question.correctAnswer) {
            correctAnswersCount++;
            score += 5;
        } else {
            incorrectAnswersCount++;
        }
    });

    let level = determineLevel();
    nivelSpan.textContent = level;
    correctasSpan.textContent = correctAnswersCount;
    incorrectasSpan.textContent = incorrectAnswersCount;
    puntuacionSpan.textContent = score;

    displayCorrectAnswers();
    resultsDiv.classList.remove('hidden');
    restartQuizDiv.classList.remove('hidden');
    submitButton.disabled = true;
}

function displayCorrectAnswers() {
    const questionDivs = quizForm.querySelectorAll('.question');
    questionDivs.forEach((questionDiv, index) => {
        const correctAnswer = quizData[index].correctAnswer;
        const selectedAnswer = userAnswers[index];
        const options = questionDiv.querySelectorAll('.option');

        options.forEach(optionElement => {
            const inputElement = optionElement.querySelector('input');
            const optionText = inputElement.value;

            if (optionText === correctAnswer) {
                optionElement.classList.add('correct');
            } else if (optionText === selectedAnswer) {
                optionElement.classList.add('incorrect');
            }
        });
    });
}

function determineLevel() {
    if (score >= 90) {
        return "C2";
    } else if (score >= 80) {
        return "C1";
    } else if (score >= 70) {
        return "B2";
    } else if (score >= 60) {
        return "B1";
    } else if (score >= 50) {
        return "A2";
    } else {
        return "A1";
    }
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    calculateResults();
});

restartButtonElement.addEventListener('click', () => {
    userAnswers = [];
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    score = 0;
    resultsDiv.classList.add('hidden');
    restartQuizDiv.classList.add('hidden');
    submitButton.disabled = false;
    displayQuestions();
});

displayQuestions();

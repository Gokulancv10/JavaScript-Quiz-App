const quizData = [
    {
        question: "In JavaScript, what is a block of statement?",
        a: "Block that contains a single statement",
        b: "Both conditional block and a single statement",
        c: "Block that combines a number of statements into a single compound statement",
        d: "Conditional block",
        correct: "c"
    },
    {
        question: "The function and var are known as:",
        a: "Prototypes",
        b: "Declaration statements",
        c: "Data types",
        d: "Keywords",
        correct: "b"
    },
    {
        question: "In the JavaScript, which one of the following is not considered as an error?",
        a: "Missing of Bracket",
        b: "Division by zero",
        c: "Missing of semicolons",
        d: "Syntax error",
        correct: "b"
    }
];

const container = document.querySelector(".container");
const questionTag = document.querySelector(".question");
const optionA = document.querySelector("#text_a");
const optionB = document.querySelector("#text_b");
const optionC = document.querySelector("#text_c");
const optionD = document.querySelector("#text_d");
const submitBtn = document.querySelector(".submit");
const answerOptions = document.querySelectorAll(".answer");

// Current question number
let currentQues = 0;
let score = 0;


loadCurrentQuestion();
loadNextQuestion();

/**
* Retrieves question and answer options from quizData list and display in div.
*/
function loadCurrentQuestion() {
    deSelectOptions();

    const currentData = quizData[currentQues];
    questionTag.innerHTML = currentData.question;
    optionA.innerHTML = currentData.a;
    optionB.innerHTML = currentData.b;
    optionC.innerHTML = currentData.c;
    optionD.innerHTML = currentData.d;
}

/**
* Returns selected option id(input:radio) for current question.
*/
function getSelectedOption() {
    let answer = undefined;

    answerOptions.forEach((option) => {
        if (option.checked) {
            answer = option.id;
        }
    });
    return answer;
}

/**
 * Retrieve next question data If option is selected for a current question else It won't retrieve.
 * Evaluating selected option and correct answer for a question is same.
 * If all the questions are answered then display the total no. of correct and Incorrect questions.
 */
function loadNextQuestion() {
    submitBtn.addEventListener("click", () => {

        const selectedAnswer = getSelectedOption();
        if (selectedAnswer === quizData[currentQues].correct) {
            score++;
        }

        if (selectedAnswer) {
            currentQues++;
            if (currentQues < quizData.length) {
                loadCurrentQuestion();
            } else {
                const totalIncorrect = quizData.length - score;
                container.innerHTML = `
                    <h3 id="quiz-result">Your quiz result is -- Correct: ${score}, Incorrect: ${totalIncorrect}</h3>
                    <button type="button" class="reload-page" onclick="location.reload()">Retake Quiz</button>
                `
            }
        }
    })
}

/**
 * Fixed an issue of previous question answer option selected input:radio was carries forward.
 */
function deSelectOptions() {
    answerOptions.forEach((option) => {
        option.checked = false;
    });
}

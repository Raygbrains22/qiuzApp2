const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answer: [
            {text:"strings", correct: false},
            {text:"boolean", correct: false},
            {text:"alert", correct: true},
            {text:"number", correct: false},
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answer: [
            {text:"quotes", correct: false},
            {text:"curly brackets", correct: false},
            {text:"parenthesis", correct: true},
            {text:"square brackets", correct: false},
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answer: [
            {text:"numbers and strings", correct: false},
            {text:"boolean", correct: false},
            {text:"other arrays", correct: false},
            {text:"all the above", correct: true},
        ]
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answer: [
            {text:"commas", correct: false},
            {text:"curly brackets", correct: false},
            {text:"quotes", correct: true},
            {text:"parenthesis", correct: false},
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: [
            {text:"javascript", correct: false},
            {text:"terminal/bash", correct: false},
            {text:"for loop", correct: false},
            {text:"console.log", correct: true},
        ]
    }
];

const questionaire = document.getElementById('question');
const answerBtn = document.getElementById('answer-buttons'); 
const nextBtn = document.getElementById('next-btn');

let currentQuetionIndex = 0;
let score = 0;

//fuction to start the quiz
function startQuiz(){
    currentQuetionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next"
    showQuestion();
}

//function to show quiz quetions
function showQuestion(){
    resetState()
    let currentQuetion = questions[currentQuetionIndex];
    let questionNo = currentQuetionIndex + 1;
    questionaire.innerHTML = questionNo + ". " + currentQuetion.question;

    currentQuetion.answer.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild)
    }

}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++
    } else {
        selectBtn.classList.add("incorrect");
    }
        
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block"
}

function showScore(){
    resetState();
    questionaire.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block"; 
}

function handleNextBtn(){
     currentQuetionIndex++;
     if(currentQuetionIndex < questions.length){
        showQuestion()
     }else {
        showScore()
     }

}

nextBtn.addEventListener("click", () => {
    if(currentQuetionIndex < questions.length){
        handleNextBtn()
    } else startQuiz()
})

startQuiz()
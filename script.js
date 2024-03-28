const questions = [
    {
    question: "Укажите форму нарезки моркови для супа крестьянского:",
    answers:[
        {
            text:"соломка", correct:false
        },
        {
            text:"средние кубики", correct:false
        },
        {
            text:"мелкие кубики", correct:false
        },
        {
            text:"кружочки", correct:true
        },
    ]
},
{
    question: "Объясните причину дефекта: бульон при варке получился мутный",
    answers:[
        {
            text:"продукты заливали холодной водой.", correct:false
        },
        {
            text:"продукты заливали горячей водой", correct:false
        },
        {
            text:"варили при бурном кипении", correct:true
        },
        {
            text:"при варке не снимали пену и жир", correct:true
        },
    ]
}
];

const questionElement = document.getElementById("question");
const answerButton = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0; 
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Следующий";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selecteBtn = e.target; 
    const isCorrect = selecteBtn.dataset.correct === "true";
    
    if(isCorrect){
        selecteBtn.classList.add("correct");
        score++;
    } else{
        selecteBtn.classList.add("incorrect");0
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = ` ${score} из ${questions.length}!`;
    nextButton.innerHTML = "Начать заново";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();

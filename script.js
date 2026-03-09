function showSection(id){
    document.querySelectorAll('.content section').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Begrüßung
function updateGreeting(){
    const hour = new Date().getHours();
    const g = document.getElementById('greeting');
    const t = document.getElementById('greeting-text');
    if(hour>=5 && hour<12){ g.innerText="Guten Morgen!"; t.innerText="Schön, dass du heute hier bist."; }
    else if(hour>=12 && hour<18){ g.innerText="Guten Tag!"; t.innerText="Schön, dass du hier bist."; }
    else{ g.innerText="Guten Abend!"; t.innerText="Schön, dass du vorbeischaust."; }
}
updateGreeting();

// Quiz-Daten Lebenslauf
const quizData=[
    { question:"Wann wurde Paul Müller geboren?", answers:["03.04.2012","01.01.2010","15.05.2011","20.07.2013"], correct:0 },
    { question:"Welches Hobby hat Paul?", answers:["Schwimmen","Freerunning","Basketball","Malen"], correct:1 },
    { question:"Welche Schule besuchte Paul zuletzt?", answers:["Primarschule Nänikon","Sekundarschule Nänikon","Gymnasium Zürich","Schule in Winterthur"], correct:1 },
    { question:"Hat Paul Weiterbildung absolviert?", answers:["Ja","Nein"], correct:1 }
];

let currentQuestion=0;
let score=0;

function loadQuestion(){
    const q=quizData[currentQuestion];
    document.getElementById("question").innerText=q.question;
    const answersList=document.getElementById("answers");
    answersList.innerHTML="";
    document.getElementById("score").innerText="Punkte: "+score;
    q.answers.forEach((ans,index)=>{
        const li=document.createElement("li");
        li.classList.add("quiz-answer");
        li.innerText=ans;
        li.onclick=()=>checkAnswer(index,li);
        answersList.appendChild(li);
    });
    // Fortschritt
    document.getElementById("progress").style.width=((currentQuestion/quizData.length)*100)+"%";
}

function checkAnswer(selected,element){
    const correct=quizData[currentQuestion].correct;
    if(selected===correct){ element.style.backgroundColor="#4ade80"; score++; }
    else{ element.style.backgroundColor="#f87171"; }
    setTimeout(()=>{
        currentQuestion++;
        if(currentQuestion<quizData.length){ loadQuestion(); }
        else{
            alert("Quiz beendet! Du hast "+score+" Punkte von "+quizData.length+" erreicht.");
            currentQuestion=0; score=0; loadQuestion();
        }
    },800);
}

document.getElementById("next-btn").onclick=()=>{
    currentQuestion++;
    if(currentQuestion<quizData.length){ loadQuestion(); }
    else{ currentQuestion=0; score=0; loadQuestion(); }
}

// Initial
loadQuestion();
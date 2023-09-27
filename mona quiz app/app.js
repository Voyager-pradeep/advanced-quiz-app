const startBtn = document.getElementById("main-btn");
const firstPage = document.querySelector(".first-interface");
const secondPage = document.querySelector(".content-center");
const question = document.querySelector(".question");
const options = document.querySelectorAll(".options");
const nextBtn = document.getElementById("slide-right");
const totalScore = document.querySelector(".t-score");
const resultPage = document.querySelector(".result");
const percentageMain = document.querySelector(".percentage");
const history3 = document.querySelector(".history");
const quizContent = document.querySelector(".quiz-content");
const quizBtn = document.querySelectorAll(".quiz-btn");
const questionNumber = document.querySelector(".question-number");
const geography3 = document.querySelector(".geography");
const math3 = document.querySelector(".math");

startBtn.addEventListener("click", () => {
  firstPage.style.visibility = "hidden";
  secondPage.style.visibility = "visible";
});

contentBtns = document.querySelectorAll(".content-button");

contentBtns.forEach((element) => {
  element.addEventListener("click", function (e) {
    const category = e.target.innerText;
    displayThirdPage(category);
  });
});

let currentPosition = 0;
let isClicked = false;
let score = 0;
let categorySorted = "";
let subCategory = "";

function displayThirdPage(category) {
  secondPage.style.visibility = "hidden";
  let mainCategory = category.replace(/\s+/g, "").toLowerCase();
  if (mainCategory == "indianhistory") {
    history3.style.visibility = "visible";
  } else if (mainCategory == "indiangeography") {
    geography3.style.visibility = "visible";
  } else if (mainCategory == "math") {
    math3.style.visibility = "visible";
  }
  quizBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      subCategory = e.target.innerText.toLowerCase();
      subCategory = subCategory.replace(/\s+/g, "");
      categorySorted = category.replace(/\s+/g, "").toLowerCase();

      fetch("data.json")
        .then((response) => response.json())
        .then((jsonData) => {
          const dataPath = jsonData.quiz[categorySorted][subCategory];
          showQuizData(dataPath);

          history3.style.visibility = "hidden";
          quizContent.style.visibility = "visible";
          dataLength = dataPath.questions.length;

          questionNumber.innerText = `${currentPosition + 1}/${dataLength}`;
          nextBtn.addEventListener("click", function () {
            questionNumber.innerHTML = `${currentPosition + 2}/${dataLength}`;
            isClicked = false;
            if (currentPosition < dataLength - 1) {
              currentPosition++;
              showQuizData(dataPath);
            } else {
              displayScore(dataLength);
              currentPosition = 0;
              score = 0;
              isClicked = false;
            }
            options.forEach((option) => {
              option.style.color = "black";
              option.style.backgroundColor = "rgb(219, 217, 213)";
            });
          });
        });
    });
  });
}
function showQuizData(path) {
  question.innerText = path.questions[currentPosition].questionText;
  options[0].innerText = path.questions[currentPosition].answerOption[0];
  options[1].innerText = path.questions[currentPosition].answerOption[1];
  options[2].innerText = path.questions[currentPosition].answerOption[2];
  options[3].innerText = path.questions[currentPosition].answerOption[3];

  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      const correctAns = path.questions[currentPosition].correctAnswer;
      console.log(correctAns);
      let c_ans = e.target.innerText;
      if (isClicked == true) {
        if (c_ans === correctAns) {
          e.currentTarget.style.color = "green";
          e.currentTarget.style.backgroundColor = "lightgreen";
        } else {
          e.currentTarget.style.color = "red";
          e.currentTarget.style.backgroundColor = "#ffa1a1";
        }
      } else {
        if (c_ans === correctAns && isClicked == false) {
          e.currentTarget.style.color = "green";
          e.currentTarget.style.backgroundColor = "lightgreen";
          score++;
          isClicked = true;
          console.log(score);
        } else {
          e.currentTarget.style.color = "red";
          e.currentTarget.style.backgroundColor = "#ffa1a1";
          isClicked = true;
        }
      }
    });
  });
}
function displayScore(quizlength) {
  totalScore.innerText = `${score}/${quizlength}`;
  quizContent.style.visibility = "hidden";
  resultPage.style.visibility = "visible";
  const percentage = Math.round((score / quizlength) * 100);
  if (percentage >= 75) {
    percentageMain.style.color = "green";
  } else {
    percentageMain.style.color = "red";
  }
  percentageMain.innerText = `${percentage}%`;
}
const homepage = document.querySelector(".end-btn");
homepage.addEventListener("click", () => {
  location.reload();
});
